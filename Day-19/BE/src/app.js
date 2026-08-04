const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const notFoundMiddleware = require("./middleware/notFoundMiddleware");

const app = express();

// ===== Security Headers Middleware (Helmet) =====
// Protects against various vulnerabilities (XSS, clickjacking, etc.)
app.use(helmet());

// ===== CORS Configuration =====
// Configure allowed origins and methods
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400, // 24 hours
};
app.use(cors(corsOptions));

// ===== Rate Limiting =====
// Limit requests to prevent abuse
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
});

// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many login attempts, please try again later.",
  skipSuccessfulRequests: true, // Don't count successful requests
});

// Apply general rate limiter to all requests
app.use(generalLimiter);

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/tasks", taskRoutes);

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task Manager Backend Running",
  });
});

// 404 Middleware
app.use(notFoundMiddleware);

module.exports = app;