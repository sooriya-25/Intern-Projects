const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  updateUserStatusValidator,
} = require("../validators/user.validator");

const ROLES = require("../constants/roles");

router.get(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  userController.getUsers
);

router.patch(
  "/:id/status",
  authenticate,
  authorize(ROLES.ADMIN),
  updateUserStatusValidator,
  validate,
  userController.updateUserStatus
);

module.exports = router;