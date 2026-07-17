const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  dashboardStats,
} = require("../controllers/taskController");
const { authorizeRole } = require("../middleware/authorizeMiddleware");

router.get("/", authMiddleware, getAllTasks);
router.get("/dashboard", authMiddleware, dashboardStats);
router.get("/:id", authMiddleware, getTaskById);
router.post("/", authMiddleware, authorizeRole("task"), createTask);
router.put("/:id", authMiddleware, authorizeRole("task"), updateTask);
router.delete("/:id", authMiddleware, authorizeRole("task"), deleteTask);

module.exports = router;