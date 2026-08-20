const HTTP_STATUS = require("../constants/httpStatus");
const AppError = require("../utils/appError");
const logger = require("../utils/logger");

// express-openapi-validator throws HttpError subclasses shaped like:
//   { status: 400, name: "Bad Request", message: "...", errors: [{ path, message }] }
// Detect by duck-typing (the lib doesn't export these classes for
// instanceof checks) so we can turn them into a proper 4xx response
// instead of falling through to a generic 500.
const isOpenApiValidationError = (err) =>
  typeof err.status === "number" && Array.isArray(err.errors);

const errorHandler = (err, req, res, next) => {
  const statusCode =
    (err instanceof AppError && err.statusCode) ||
    (isOpenApiValidationError(err) && err.status) ||
    HTTP_STATUS.INTERNAL_SERVER_ERROR;

  logger("error", err.message, {
    event: "request.error",
    requestId: req.requestId,
    name: err.name,
    stack: err.stack,
    method: req.method,
    path: req.originalUrl || req.url,
    statusCode,
  });

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (isOpenApiValidationError(err)) {
    const firstDetail = err.errors[0];
    const message = firstDetail
      ? `${firstDetail.path ? `${firstDetail.path}: ` : ""}${firstDetail.message}`
      : err.message;

    return res.status(err.status).json({
      success: false,
      message,
    });
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal Server Error",
  });
};

module.exports = errorHandler;