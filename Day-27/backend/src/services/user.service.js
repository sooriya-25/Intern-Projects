const User = require("../models/User");
const Role = require("../models/Role");
const HTTP_STATUS = require("../constants/httpStatus");
const AppError = require("../utils/appError");

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
    throw new AppError("Role not found", HTTP_STATUS.NOT_FOUND);
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
