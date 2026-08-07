const HTTP_STATUS = require("../constants/httpStatus");
const AppError = require("../utils/appError");

const notFound = (req, res, next) => {
  next(new AppError("Route not found", HTTP_STATUS.NOT_FOUND));
};

module.exports = notFound;