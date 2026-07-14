const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const taskRoutes = (req, res) => {
  const { method, url } = req;

  // Parse URL to get pathname (without query string)
  const urlObj = new URL(url, "http://localhost");
  const pathname = urlObj.pathname;

  // GET /tasks

  if (method === "GET" && pathname === "/tasks") {
    getTasks(req, res);
    return true;
  }

  // GET /tasks/:id

  if (
    method === "GET" &&
    pathname.startsWith("/tasks/")
  ) {
    const id = pathname.split("/")[2];

    getTask(req, res, id);
    return true;
  }

  // POST /tasks

  if (
    method === "POST" &&
    pathname === "/tasks"
  ) {
    createTask(req, res);
    return true;
  }

  // PUT /tasks/:id

  if (
    method === "PUT" &&
    pathname.startsWith("/tasks/")
  ) {
    const id = pathname.split("/")[2];

    updateTask(req, res, id);
    return true;
  }

  // DELETE /tasks/:id

  if (
    method === "DELETE" &&
    pathname.startsWith("/tasks/")
  ) {
    const id = pathname.split("/")[2];

    deleteTask(req, res, id);
    return true;
  }

  // No route matched

  return false;
}

module.exports = taskRoutes;