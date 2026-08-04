const User = require("../models/User");

const getProfile = async (userId) => {
  return await User.findById(userId).select("-password");
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
  ).select("-password");
};

module.exports = {
  getProfile,
  updateProfile,
};