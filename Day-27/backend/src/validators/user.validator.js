const { body } = require("express-validator");

const updateUserStatusValidator = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage("Invalid status"),
];

module.exports = {
  updateUserStatusValidator,
};