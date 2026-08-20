const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const createRateLimiter = require("../middlewares/rateLimit.middleware");

// Request body validation for all routes below is handled globally by
// express-openapi-validator (see app.js + src/openapi/modules/auth.yaml).

const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many login attempts, please try again later.",
});

const loginOtpLimiter = createRateLimiter({
  windowMs: 3 * 60 * 1000,
  max: 5,
  message: "Too many attempts, please try again later.",
});

const otpLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "Too many OTP requests, please try again later.",
});

// const otpVerifyLimiter = createRateLimiter({
//   windowMs: 3 * 60 * 1000,
//   max: 2,
//   message: "Too many attempts, please try again later.",
// });

const forgotPasswordLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "Too many password reset requests, please try again later.",
});

const verifyResetOtpLimiter = createRateLimiter({
  windowMs: 3 * 60 * 1000,
  max: 5,
  message: "Too many attempts, please try again later.",
});

const resetPasswordLimiter = createRateLimiter({
  windowMs: 3 * 60 * 1000,
  max: 5,
  message: "Too many attempts, please try again later.",
});

router.post("/send-otp", otpLimiter, authController.sendOtp);

router.post(
  "/verify-otp",
  //otpVerifyLimiter,
  authController.verifyOtp
);

router.post("/register", authController.register);

router.post("/login", loginLimiter, authController.login);

router.post(
  "/verify-login-otp",
  loginOtpLimiter,
  authController.verifyLoginOtp
);

router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  authController.forgotPassword
);

router.post(
  "/verify-reset-otp",
  verifyResetOtpLimiter,
  authController.verifyResetOtp
);

router.post(
  "/reset-password",
  resetPasswordLimiter,
  authController.resetPassword
);

module.exports = router;
