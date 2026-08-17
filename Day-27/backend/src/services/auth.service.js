const User = require("../models/User");
const OtpVerification = require("../models/OtpVerification");
const roleService = require("./role.service");

const { hashPassword, comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/jwt");
const {
  generateOtp,
  hashOtp,
  OTP_TTL_MS,
  VERIFIED_TTL_MS,
  MAX_ATTEMPTS,
} = require("../utils/otp");
const { sendMail } = require("../utils/mailer");
const { getRenderedTemplate } = require("./emailTemplate.service");

const STATUS = require("../constants/status");
const HTTP_STATUS = require("../constants/httpStatus");
const AppError = require("../utils/appError");
const env = require("../config/env");

const SIGNUP_PURPOSE = "SIGNUP";

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
    console.error(`❌ Failed to send OTP email to ${email}:`, error.message);

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

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).populate("role");

  if (!user) {
    throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
  }

  const isPasswordCorrect = await comparePassword(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
  }

  if (user.status === STATUS.INACTIVE) {
    throw new AppError("Your account has been deactivated", HTTP_STATUS.FORBIDDEN);
  }

  user.lastLogin = new Date();

  await user.save({ validateModifiedOnly: true });

  const token = generateToken({
    id: user._id,
  });

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

module.exports = {
  sendSignupOtp,
  verifySignupOtp,
  register,
  login,
};
