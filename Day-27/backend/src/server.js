const app = require("./app");
const connectDB = require("./config/db");
const env = require("./config/env");
const logger = require("./utils/logger");

const startServer = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    logger("info", "server.started", { port: env.PORT });
  });
};

startServer();