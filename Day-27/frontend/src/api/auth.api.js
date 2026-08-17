import api from "./axios";

export const login = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const sendOtp = async (data) => {
  const response = await api.post("/auth/send-otp", data);
  return response.data;
};

export const verifyOtp = async (data) => {
  const response = await api.post("/auth/verify-otp", data);
  return response.data;
};

export const register = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
