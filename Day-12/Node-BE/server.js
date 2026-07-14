const http = require("http");

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const PORT = 3001;

const server = http.createServer((req, res) => {
  // -----------------------------
  // CORS Headers
  // -----------------------------
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  // Handle Preflight Request
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // Try auth routes first
  if (authRoutes(req, res)) {
    return;
  }

  // Then try task routes
  if (taskRoutes(req, res)) {
    return;
  }

  // 404 - Route not found
  res.writeHead(404, {
    "Content-Type": "application/json",
  });

  res.end(
    JSON.stringify({
      success: false,
      message: "Route not found",
    })
  );
});

server.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});