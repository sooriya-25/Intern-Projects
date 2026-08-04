require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("../src/config/db");

const User = require("../src/models/User");
const Stock = require("../src/models/Stock");

const users = require("./users");
const stocks = require("./stocks");

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("Clearing database...");

    await User.deleteMany();
    await Stock.deleteMany();

    console.log("Seeding users...");

    const seededUsers = await users();

    await User.insertMany(seededUsers);

    console.log("Seeding stocks...");

    await Stock.insertMany(stocks);

    console.log("Database seeded successfully.");

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedDatabase();