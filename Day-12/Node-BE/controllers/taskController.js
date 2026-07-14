const taskService = require("../services/taskService");

const parseBody = require("../utils/bodyParser");

const sendJSON = require("../utils/response");

// ================================
// GET /tasks
// ================================

function getTasks(req, res) {
  const tasks = taskService.getAllTasks();

  sendJSON(res, 200, {
    success: true,
    data: tasks,
  });
}

// ================================
// GET /tasks/:id
// ================================

function getTask(req, res, id) {
  const task = taskService.getTaskById(id);

  if (!task) {
    return sendJSON(res, 404, {
      success: false,
      message: "Task not found",
    });
  }

  sendJSON(res, 200, {
    success: true,
    data: task,
  });
}

// ================================
// POST /tasks
// ================================

async function createTask(req, res) {
  try {
    const body = await parseBody(req);

    const task =
      taskService.createTask(body);

    sendJSON(res, 201, {
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch {
    sendJSON(res, 400, {
      success: false,
      message: "Invalid JSON",
    });
  }
}

// ================================
// PUT /tasks/:id
// ================================

async function updateTask(
  req,
  res,
  id
) {
  try {
    const body = await parseBody(req);

    const updated =
      taskService.updateTask(
        id,
        body
      );

    if (!updated) {
      return sendJSON(res, 404, {
        success: false,
        message: "Task not found",
      });
    }

    sendJSON(res, 200, {
      success: true,
      message: "Task updated successfully",
      data: updated,
    });
  } catch {
    sendJSON(res, 400, {
      success: false,
      message: "Invalid JSON",
    });
  }
}

// ================================
// DELETE /tasks/:id
// ================================

function deleteTask(req, res, id) {
  const deleted =
    taskService.deleteTask(id);

  if (!deleted) {
    return sendJSON(res, 404, {
      success: false,
      message: "Task not found",
    });
  }

  sendJSON(res, 200, {
    success: true,
    message: "Task deleted successfully",
  });
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};