const bcrypt = require("bcrypt");

const ROLES = require("../src/constants/roles");
const STATUS = require("../src/constants/status");

const users = async () => {
  const password = await bcrypt.hash("123456", 10);

  return [
    {
      name: "Admin",
      email: "admin@gmail.com",
      password,
      role: ROLES.ADMIN,
      status: STATUS.ACTIVE,
    },
    {
      name: "Sooriya",
      email: "user@gmail.com",
      password,
      role: ROLES.USER,
      status: STATUS.ACTIVE,
    },
  ];
};

module.exports = users;