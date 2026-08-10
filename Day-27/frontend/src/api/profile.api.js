import api from "./axios";

export const getProfile = async () => {
  const response = await api.get("/profile");

  return response.data.data;
};

export const updateProfile = async (data) => {
  const response = await api.put("/profile", data);

  return response.data;
};

export const uploadProfilePhoto = async (formData) => {
  const response = await api.patch("/profile/photo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const removeProfilePhoto = async () => {
  const response = await api.delete("/profile/photo");

  return response.data;
};