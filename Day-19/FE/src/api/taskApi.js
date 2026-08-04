import api from "./axios";

export const getTasks = async (
  page = 1,
  limit = 5,
  search = ""
) => {
  const response = await api.get("/tasks", {
    params: {
      page,
      limit,
      search,
    },
  });

  return response.data;
};

export const getTaskById = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const addTask = async (task) => {
  const response = await api.post("/tasks", task);
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await api.put(`/tasks/${id}`, task);

  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);

  return response.data;
};