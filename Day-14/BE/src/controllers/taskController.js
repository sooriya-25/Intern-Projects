const {
  getTasks,
  getTask,
  addTask,
  editTask,
  removeTask,
} = require("../services/taskService");

const getAllTasks = (req, res) => {
  const tasks = getTasks();

  res.status(200).json({
    success: true,
    data: tasks,
  });
};

const getTaskById = (req, res) => {
  const task = getTask(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  res.status(200).json({
    success: true,
    data: task,
  });
};

const createTask = (req, res) => {
  const task = addTask(req.body);

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: task,
  });
};

const updateTask = (req, res) => {
  const task = editTask(req.params.id, req.body);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task,
  });
};

const deleteTask = (req, res) => {
  const deleted = removeTask(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};