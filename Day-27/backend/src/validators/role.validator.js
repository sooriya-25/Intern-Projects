const { body } = require("express-validator");

const MODULES = require("../constants/modules");

const VALID_MODULES = Object.values(MODULES);

const permissionsValidator = body("permissions")
  .optional()
  .isArray()
  .withMessage("Permissions must be an array")
  .custom((permissions) => {
    for (const permission of permissions) {
      if (!permission.module || !VALID_MODULES.includes(permission.module)) {
        throw new Error(`Invalid module: ${permission.module}`);
      }
    }
    return true;
  });

const createRoleValidator = [
  body("name").trim().notEmpty().withMessage("Role name is required"),

  body("description").optional().trim(),

  body("isDefault").optional().isBoolean().withMessage("isDefault must be a boolean"),

  permissionsValidator,
];

const updateRoleValidator = [
  body("name").optional().trim().notEmpty().withMessage("Role name cannot be empty"),

  body("description").optional().trim(),

  body("isDefault").optional().isBoolean().withMessage("isDefault must be a boolean"),

  permissionsValidator,
];

module.exports = {
  createRoleValidator,
  updateRoleValidator,
};
