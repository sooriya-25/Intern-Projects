const fs = require("node:fs");
const path = require("node:path");
const { createLogger, format, transports } = require("winston");

const logDirectory = path.join(__dirname, "../../logs");
fs.mkdirSync(logDirectory, { recursive: true });

const winstonLogger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({
      filename: path.join(logDirectory, "app.log"),
    }),
  ],
});

const logger = (level, message, props = {}) => {
  winstonLogger.log(level, message, props);
};

module.exports = logger;