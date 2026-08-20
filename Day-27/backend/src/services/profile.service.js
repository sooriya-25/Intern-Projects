const User = require("../models/User");

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

// Soft delete: flips isDeleted + records deletedAt, but keeps the
// document (and anything referencing it, e.g. Todos/Watchlist) intact.
// auth.middleware / auth.service reject the account afterwards.
const deleteAccount = async (userId) => {
  return User.findByIdAndUpdate(
    userId,
    {
      isDeleted: true,
      deletedAt: new Date(),
    },
    { new: true }
  )
    .populate("role")
    .select("-password");
};

module.exports = {
  getProfile,
  updateProfile,
  updateProfilePhoto,
  removeProfilePhoto,
  deleteAccount,
};