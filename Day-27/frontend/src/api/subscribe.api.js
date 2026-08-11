import api from "./axios";

export const getCaptcha = async () => {
  const response = await api.get("/subscribe/captcha");
  return response.data.data;
};

export const subscribeEmail = async ({ email, captchaAnswer, captchaToken }) => {
  const response = await api.post("/subscribe", {
    email,
    captchaAnswer,
    captchaToken,
  });
  return response.data;
};
