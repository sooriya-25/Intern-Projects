const { validationResult } = require("express-validator");

const HTTP_STATUS = require("../constants/httpStatus");
const AppError = require("../utils/appError");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, HTTP_STATUS.BAD_REQUEST));
  }

  next();
};

module.exports = validate;