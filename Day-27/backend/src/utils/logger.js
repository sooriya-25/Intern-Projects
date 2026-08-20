const fs = require("node:fs");
const path = require("node:path");
const { createLogger, format, transports } = require("winston");

const logDirectory = path.join(__dirname, "../../logs");
fs.mkdirSync(logDirectory, { recursive: true });

const pad = (n) => String(n).padStart(2, "0");

const formatTimestamp = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
  `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

const THIS_FILE = path.join("utils", "logger.js");

/**
 * Walks the call stack (synchronously, at the moment logger() is called)
 * to find whoever called it, skipping frames inside this file. Produces
 * e.g. "auth.service.js:210:5)" — mirrors the file:line:col) shape used
 * by the reference loggerHelper.js format.
 */
const getCallSite = () => {
  const originalPrepare = Error.prepareStackTrace;
  const originalLimit = Error.stackTraceLimit;

  Error.prepareStackTrace = (_, stack) => stack;
  Error.stackTraceLimit = 10;

  const holder = {};
  Error.captureStackTrace(holder, getCallSite);
  const stack = holder.stack;

  Error.prepareStackTrace = originalPrepare;
  Error.stackTraceLimit = originalLimit;

  const frame = stack.find(
    (site) => !(site.getFileName() || "").endsWith(THIS_FILE)
  );

  if (!frame) return "unknown";

  const fileName = path.basename(frame.getFileName() || "unknown");
  return `${fileName}:${frame.getLineNumber()}:${frame.getColumnNumber()})`;
};

// Whole-line ANSI coloring by level, applied manually (rather than via
// winston's format.colorize()) because we build a custom single-line
// string in printf below and want the *entire* line colored, not just
// the level word.
const LEVEL_COLORS = {
  error: "\x1b[31m", // red
  warn: "\x1b[33m", // yellow
  info: "\x1b[36m", // cyan
  http: "\x1b[35m", // magenta
  debug: "\x1b[90m", // gray
};
const RESET = "\x1b[0m";

const colorizeLine = (level, line) => {
  const color = LEVEL_COLORS[level];
  return color ? `${color}${line}${RESET}` : line;
};

/**
 * Builds one line like:
 *   [2026-08-19 16:06:55] INFO auth.controller.js:75:18) POST /api/auth/login-verification 200 --[10.192.192.73] {"requestId":"..."}
 * for HTTP-flavoured logs (props include method/path), or:
 *   [2026-08-19 16:06:55] INFO server.js:10:5) server.started {"port":5000}
 * for everything else.
 */
const buildLine = ({
  level,
  message,
  timestamp,
  callSite,
  method,
  path: reqPath,
  statusCode,
  ip,
  ...rest
}) => {
  const head = `[${formatTimestamp(new Date(timestamp))}] ${level.toUpperCase()} ${callSite}`;

  let line;
  if (method && reqPath) {
    line = `${method} ${reqPath}`;
    if (statusCode !== undefined) line += ` ${statusCode}`;
    if (ip) line += ` --[${ip}]`;
    if (Object.keys(rest).length) line += ` ${JSON.stringify(rest)}`;
  } else {
    const metaJson = Object.keys(rest).length ? ` ${JSON.stringify(rest)}` : "";
    line = `${message}${metaJson}`;
  }

  return `${head} ${line}`;
};

// Same line shape as the terminal, but no ANSI color codes — used for
// the file transport so logs/app.log stays readable in a plain text
// editor / log viewer / `tail`, instead of full of \x1b[..] escapes.
const buildFileLine = (info) => buildLine(info);

// Terminal version: same line, whole thing colorized by level.
const buildConsoleLine = (info) => colorizeLine(info.level, buildLine(info));

const winstonLogger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  transports: [
    new transports.File({
      filename: path.join(logDirectory, "app.log"),
      format: format.combine(format.timestamp(), format.printf(buildFileLine)),
    }),
    new transports.Console({
      silent: process.env.NODE_ENV === "test",
      format: format.combine(
        format.timestamp(),
        format.printf(buildConsoleLine)
      ),
    }),
  ],
});

const logger = (level, message, props = {}) => {
  const callSite = getCallSite();
  winstonLogger.log(level, message, { ...props, callSite });
};

module.exports = logger;