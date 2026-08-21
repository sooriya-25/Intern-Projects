const authService = require("../services/auth.service");

const sendOtp = async (req, res, next) => {
  try {
    const data = await authService.sendSignupOtp(req.body);

    res.status(200).json({
      success: true,
      message: "OTP sent to your email address",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const data = await authService.verifySignupOtp(req.body);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const data = await authService.loginWithPassword(req.body);

    res.status(200).json({
      success: true,
      message: "Password verified. Enter the code sent to your email to finish logging in.",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const verifyLoginOtp = async (req, res, next) => {
  console.log("req.ip", req.ip);
  try {
    const data = await authService.verifyLoginOtp({
      ...req.body,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Revokes only the session that's making this request. Requires
// `authenticate` on the route, which is what supplies req.user/req.sessionId.
const logout = async (req, res, next) => {
  try {
    await authService.logout(req.user._id, req.sessionId);

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const data = await authService.forgotPassword(req.body);

    res.status(200).json({
      success: true,
      message: "Reset code has been sent to your email",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const verifyResetOtp = async (req, res, next) => {
  try {
    const data = await authService.verifyResetOtp(req.body);

    res.status(200).json({
      success: true,
      message: "Code verified successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const data = await authService.resetPassword(req.body);

    res.status(200).json({
      success: true,
      message: "Password reset successfully. Please log in.",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
  register,
  login,
  verifyLoginOtp,
  logout,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
};
