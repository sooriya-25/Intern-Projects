const User = require("../models/User");
const Role = require("../models/Role");

const getUsers = async () => {
  return await User.find().select("-password").populate("role");
};

const updateUserStatus = async (id, status) => {
  return await User.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
    }
  )
    .select("-password")
    .populate("role");
};

const updateUserRole = async (id, roleId) => {
  const role = await Role.findById(roleId);

  if (!role) {
    const error = new Error("Role not found");
    error.statusCode = 404;
    throw error;
  }

  return await User.findByIdAndUpdate(
    id,
    { role: roleId },
    {
      new: true,
    }
  )
    .select("-password")
    .populate("role");
};

module.exports = {
  getUsers,
  updateUserStatus,
  updateUserRole,
};
