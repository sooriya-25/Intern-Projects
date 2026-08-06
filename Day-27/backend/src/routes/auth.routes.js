const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const createRateLimiter = require("../middlewares/rateLimit.middleware");  

const {
  registerValidator,
  loginValidator,
} = require("../validators/auth.validator");

const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: "Too many login attempts, please try again later.",
});

router.post(
  "/register",
  registerValidator,
  validate,
  authController.register
);

router.post(
  "/login",
  loginLimiter,
  loginValidator,
  validate,
  authController.login
);

module.exports = router;