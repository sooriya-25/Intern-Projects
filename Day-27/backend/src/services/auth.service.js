const { randomUUID } = require("node:crypto");

const User = require("../models/User");
const OtpVerification = require("../models/OtpVerification");
const roleService = require("./role.service");

const { hashPassword, comparePassword } = require("../utils/password");
const { generateToken, decodeToken } = require("../utils/jwt");
const { getBrowserName, getDeviceName } = require("../utils/device");
const {
  generateOtp,
  hashOtp,
  OTP_TTL_MS,
  VERIFIED_TTL_MS,
  MAX_ATTEMPTS,
} = require("../utils/otp");
const { sendMail } = require("../utils/mailer");
const logger = require("../utils/logger");
const { getRenderedTemplate } = require("./emailTemplate.service");

const STATUS = require("../constants/status");
const HTTP_STATUS = require("../constants/httpStatus");
const AppError = require("../utils/appError");
const env = require("../config/env");

const SIGNUP_PURPOSE = "SIGNUP";
const PASSWORD_RESET_PURPOSE = "PASSWORD_RESET";
const LOGIN_PURPOSE = "LOGIN";

// Caps how many devices a single account can stay logged into at once.
// Applied only at login time (cheap, infrequent) — never on the
// request-by-request path.
const MAX_SESSIONS = 10;

const sendSignupOtp = async ({ email }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("Email already exists", HTTP_STATUS.CONFLICT);
  }

  const otp = generateOtp();
  const otpHash = hashOtp(otp);
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);

  await OtpVerification.findOneAndUpdate(
    { email, purpose: SIGNUP_PURPOSE },
    { otpHash, expiresAt, verified: false, attempts: 0 },
    { upsert: true, new: true }
  );

  try {
    const { subject, text, html } = await getRenderedTemplate("SIGNUP_OTP", {
      otp,
      appName: env.SMTP_FROM_NAME,
      minutes: String(Math.round(OTP_TTL_MS / 60000)),
      year: String(new Date().getFullYear()),
    });

    await sendMail({ to: email, subject, text, html });
  } catch (error) {
    logger("error", "auth.signup_otp_email_failed", {
      message: error.message,
      stack: error.stack,
    });

    throw new AppError(
      "Failed to send verification email. Please try again.",
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }

  return { email, expiresInMinutes: Math.round(OTP_TTL_MS / 60000) };
};

const verifySignupOtp = async ({ email, otp }) => {
  const record = await OtpVerification.findOne({
    email,
    purpose: SIGNUP_PURPOSE,
  });

  if (!record) {
    throw new AppError(
      "No OTP request found for this email. Please request a new OTP.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (record.expiresAt < new Date()) {
    throw new AppError(
      "OTP has expired. Please request a new one.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    throw new AppError(
      "Too many incorrect attempts. Please request a new OTP.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (hashOtp(otp) !== record.otpHash) {
    record.attempts += 1;
    await record.save();

    throw new AppError("Invalid OTP", HTTP_STATUS.BAD_REQUEST);
  }

  record.verified = true;
  record.expiresAt = new Date(Date.now() + VERIFIED_TTL_MS);
  await record.save();

  return { email, verified: true };
};

const register = async ({
  name,
  email,
  password,
  phone,
  companyName,
  address,
}) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("Email already exists", HTTP_STATUS.CONFLICT);
  }

  const otpRecord = await OtpVerification.findOne({
    email,
    purpose: SIGNUP_PURPOSE,
  });

  if (!otpRecord || !otpRecord.verified || otpRecord.expiresAt < new Date()) {
    throw new AppError(
      "Please verify your email with the OTP sent to you before signing up.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const defaultRole = await roleService.getDefaultRole();

  if (!defaultRole) {
    throw new AppError(
      "No default role is configured. Please contact an administrator.",
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    companyName,
    address,
    role: defaultRole._id,
    isEmailVerified: true,
  });

  await OtpVerification.deleteOne({ _id: otpRecord._id });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};

// Step 1 of login: verify credentials only. On success, sends an OTP to
// the user's email and returns no token yet — the token is only issued
// once verifyLoginOtp() below succeeds. This means correct email+password
// alone is never enough to log in.
const loginWithPassword = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
  }

  const isPasswordCorrect = await comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
  }

  if (user.status === STATUS.INACTIVE) {
    throw new AppError(
      "Your account has been deactivated",
      HTTP_STATUS.FORBIDDEN
    );
  }

  const otp = generateOtp();
  const otpHash = hashOtp(otp);
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);

  await OtpVerification.findOneAndUpdate(
    { email, purpose: LOGIN_PURPOSE },
    { otpHash, expiresAt, verified: false, attempts: 0 },
    { upsert: true, new: true }
  );

  try {
    const { subject, text, html } = await getRenderedTemplate("LOGIN_OTP", {
      otp,
      appName: env.SMTP_FROM_NAME,
      minutes: String(Math.round(OTP_TTL_MS / 60000)),
      year: String(new Date().getFullYear()),
    });

    await sendMail({ to: email, subject, text, html });
  } catch (error) {
    logger("error", "auth.login_otp_email_failed", {
      message: error.message,
      stack: error.stack,
    });

    throw new AppError(
      "Failed to send verification email. Please try again.",
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }

  return { email, expiresInMinutes: Math.round(OTP_TTL_MS / 60000) };
};

// Step 2 of login: verify the OTP and, only then, issue the auth token.
// `userAgent`/`ip` (passed through from the controller's req) are used
// only to label the new session for the Active Sessions list — they're
// never used for anything security-sensitive.
const verifyLoginOtp = async ({ email, otp, userAgent, ip }) => {
  const record = await OtpVerification.findOne({
    email,
    purpose: LOGIN_PURPOSE,
  });

  if (!record) {
    throw new AppError(
      "No login request found for this email. Please log in again.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (record.expiresAt < new Date()) {
    throw new AppError(
      "Code has expired. Please log in again to get a new one.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    throw new AppError(
      "Too many incorrect attempts. Please log in again to get a new code.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (hashOtp(otp) !== record.otpHash) {
    record.attempts += 1;
    await record.save();

    throw new AppError("Invalid code", HTTP_STATUS.BAD_REQUEST);
  }

  // Re-check the user in case anything changed (e.g. deactivated) between
  // step 1 and step 2.
  const user = await User.findOne({ email }).populate("role");

  if (!user) {
    await OtpVerification.deleteOne({ _id: record._id });

    throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
  }

  if (user.status === STATUS.INACTIVE) {
    await OtpVerification.deleteOne({ _id: record._id });

    throw new AppError(
      "Your account has been deactivated",
      HTTP_STATUS.FORBIDDEN
    );
  }

  await OtpVerification.deleteOne({ _id: record._id });

  const sessionId = randomUUID();
  const token = generateToken({ id: user._id, sid: sessionId });

  // Mirror the token's own expiry onto the session record, so a session
  // never outlives (or falls short of) the JWT it belongs to.
  const decoded = decodeToken(token);
  console.log("decoded", decoded);
  const expiresAt = decoded?.exp
    ? new Date(decoded.exp * 1000)
    : new Date(Date.now() + 24 * 60 * 60 * 1000);

  const now = new Date();

  // Drop anything already expired, then evict the oldest-by-activity
  // session(s) if we're at the cap — keeps the array from growing
  // forever for a device that never explicitly logs out.
  const liveSessions = (user.sessions || [])
    .filter((s) => s.expiresAt > now)
    .sort((a, b) => a.lastActiveAt - b.lastActiveAt);

  while (liveSessions.length >= MAX_SESSIONS) {
    liveSessions.shift();
  }

  liveSessions.push({
    sessionId,
    browserName: getBrowserName(userAgent),
    deviceName: getDeviceName(userAgent),
    userAgent: userAgent || null,
    ip: ip || null,
    createdAt: now,
    lastActiveAt: now,
    expiresAt,
  });

  user.sessions = liveSessions;
  user.lastLogin = now;
  await user.save({ validateModifiedOnly: true });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      role: user.role,
    },
  };
};

// Logs out the session that made this request — removes it from the
// user's session list so it immediately shows as gone in the Active
// Sessions list and (once the DB-check-carrying next request comes in
// for that same token, if any) is rejected by auth.middleware too.
const logout = async (userId, sessionId) => {
  if (!sessionId) return;

  await User.updateOne({ _id: userId }, { $pull: { sessions: { sessionId } } });
};

// Sends a password-reset OTP, but only to emails that belong to an existing
// user account.
//
// NOTE: this intentionally trades away the "don't reveal whether an account
// exists" protection (a 404 here confirms/denies an email is registered,
// i.e. account/user enumeration) in favor of not sending OTP mail to
// unregistered addresses. If that trade-off isn't acceptable, keep this
// check but return the same generic success response for both branches
// instead of throwing.
const forgotPassword = async ({ email }) => {
  const expiresInMinutes = Math.round(OTP_TTL_MS / 60000);
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(
      "No account found with this email address",
      HTTP_STATUS.NOT_FOUND
    );
  }

  const otp = generateOtp();
  const otpHash = hashOtp(otp);
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);

  await OtpVerification.findOneAndUpdate(
    { email, purpose: PASSWORD_RESET_PURPOSE },
    { otpHash, expiresAt, verified: false, attempts: 0 },
    { upsert: true, new: true }
  );

  try {
    const { subject, text, html } = await getRenderedTemplate(
      "PASSWORD_RESET_OTP",
      {
        otp,
        appName: env.SMTP_FROM_NAME,
        minutes: String(expiresInMinutes),
        year: String(new Date().getFullYear()),
      }
    );

    await sendMail({ to: email, subject, text, html });
  } catch (error) {
    logger("error", "auth.password_reset_email_failed", {
      message: error.message,
      stack: error.stack,
    });

    throw new AppError(
      "Failed to send reset email. Please try again.",
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }

  return { email, expiresInMinutes };
};

// Step 1 of the reset flow: verify the OTP on its own, without a new
// password. Mirrors verifySignupOtp — on success the record is flagged
// `verified` and its TTL is extended so the user has a window to submit
// the new password via resetPassword() below.
const verifyResetOtp = async ({ email, otp }) => {
  const record = await OtpVerification.findOne({
    email,
    purpose: PASSWORD_RESET_PURPOSE,
  });

  if (!record) {
    throw new AppError(
      "No reset request found for this email. Please request a new code.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (record.expiresAt < new Date()) {
    throw new AppError(
      "Reset code has expired. Please request a new one.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    throw new AppError(
      "Too many incorrect attempts. Please request a new code.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (hashOtp(otp) !== record.otpHash) {
    record.attempts += 1;
    await record.save();

    throw new AppError("Invalid reset code", HTTP_STATUS.BAD_REQUEST);
  }

  record.verified = true;
  record.expiresAt = new Date(Date.now() + VERIFIED_TTL_MS);
  await record.save();

  return { email, verified: true };
};

// Step 2 of the reset flow: set the new password. Requires the OTP to have
// already been verified via verifyResetOtp() above (no otp is accepted
// here anymore).
const resetPassword = async ({ email, password }) => {
  const record = await OtpVerification.findOne({
    email,
    purpose: PASSWORD_RESET_PURPOSE,
  });

  if (!record || !record.verified) {
    throw new AppError(
      "Please verify your reset code before setting a new password.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (record.expiresAt < new Date()) {
    throw new AppError(
      "Your verification has expired. Please request a new code.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    // The OTP was valid but the account is gone — clean up and bail.
    await OtpVerification.deleteOne({ _id: record._id });

    throw new AppError("Account not found", HTTP_STATUS.BAD_REQUEST);
  }

  const isSamePassword = await comparePassword(password, user.password);
  if (isSamePassword) {
    throw new AppError(
      "New password cannot be the same as your old password",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  user.password = await hashPassword(password);
  await user.save({ validateModifiedOnly: true });

  await OtpVerification.deleteOne({ _id: record._id });

  return { email };
};

module.exports = {
  sendSignupOtp,
  verifySignupOtp,
  register,
  loginWithPassword,
  verifyLoginOtp,
  logout,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
};
