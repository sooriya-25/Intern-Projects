const jwt = require("jsonwebtoken");
const env = require("../config/env");

const generateToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};

// Reads a token's payload (including `exp`) without verifying its
// signature. Only used right after we ourselves signed the token, to
// mirror its expiry onto the session record — never use this on a token
// received from a client.
const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
};