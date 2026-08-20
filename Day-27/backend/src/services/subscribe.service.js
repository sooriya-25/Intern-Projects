const Subscriber = require("../models/Subscriber");
const { generateCaptcha, verifyCaptcha } = require("../utils/captcha");
const AppError = require("../utils/appError");
const HTTP_STATUS = require("../constants/httpStatus");
const { sendMail } = require("../utils/mailer");
const logger = require("../utils/logger");
const { getRenderedTemplate } = require("./emailTemplate.service");
const env = require("../config/env");

const getCaptchaChallenge = () => {
  return generateCaptcha();
};

const sendWelcomeEmail = async (subscriber) => {
  try {
    const { subject, text, html } = await getRenderedTemplate(
      "SUBSCRIPTION_WELCOME",
      {
        email: subscriber.email,
        appName: env.SMTP_FROM_NAME,
        clientUrl: env.CLIENT_URL,
        year: new Date().getFullYear(),
      }
    );

    await sendMail({ to: subscriber.email, subject, text, html });

    subscriber.emailSentAt = new Date();
    await subscriber.save();
  } catch (error) {
    logger("error", "subscription.welcome_email_failed", {
      message: error.message,
      stack: error.stack,
    });
  }
};

const subscribeEmail = async ({ email, captchaAnswer, captchaToken }) => {
  const isValidCaptcha = verifyCaptcha(captchaToken, captchaAnswer);
  if (!isValidCaptcha) {
    throw new AppError(
      "Captcha verification failed. Please try again.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const existing = await Subscriber.findOne({ email });

  if (existing) {
    if (existing.status === "SUBSCRIBED") {
      throw new AppError(
        "This email is already subscribed.",
        HTTP_STATUS.CONFLICT
      );
    }

    existing.status = "SUBSCRIBED";
    await existing.save();

    sendWelcomeEmail(existing); 

    return existing;
  }

  const subscriber = await Subscriber.create({ email });

  sendWelcomeEmail(subscriber); 

  return subscriber;
};

module.exports = {
  getCaptchaChallenge,
  subscribeEmail,
};
