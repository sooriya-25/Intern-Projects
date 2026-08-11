const { body } = require("express-validator");

const subscribeValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
  body("captchaAnswer")
    .trim()
    .notEmpty()
    .withMessage("Captcha answer is required")
    .isAlphanumeric()
    .withMessage("Captcha answer must contain only letters and numbers"),
  body("captchaToken")
    .notEmpty()
    .withMessage("Captcha token is required"),
];

module.exports = {
  subscribeValidator,
};
