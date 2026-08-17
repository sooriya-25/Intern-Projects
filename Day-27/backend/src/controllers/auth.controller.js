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
    const data = await authService.login(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
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
};
