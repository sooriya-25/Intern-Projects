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

module.exports = {
  getProfile,
  updateProfile,
};