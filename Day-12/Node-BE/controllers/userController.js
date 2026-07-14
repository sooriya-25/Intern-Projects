const userService = require("../services/userService");
const parseBody = require("../utils/bodyParser");
const sendJSON = require("../utils/response");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    sendJSON(res, 200, {
      success: true,
      data: users,
    });
  } catch (error) {
    sendJSON(res, 500, {
      success: false,
      message: "Unable to fetch users",
    });
  }
}

const createUser = async (req, res) => {
  try {
    const body = await parseBody(req);
    const user = userService.createUser(body);

    sendJSON(res, 201, {
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch {
    sendJSON(res, 400, {
      success: false,
      message: "Invalid JSON",
    });
  }
}

const updateUser = async (req, res, id) => {
  try {
    const body = await parseBody(req);
    const updatedUser = userService.updateUser(id, body);

    if (!updatedUser) {
      return sendJSON(res, 404, {
        success: false,
        message: "User not found",
      });
    }

    sendJSON(res, 200, {
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch {
    sendJSON(res, 400, {
      success: false,
      message: "Invalid JSON",
    });
  }
}

const deleteUser = (req, res, id) => {
  const deleted = userService.deleteUser(id);

  if (!deleted) {
    return sendJSON(res, 404, {
      success: false,
      message: "User not found",
    });
  }

  sendJSON(res, 200, {
    success: true,
    message: "User deleted successfully",
  });
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
