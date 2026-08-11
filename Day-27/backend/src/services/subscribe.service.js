const Subscriber = require("../models/Subscriber");
const { generateCaptcha, verifyCaptcha } = require("../utils/captcha");
const AppError = require("../utils/appError");
const HTTP_STATUS = require("../constants/httpStatus");

const getCaptchaChallenge = () => {
  return generateCaptcha();
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

    return existing;
  }

  const subscriber = await Subscriber.create({ email });

  return subscriber;
};

module.exports = {
  getCaptchaChallenge,
  subscribeEmail,
};
