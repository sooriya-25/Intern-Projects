import api from "./axios";

export const registerUser = async (name, email, password) => {
  const response = await api.post("/auth/register", {
    name,
    email,
    password,
  });

  return response.data;
};

export const loginUser = async (identifier, password) => {
  const response = await api.post("/auth/login", {
    email: identifier,
    username: identifier,
    password,
  });

  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/auth/profile");

  return response.data;
};

export const getUsers = async () => {
  const response = await api.get("/auth/users");

  return response.data;
};

export const updateUser = async (id, payload) => {
  const response = await api.put(`/auth/users/${id}`, payload);

  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/auth/users/${id}`);

  return response.data;
};

export const refreshToken = async () => {
  const refresh = localStorage.getItem("refreshToken");
  const response = await api.post("/auth/refresh", { refreshToken: refresh });
  return response.data;
};