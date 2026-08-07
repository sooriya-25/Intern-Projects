const userService = require("../services/user.service");
const HTTP_STATUS = require("../constants/httpStatus");
const AppError = require("../utils/appError");

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserStatus = async (req, res, next) => {
  try {
    const user = await userService.updateUserStatus(
      req.params.id,
      req.body.status
    );

    if (!user) {
      return next(new AppError("User not found", HTTP_STATUS.NOT_FOUND));
    }

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const user = await userService.updateUserRole(
      req.params.id,
      req.body.role
    );

    if (!user) {
      return next(new AppError("User not found", HTTP_STATUS.NOT_FOUND));
    }

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  updateUserStatus,
  updateUserRole,
};
