const {
  loginUser,
  getUserProfile,
} = require("../services/authService");

const parseBody = require("../utils/bodyParser");
const sendJSON = require("../utils/response");


// POST /auth/login


const login = async (req, res) => {
  try {
    const body = await parseBody(req);

    const user = loginUser(body);

    if (!user) {
      return sendJSON(res, 401, {
        success: false,
        message: "Invalid email or password",
      });
    }

    sendJSON(res, 200, {
      success: true,
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    sendJSON(res, 500, {
      success: false,
      message: error.message,
    });
  }
}


// GET /auth/profile?id=:id


const getProfile = (req, res, userId) => {
  try {
    const user = getUserProfile(userId);

    if (!user) {
      return sendJSON(res, 404, {
        success: false,
        message: "User not found",
      });
    }

    sendJSON(res, 200, {
      success: true,
      data: user,
    });
  } catch (error) {
    sendJSON(res, 500, {
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  login,
  getProfile,
};
