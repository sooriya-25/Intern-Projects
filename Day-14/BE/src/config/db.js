const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../db/db.json");

// Read DB
const readDB = () => {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
};

// Write DB
const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = {
  readDB,
  writeDB,
};