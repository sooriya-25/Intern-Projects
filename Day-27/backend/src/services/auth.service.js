const User = require("../models/User");
const roleService = require("./role.service");

const { hashPassword, comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/jwt");

const STATUS = require("../constants/status");

const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const defaultRole = await roleService.getDefaultRole();

  if (!defaultRole) {
    throw new Error(
      "No default role is configured. Please contact an administrator."
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
    throw new Error("Invalid email or password");
  }

  const isPasswordCorrect = await comparePassword(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  if (user.status === STATUS.INACTIVE) {
    throw new Error("Your account has been deactivated");
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
      role: user.role,
    },
  };
};

module.exports = {
  register,
  login,
};
