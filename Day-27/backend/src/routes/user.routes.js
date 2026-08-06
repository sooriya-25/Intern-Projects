const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");

const authenticate = require("../middlewares/auth.middleware");
const requireSystemRole = require("../middlewares/requireSystemRole.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  updateUserStatusValidator,
  updateUserRoleValidator,
} = require("../validators/user.validator");

router.get(
  "/",
  authenticate,
  requireSystemRole,
  userController.getUsers
);

router.patch(
  "/:id/status",
  authenticate,
  requireSystemRole,
  updateUserStatusValidator,
  validate,
  userController.updateUserStatus
);

router.patch(
  "/:id/role",
  authenticate,
  requireSystemRole,
  updateUserRoleValidator,
  validate,
  userController.updateUserRole
);

module.exports = router;
