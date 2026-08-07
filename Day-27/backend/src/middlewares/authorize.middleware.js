const HTTP_STATUS = require("../constants/httpStatus");
const AppError = require("../utils/appError");

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Access denied", HTTP_STATUS.FORBIDDEN));
    }

    next();
  };
};

module.exports = authorize;