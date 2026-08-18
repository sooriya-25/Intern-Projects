const bcrypt = require("bcrypt");

const Role = require("../src/models/Role");

const ROLES = require("../src/constants/roles");
const STATUS = require("../src/constants/status");

// `role` on the User model is an ObjectId ref to the Role collection, so
// the ADMIN/USER Role documents must already exist (seed roles first —
// see seeds/seed.js) before this runs.
const users = async () => {
  const password = await bcrypt.hash("123456", 10);

  const [adminRole, userRole] = await Promise.all([
    Role.findOne({ name: ROLES.ADMIN }),
    Role.findOne({ name: ROLES.USER }),
  ]);

  if (!adminRole || !userRole) {
    throw new Error(
      "ADMIN/USER roles not found. Make sure seeds/roles.js runs before seeds/users.js.",
    );
  }

  return [
    {
      name: "Admin",
      email: "admin@gmail.com",
      password,
      phone: "9999999999",
      role: adminRole._id,
      status: STATUS.ACTIVE,
    },
    {
      name: "Sooriya",
      email: "user@gmail.com",
      password,
      phone: "8888888888",
      role: userRole._id,
      status: STATUS.ACTIVE,
    },
  ];
};

module.exports = users;