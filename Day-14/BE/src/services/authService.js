const User = require("../models/User");

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({
    email,
    password,
  }).select("-password");

  return user;
};

const getUserProfile = async (id) => {
  const user = await User.findById(id).select("-password");

  return user;
};

module.exports = {
  loginUser,
  getUserProfile,
};