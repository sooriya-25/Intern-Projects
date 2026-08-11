const crypto = require("crypto");
const svgCaptcha = require("svg-captcha");
const env = require("../config/env");

const SECRET = env.JWT_SECRET || "stockpro-captcha-secret";
const TTL_MS = 5 * 60 * 1000; // 5 minutes

const sign = (payload) =>
  crypto.createHmac("sha256", SECRET).update(payload).digest("hex");

const hashText = (text) =>
  crypto.createHash("sha256").update(text).digest("hex");

const generateCaptcha = () => {
  const captcha = svgCaptcha.create({
    size: 5,
    noise: 2,
    color: true,
    background: "#f8fafc",
    width: 180,
    height: 70,
    fontSize: 56,
    ignoreChars: "0oO1ilI",
  });

  const expiresAt = Date.now() + TTL_MS;
  const answerHash = hashText(captcha.text.toUpperCase());
  const payload = `${answerHash}:${expiresAt}`;
  const signature = sign(payload);
  const token = Buffer.from(`${payload}:${signature}`).toString("base64");

  return {
    svg: captcha.data,
    token,
  };
};

const verifyCaptcha = (token, submittedAnswer) => {
  if (!token || !submittedAnswer) return false;

  let decoded;

  try {
    decoded = Buffer.from(token, "base64").toString("utf8");
  } catch (error) {
    return false;
  }

  const [hash, expiresAt, signature] = decoded.split(":");
  if (!hash || !expiresAt || !signature) return false;

  const payload = `${hash}:${expiresAt}`;
  if (sign(payload) !== signature) return false;
  if (Date.now() > Number(expiresAt)) return false;

  const answerHash = hashText(submittedAnswer.trim().toUpperCase());
  return answerHash === hash;
};

module.exports = {
  generateCaptcha,
  verifyCaptcha,
};
