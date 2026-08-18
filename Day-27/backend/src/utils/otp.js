const crypto = require("crypto");

const OTP_LENGTH = 6;
const OTP_TTL_MS = 3 * 60 * 1000; // 3 minutes to enter the OTP
const VERIFIED_TTL_MS = 15 * 60 * 1000; // window to complete signup after verification
const MAX_ATTEMPTS = 5; // max attempts to enter the correct OTP

const generateOtp = () => {
  return crypto.randomInt(0, 1000000).toString().padStart(OTP_LENGTH, "0");
};

const hashOtp = (otp) => {
  return crypto.createHash("sha256").update(String(otp)).digest("hex");
};

module.exports = {
  OTP_LENGTH,
  OTP_TTL_MS,
  VERIFIED_TTL_MS,
  MAX_ATTEMPTS,
  generateOtp,
  hashOtp,
};
