const { body } = require("express-validator");

const sendOtpValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),
];

const verifyOtpValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),

  body("otp")
    .trim()
    .notEmpty()
    .withMessage("OTP is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 digits")
    .isNumeric()
    .withMessage("OTP must contain only numbers"),
];

const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[0-9+\-\s()]{7,20}$/)
    .withMessage("Please enter a valid phone number"),

  body("companyName")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 150 })
    .withMessage("Company name is too long"),

  body("address")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 300 })
    .withMessage("Address is too long"),
];

const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

const forgotPasswordValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),
];

const verifyResetOtpValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),

  body("otp")
    .trim()
    .notEmpty()
    .withMessage("Reset code is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("Reset code must be 6 digits")
    .isNumeric()
    .withMessage("Reset code must contain only numbers"),
];

const resetPasswordValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters"),
];

module.exports = {
  sendOtpValidator,
  verifyOtpValidator,
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  verifyResetOtpValidator,
  resetPasswordValidator,
};
