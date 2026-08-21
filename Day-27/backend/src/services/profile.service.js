const User = require("../models/User");
const env = require("../config/env");
const logger = require("../utils/logger");
const { sendMail } = require("../utils/mailer");
const { getRenderedTemplate } = require("./emailTemplate.service");

const getProfile = async (userId) => {
  return await User.findById(userId).populate("role").select("-password");
};

const updateProfile = async (userId, data) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      name: data.name,
      profileImage: data.profileImage,
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("role")
    .select("-password");
};

const updateProfilePhoto = async (userId, filename) => {
  return User.findByIdAndUpdate(
    userId,
    {
      profileImage: `/uploads/profile/${filename}`,
    },
    { new: true }
  )
    .populate("role")
    .select("-password");
};

const removeProfilePhoto = async (userId) => {
  return User.findByIdAndUpdate(
    userId,
    {
      profileImage: null,
    },
    { new: true }
  )
    .populate("role")
    .select("-password");
};

// Hard delete: the user's own record is permanently removed from the
// database. This is one-way and cannot be undone. On success, notifies
// ADMIN_EMAIL that the account was deleted. The email is best-effort —
// a failure to notify the admin must not stop the account deletion from
// succeeding for the user, so it's logged rather than thrown.
const deleteAccount = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    return null;
  }

  await User.deleteOne({ _id: userId });

  try {
    const { subject, text, html } = await getRenderedTemplate(
      "ACCOUNT_DELETED",
      {
        userEmail: user.email,
        userName: user.name,
        appName: env.SMTP_FROM_NAME,
        year: String(new Date().getFullYear()),
      }
    );

    await sendMail({ to: env.ADMIN_EMAIL, subject, text, html });
  } catch (error) {
    logger("error", "profile.account_deleted_admin_email_failed", {
      message: error.message,
      stack: error.stack,
      deletedUserEmail: user.email,
    });
  }

  return user;
};

// Lists the caller's active (non-expired) sessions/devices, newest
// activity first. Piggybacks on a single User read — no separate
// sessions table/query.
const getSessions = async (userId, currentSessionId) => {
  const user = await User.findById(userId).select("sessions");

  if (!user) {
    return [];
  }

  const now = new Date();
  const active = (user.sessions || []).filter((s) => s.expiresAt > now);

  // Lazy cleanup: only write back when there's actually something expired
  // to drop, so a normal read (all-active list) costs no write.
  if (active.length !== user.sessions.length) {
    await User.updateOne({ _id: userId }, { $set: { sessions: active } });
  }

  return active
    .slice()
    .sort((a, b) => b.lastActiveAt - a.lastActiveAt)
    .map((s) => ({
      sessionId: s.sessionId,
      browserName: s.browserName,
      deviceName: s.deviceName,
      ip: s.ip,
      createdAt: s.createdAt,
      lastActiveAt: s.lastActiveAt,
      isCurrent: s.sessionId === currentSessionId,
    }));
};

// Logs out one specific device/session.
const revokeSession = async (userId, sessionId) => {
  await User.updateOne(
    { _id: userId },
    { $pull: { sessions: { sessionId } } }
  );
};

// Logs out every session except the one making this request.
const revokeOtherSessions = async (userId, currentSessionId) => {
  await User.updateOne(
    { _id: userId },
    { $pull: { sessions: { sessionId: { $ne: currentSessionId } } } }
  );
};

module.exports = {
  getProfile,
  updateProfile,
  updateProfilePhoto,
  removeProfilePhoto,
  deleteAccount,
  getSessions,
  revokeSession,
  revokeOtherSessions,
};