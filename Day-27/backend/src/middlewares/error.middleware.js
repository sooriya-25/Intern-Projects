const HTTP_STATUS = require("../constants/httpStatus");
const AppError = require("../utils/appError");
const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger("error", err.message, {
    event: "request.error",
    requestId: req.requestId,
    name: err.name,
    stack: err.stack,
    method: req.method,
    path: req.originalUrl || req.url,
    statusCode: err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
  });

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal Server Error",
  });
};

module.exports = errorHandler;