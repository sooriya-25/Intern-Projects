import api from "./axios";

export const getProfile = async () => {
  const response = await api.get("/profile");

  return response.data.data;
};

export const updateProfile = async (data) => {
  const response = await api.put("/profile", data);

  return response.data;
};

export const uploadProfilePhoto = async (formData, onUploadProgress) => {
  const response = await api.patch("/profile/photo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (event) => {
      console.log("Upload progress:", event);
      if (onUploadProgress && event.total) {
        const percent = Math.round((event.loaded * 100) / event.total);
        onUploadProgress(percent);
      }
    },
  });

  return response.data;
};

export const removeProfilePhoto = async () => {
  const response = await api.delete("/profile/photo");

  return response.data;
};

export const deleteAccount = async () => {
  const response = await api.delete("/profile");

  return response.data;
};

export const getSessions = async () => {
  const response = await api.get("/profile/sessions");

  return response.data.data;
};

export const revokeSession = async (sessionId) => {
  const response = await api.delete(`/profile/sessions/${sessionId}`);

  return response.data;
};

export const revokeOtherSessions = async () => {
  const response = await api.delete("/profile/sessions");

  return response.data;
};