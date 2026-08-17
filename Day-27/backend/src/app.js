const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const env = require("./config/env");

const routes = require("./routes");

const createRateLimiter = require("./middlewares/rateLimit.middleware");
const notFound = require("./middlewares/notFound.middleware");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser tools (curl, Postman, server-to-server) which
      // send no Origin header at all.
      if (!origin) return callback(null, true);

      if (env.CLIENT_URLS.includes(origin.replace(/\/$/, ""))) {
        return callback(null, true);
      }

      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));

const apiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Stock Management API is running",
  });
});

app.use("/api", apiLimiter, routes);

app.use(notFound);

app.use(errorHandler);

module.exports = app;