const { canAccessTaskActions, canAccessUserManagement } = require("../utils/rbac");

const authorizeRole = (requiredPermission) => {
  return (req, res, next) => {
    const role = req.user?.role;
    const allowed =
      requiredPermission === "task"
        ? canAccessTaskActions(role)
        : requiredPermission === "user-management"
        ? canAccessUserManagement(role)
        : false;

    if (!allowed) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    next();
  };
};

module.exports = {
  authorizeRole,
};
