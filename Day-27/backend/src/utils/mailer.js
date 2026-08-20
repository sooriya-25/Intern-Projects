const nodemailer = require("nodemailer");
const env = require("../config/env");
const logger = require("./logger");

let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;

  if (!env.SMTP_USER || !env.SMTP_PASS) {
    logger("warn", "mailer.credentials_missing", {
      message: "SMTP_USER / SMTP_PASS not set; emails will fail to send.",
    });
  }

  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE, // true for port 465, false for 587
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });

  return transporter;
};

/**
 * Sends a single email. Throws on failure so callers can decide how to
 * handle/log the error (we don't want a mail failure to crash the app).
 */
const sendMail = async ({ to, subject, html, text }) => {
  const mailer = getTransporter();

  return mailer.sendMail({
    from: `"${env.SMTP_FROM_NAME}" <${env.SMTP_FROM_EMAIL}>`,
    to,
    subject,
    text,
    html,
  });
};

module.exports = { sendMail };
