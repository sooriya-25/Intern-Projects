import api from "./axios";

// GET All Tasks
export const getTasks = async () => {
  await new Promise((resolve) =>
    setTimeout(resolve, 3000)
  );
  const response = await api.get("/tasks");
  return response.data;
};

// GET Single Task
export const getTaskById = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

// CREATE Task
export const createTask = async (task) => {
  const response = await api.post("/tasks", task);
  return response.data;
};

// UPDATE Task
export const updateTask = async ({ id, task }) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

// DELETE Task
export const deleteTask = async (id) => {
  console.log("id from taskAPI", id)
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};