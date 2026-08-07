
const HTTP_STATUS = require("../constants/httpStatus");
const AppError = require("../utils/appError");

const requireSystemRole = (req, res, next) => {
  const role = req.user && req.user.role;

  if (!role || role.isSystem !== true) {
    return next(new AppError("Access denied", HTTP_STATUS.FORBIDDEN));
  }

  next();
};

module.exports = requireSystemRole;
