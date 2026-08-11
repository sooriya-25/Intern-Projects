const subscribeService = require("../services/subscribe.service");

const getCaptcha = (req, res, next) => {
  try {
    const challenge = subscribeService.getCaptchaChallenge();

    res.status(200).json({
      success: true,
      data: challenge,
    });
  } catch (error) {
    next(error);
  }
};

const subscribe = async (req, res, next) => {
  try {
    const subscriber = await subscribeService.subscribeEmail(req.body);

    res.status(201).json({
      success: true,
      message: "You're subscribed! Watch your inbox for market updates.",
      data: {
        email: subscriber.email,
        status: subscriber.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCaptcha,
  subscribe,
};
