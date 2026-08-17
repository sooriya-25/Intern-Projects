require("dotenv").config();

// CLIENT_URL can be a single origin or a comma-separated list, e.g.
// "http://localhost:3000,http://192.168.1.10:3000" — handy when the app is
// also opened from a phone/other device on the same network during dev.
const rawClientUrl = process.env.CLIENT_URL || "http://localhost:3000";
const CLIENT_URLS = rawClientUrl
  .split(",")
  .map((url) => url.trim().replace(/\/$/, ""))
  .filter(Boolean);

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
  CLIENT_URL: CLIENT_URLS[0],
  CLIENT_URLS,

  SMTP_HOST: process.env.SMTP_HOST || "smtp.gmail.com",
  SMTP_PORT: Number(process.env.SMTP_PORT) || 465,
  SMTP_SECURE: process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : true,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_FROM_NAME: process.env.SMTP_FROM_NAME || "Team",
  SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
};