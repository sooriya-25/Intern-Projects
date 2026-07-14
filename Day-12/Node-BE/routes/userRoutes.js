const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const userRoutes = (req, res) => {
  const { method, url } = req;
  const urlObj = new URL(url, "http://localhost");
  const pathname = urlObj.pathname;

  if (method === "GET" && pathname === "/users") {
    getUsers(req, res);
    return true;
  }

  if (method === "POST" && pathname === "/users") {
    createUser(req, res);
    return true;
  }

  if (method === "PUT" && pathname.startsWith("/users/")) {
    const id = pathname.split("/")[2];
    updateUser(req, res, id);
    return true;
  }

  if (method === "DELETE" && pathname.startsWith("/users/")) {
    const id = pathname.split("/")[2];
    deleteUser(req, res, id);
    return true;
  }

  return false;
}

module.exports = userRoutes;
