const User = require("../models/User");

const getUsers = async () => {
  return await User.find().select("-password");
};

const updateUserStatus = async (id, status) => {
  return await User.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
    }
  ).select("-password");
};

module.exports = {
  getUsers,
  updateUserStatus,
};