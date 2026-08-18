const MODULES = require("../src/constants/modules");

// ADMIN gets full CRUD on every module in the permission matrix.
const fullPermissions = Object.values(MODULES).map((module) => ({
  module,
  view: true,
  add: true,
  edit: true,
  delete: true,
}));

// USER gets read-only access by default; adjust as needed for your app.
const viewOnlyPermissions = Object.values(MODULES).map((module) => ({
  module,
  view: true,
  add: false,
  edit: false,
  delete: false,
}));

const roles = [
  {
    name: "ADMIN",
    description: "Full access to every module. Cannot be edited or deleted.",
    isSystem: true,
    isDefault: false,
    permissions: fullPermissions,
  },
  {
    name: "USER",
    description: "Default role for new accounts.",
    isSystem: true,
    isDefault: true,
    permissions: viewOnlyPermissions,
  },
];

module.exports = roles;