const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const OpenApiValidator = require("express-openapi-validator");

const env = require("./config/env");

const routes = require("./routes");
const buildOpenApiSpec = require("./openapi/build");

const createRateLimiter = require("./middlewares/rateLimit.middleware");
const requestLogger = require("./middlewares/requestLogger.middleware");
const notFound = require("./middlewares/notFound.middleware");
const errorHandler = require("./middlewares/error.middleware"); // also formats express-openapi-validator errors

const app = express();

// Built once at startup from openapi/base.yaml + openapi/modules/*.yaml.
// Same object powers both request validation (below) and the docs UI.
const openApiSpec = buildOpenApiSpec();

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
app.use(requestLogger);
app.use("/uploads", express.static("uploads"));

// API documentation, generated from the same spec used to validate
// requests below — routes/schemas can never drift out of sync with the
// docs. Served outside the rate-limited /api mount.
app.get("/api-docs.json", (req, res) => res.json(openApiSpec));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

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

app.use(
  "/api",
  apiLimiter,
  OpenApiValidator.middleware({
    apiSpec: openApiSpec,
    validateRequests: true,
    validateResponses: false,
    validateSecurity: false, // auth is enforced by our own JWT middleware, not here
  }),
  routes
);

app.use(notFound);

app.use(errorHandler);

module.exports = app;
