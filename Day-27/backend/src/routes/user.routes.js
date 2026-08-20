const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");

const authenticate = require("../middlewares/auth.middleware");
const requireSystemRole = require("../middlewares/requireSystemRole.middleware");

// Request body validation is handled globally by express-openapi-validator
// (see app.js + src/openapi/modules/user.yaml).

router.get("/", authenticate, requireSystemRole, userController.getUsers);

router.patch(
  "/:id/status",
  authenticate,
  requireSystemRole,
  userController.updateUserStatus
);

router.patch(
  "/:id/role",
  authenticate,
  requireSystemRole,
  userController.updateUserRole
);

module.exports = router;
