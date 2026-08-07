const HTTP_STATUS = require("../constants/httpStatus");
const AppError = require("../utils/appError");

const checkPermission = (module, action) => {
  return (req, res, next) => {
    const role = req.user && req.user.role;

    if (!role || !Array.isArray(role.permissions)) {
      return next(new AppError("Access denied", HTTP_STATUS.FORBIDDEN));
    }

    const modulePermission = role.permissions.find(
      (permission) => permission.module === module
    );

    if (!modulePermission) {
      return next(new AppError("Access denied", HTTP_STATUS.FORBIDDEN));
    }

    const hasAccess =
      modulePermission[action] === true ||
      (action === "view" &&
        (modulePermission.add ||
          modulePermission.edit ||
          modulePermission.delete));

    if (!hasAccess) {
      return next(new AppError("Access denied", HTTP_STATUS.FORBIDDEN));
    }

    next();
  };
};

module.exports = checkPermission;
