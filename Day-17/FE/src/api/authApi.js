import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Login API
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });

  return response.data;
};

// Get User Profile
export const getProfile = async (id) => {
  const response = await axios.get(
    `${API_URL}/auth/profile?id=${id}`
  );

  return response.data;
};