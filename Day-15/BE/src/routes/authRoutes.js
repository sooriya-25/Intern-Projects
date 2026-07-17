const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  register,
  login,
  getProfile,
  listUsers,
  changeUserRole,
  refresh,
} = require("../controllers/authController");
const { canAccessUserManagement } = require("../utils/rbac");

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.get("/profile", authMiddleware, getProfile);
router.get("/users", authMiddleware, (req, res, next) => {
  if (!canAccessUserManagement(req.user?.role)) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized access",
    });
  }
  next();
}, listUsers);
router.put("/users/:id/role", authMiddleware, (req, res, next) => {
  if (!canAccessUserManagement(req.user?.role)) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized access",
    });
  }
  next();
}, changeUserRole);

module.exports = router;