const { body } = require("express-validator");

const updateUserStatusValidator = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage("Invalid status"),
];

const updateUserRoleValidator = [
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isMongoId()
    .withMessage("Role must be a valid id"),
];

module.exports = {
  updateUserStatusValidator,
  updateUserRoleValidator,
};