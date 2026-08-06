const express = require("express");

const router = express.Router();

const roleController = require("../controllers/role.controller");

const authenticate = require("../middlewares/auth.middleware");
const requireSystemRole = require("../middlewares/requireSystemRole.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  createRoleValidator,
  updateRoleValidator,
} = require("../validators/role.validator");


router.get("/", authenticate, requireSystemRole, roleController.getRoles);

router.get("/:id", authenticate, requireSystemRole, roleController.getRole);

router.post(
  "/",
  authenticate,
  requireSystemRole,
  createRoleValidator,
  validate,
  roleController.createRole
);

router.put(
  "/:id",
  authenticate,
  requireSystemRole,
  updateRoleValidator,
  validate,
  roleController.updateRole
);

router.delete(
  "/:id",
  authenticate,
  requireSystemRole,
  roleController.deleteRole
);

module.exports = router;
