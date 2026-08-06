const checkPermission = (module, action) => {
  return (req, res, next) => {
    const role = req.user && req.user.role;

    if (!role || !Array.isArray(role.permissions)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const modulePermission = role.permissions.find(
      (permission) => permission.module === module
    );

    if (!modulePermission) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const hasAccess =
      modulePermission[action] === true ||
      (action === "view" &&
        (modulePermission.add ||
          modulePermission.edit ||
          modulePermission.delete));

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };
};

module.exports = checkPermission;
