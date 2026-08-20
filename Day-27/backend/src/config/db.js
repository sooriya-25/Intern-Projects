const mongoose = require("mongoose");
const env = require("./env");
const logger = require("../utils/logger");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(env.MONGO_URI);

    logger("info", "database.connected", {
      host: connection.connection.host,
      database: connection.connection.name,
    });
  } catch (error) {
    logger("error", "database.connection_failed", {
      message: error.message,
      stack: error.stack,
    });
    process.exit(1);
  }
};

module.exports = connectDB;