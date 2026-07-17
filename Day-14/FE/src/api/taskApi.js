import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Get All Tasks (Search + Pagination)
export const getTasks = async (
  page = 1,
  limit = 10,
  search = ""
) => {
  const response = await axios.get(`${API_URL}/tasks`, {
    params: {
      page,
      limit,
      search,
    },
  });

  return response.data;
};

// Get Single Task
export const getTaskById = async (id) => {
  const response = await axios.get(`${API_URL}/tasks/${id}`);
  return response.data;
};

// Create Task
export const addTask = async (task) => {
  const response = await axios.post(`${API_URL}/tasks`, task);
  return response.data;
};

// Update Task
export const updateTask = async (id, task) => {
  const response = await axios.put(
    `${API_URL}/tasks/${id}`,
    task
  );

  return response.data;
};

// Soft Delete Task
export const deleteTask = async (id) => {
  const response = await axios.delete(
    `${API_URL}/tasks/${id}`
  );

  return response.data;
};