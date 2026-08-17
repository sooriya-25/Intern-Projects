const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const createRateLimiter = require("../middlewares/rateLimit.middleware");

const {
  sendOtpValidator,
  verifyOtpValidator,
  registerValidator,
  loginValidator,
} = require("../validators/auth.validator");

const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many login attempts, please try again later.",
});

const otpLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "Too many OTP requests, please try again later.",
});

const otpVerifyLimiter = createRateLimiter({
  windowMs: 1 * 60 * 1000,
  max: 2,
  message: "Too many attempts, please try again later.",
});

router.post(
  "/send-otp",
  otpLimiter,
  sendOtpValidator,
  validate,
  authController.sendOtp
);

router.post(
  "/verify-otp",
  otpVerifyLimiter,
  verifyOtpValidator,
  validate,
  authController.verifyOtp
);

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
