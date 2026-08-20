const express = require("express");

const router = express.Router();

const subscribeController = require("../controllers/subscribe.controller");
const createRateLimiter = require("../middlewares/rateLimit.middleware");

// Request body validation is handled globally by express-openapi-validator
// (see app.js + src/openapi/modules/subscribe.yaml).

const captchaLimiter = createRateLimiter({
  windowMs: 5 * 60 * 1000,
  max: 30,
  message: "Too many CAPTCHA requests, please try again shortly.",
});

const subscribeLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: "Too many subscription attempts, please try again later.",
});

router.get("/captcha", captchaLimiter, subscribeController.getCaptcha);

router.post(
  "/",
  subscribeLimiter,
  subscribeController.subscribe
);

module.exports = router;
