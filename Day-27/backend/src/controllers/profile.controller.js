const profileService = require("../services/profile.service");

const getProfile = async (req, res, next) => {
  try {
    const profile = await profileService.getProfile(req.user._id);

    res.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const profile = await profileService.updateProfile(
      req.user._id,
      req.body
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfilePhoto = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a profile photo",
      });
    }

    const user = await profileService.updateProfilePhoto(
      req.user._id,
      req.file.filename
    );

    res.json({
      success: true,
      message: "Profile photo updated",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const removeProfilePhoto = async (req, res, next) => {
  try {
    const user = await profileService.removeProfilePhoto(req.user._id);

    res.json({
      success: true,
      message: "Profile photo removed",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    await profileService.deleteAccount(req.user._id);

    res.json({
      success: true,
      message: "Your account has been deleted.",
    });
  } catch (error) {
    next(error);
  }
};

const getSessions = async (req, res, next) => {
  try {
    const sessions = await profileService.getSessions(
      req.user._id,
      req.sessionId
    );

    res.json({
      success: true,
      data: sessions,
    });
  } catch (error) {
    next(error);
  }
};

const revokeSession = async (req, res, next) => {
  try {
    const isCurrent = req.params.sessionId === req.sessionId;

    await profileService.revokeSession(req.user._id, req.params.sessionId);

    res.json({
      success: true,
      message: isCurrent
        ? "You have been logged out of this device"
        : "Device logged out",
    });
  } catch (error) {
    next(error);
  }
};

const revokeOtherSessions = async (req, res, next) => {
  try {
    await profileService.revokeOtherSessions(req.user._id, req.sessionId);

    res.json({
      success: true,
      message: "Logged out of all other devices",
    });
  } catch (error) {
    next(error);
  }
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