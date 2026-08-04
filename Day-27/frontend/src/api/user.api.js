import api from "./axios";

export const getUsers = async () => {
  const response = await api.get("/users");

  return response.data.data;
};

export const updateUserStatus = async (id, status) => {
  const response = await api.patch(`/users/${id}/status`, {
    status,
  });

  return response.data;
};