const { verifyToken } = require("../utils/jwt");

const User = require("../models/User");
const HTTP_STATUS = require("../constants/httpStatus");
const AppError = require("../utils/appError");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Access token is required", HTTP_STATUS.UNAUTHORIZED);
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id)
      .select("-password")
      .populate("role");

    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.UNAUTHORIZED);
    }

    if (user.isDeleted) {
      throw new AppError("This account has been deleted", HTTP_STATUS.UNAUTHORIZED);
    }

    if (!user.role) {
      throw new AppError("No role assigned to this user", HTTP_STATUS.FORBIDDEN);
    }

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }

    return next(new AppError("Invalid or expired token", HTTP_STATUS.UNAUTHORIZED));
  }
};

module.exports = authenticate;
