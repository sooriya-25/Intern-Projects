const { randomUUID } = require("node:crypto");
const logger = require("../utils/logger");

const requestLogger = (req, res, next) => {
  const startedAt = process.hrtime.bigint();
  const requestId = req.get("x-request-id") || randomUUID();

  req.requestId = requestId;
  res.setHeader("x-request-id", requestId);
  req.log = (level, message, props = {}) =>
    logger(level, message, { requestId, ...props });

  logger("info", "request.received", {
    requestId,
    method: req.method,
    path: req.originalUrl,
    ip: req.ip,
  });

  res.on("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1e6;

    logger(res.statusCode >= 500 ? "error" : "info", "request.completed", {
      requestId,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Number(durationMs.toFixed(2)),
      ip: req.ip,
      userId: req.user?.id || req.user?._id,
    });
  });

  next();
};

module.exports = requestLogger;