const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  register,
  login,
  getProfile,
  listUsers,
  updateUser,
  changeUserRole,
  deleteUser,
  refresh,
} = require("../controllers/authController");
const { authorizeRole } = require("../middleware/authorizeMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.get("/profile", authMiddleware, getProfile);
router.get("/users", authMiddleware, authorizeRole("user-management"), listUsers);
router.put("/users/:id", authMiddleware, authorizeRole("user-management"), updateUser);
router.put("/users/:id/role", authMiddleware, authorizeRole("user-management"), changeUserRole);
router.delete("/users/:id", authMiddleware, authorizeRole("user-management"), deleteUser);

module.exports = router;