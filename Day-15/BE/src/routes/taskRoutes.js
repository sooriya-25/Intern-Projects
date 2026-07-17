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
const { canAccessTaskActions } = require("../utils/rbac");

router.get("/", authMiddleware, getAllTasks);
router.get("/dashboard", authMiddleware, dashboardStats);
router.get("/:id", authMiddleware, getTaskById);
router.post("/", authMiddleware, (req, res, next) => {
  if (!canAccessTaskActions(req.user?.role)) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized access",
    });
  }
  next();
}, createTask);
router.put("/:id", authMiddleware, (req, res, next) => {
  if (!canAccessTaskActions(req.user?.role)) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized access",
    });
  }
  next();
}, updateTask);
router.delete("/:id", authMiddleware, (req, res, next) => {
  if (!canAccessTaskActions(req.user?.role)) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized access",
    });
  }
  next();
}, deleteTask);

module.exports = router;