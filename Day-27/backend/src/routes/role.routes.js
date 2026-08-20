const express = require("express");

const router = express.Router();

const roleController = require("../controllers/role.controller");

const authenticate = require("../middlewares/auth.middleware");
const requireSystemRole = require("../middlewares/requireSystemRole.middleware");

// Request body validation is handled globally by express-openapi-validator
// (see app.js + src/openapi/modules/role.yaml).

router.get("/", authenticate, requireSystemRole, roleController.getRoles);

router.get("/:id", authenticate, requireSystemRole, roleController.getRole);

router.post(
  "/",
  authenticate,
  requireSystemRole,
  roleController.createRole
);

router.put(
  "/:id",
  authenticate,
  requireSystemRole,
  roleController.updateRole
);

router.delete(
  "/:id",
  authenticate,
  requireSystemRole,
  roleController.deleteRole
);

module.exports = router;
