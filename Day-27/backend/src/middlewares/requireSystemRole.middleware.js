
const requireSystemRole = (req, res, next) => {
  const role = req.user && req.user.role;

  if (!role || role.isSystem !== true) {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }

  next();
};

module.exports = requireSystemRole;
