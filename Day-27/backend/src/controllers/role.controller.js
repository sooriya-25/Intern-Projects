const roleService = require("../services/role.service");
const HTTP_STATUS = require("../constants/httpStatus");
const AppError = require("../utils/appError");

const getRoles = async (req, res, next) => {
  try {
    const roles = await roleService.getRoles();

    res.status(200).json({
      success: true,
      data: roles,
    });
  } catch (error) {
    next(error);
  }
};

const getRole = async (req, res, next) => {
  try {
    const role = await roleService.getRoleById(req.params.id);

    if (!role) {
      return next(new AppError("Role not found", HTTP_STATUS.NOT_FOUND));
    }

    res.status(200).json({
      success: true,
      data: role,
    });
  } catch (error) {
    next(error);
  }
};

const createRole = async (req, res, next) => {
  try {
    const role = await roleService.createRole(req.body);

    res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: role,
    });
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const role = await roleService.updateRole(req.params.id, req.body);

    if (!role) {
      return next(new AppError("Role not found", HTTP_STATUS.NOT_FOUND));
    }

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      data: role,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRole = async (req, res, next) => {
  try {
    const role = await roleService.deleteRole(req.params.id);

    if (!role) {
      return next(new AppError("Role not found", HTTP_STATUS.NOT_FOUND));
    }

    res.status(200).json({
      success: true,
      message: "Role deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
};
