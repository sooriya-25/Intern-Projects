const User = require("../models/User");
const roleService = require("./role.service");

const { hashPassword, comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/jwt");

const STATUS = require("../constants/status");
const HTTP_STATUS = require("../constants/httpStatus");
const AppError = require("../utils/appError");

const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("Email already exists", HTTP_STATUS.CONFLICT);
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
    role: defaultRole._id,
  });

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

  await user.save();

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
  register,
  login,
};
