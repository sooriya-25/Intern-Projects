const {
  login,
  getProfile,
} = require("../controllers/authController");

const authRoutes = (req, res) => {
  const { method, url } = req;

  // POST /auth/login

  if (
    method === "POST" &&
    url === "/auth/login"
  ) {
    login(req, res);
    return true;
  }

  // GET /auth/profile?id=:id

  if (
    method === "GET" &&
    url.startsWith("/auth/profile")
  ) {
    const urlObj = new URL(
      url,
      "http://localhost"
    );
    const userId =
      urlObj.searchParams.get("id");

    getProfile(req, res, userId);
    return true;
  }

  return false;
}

module.exports = authRoutes;
