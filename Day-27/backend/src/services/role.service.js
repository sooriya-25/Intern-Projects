const Role = require("../models/Role");
const User = require("../models/User");
const MODULES = require("../constants/modules");
const HTTP_STATUS = require("../constants/httpStatus");
const AppError = require("../utils/appError");

const VALID_MODULES = Object.values(MODULES);


const normalizePermissions = (permissions = []) => {
  return permissions
    .filter((permission) => VALID_MODULES.includes(permission.module))
    .map((permission) => {
      const view =
        permission.view || permission.add || permission.edit || permission.delete;

      return {
        module: permission.module,
        view: Boolean(view),
        add: Boolean(permission.add),
        edit: Boolean(permission.edit),
        delete: Boolean(permission.delete),
      };
    });
};

const getRoles = async () => {
  const roles = await Role.find().sort({ createdAt: 1 });

  // Attach a live count of assigned users so the UI can disable Delete
  // without a second round trip.
  const roleIds = roles.map((role) => role._id);

  const counts = await User.aggregate([
    { $match: { role: { $in: roleIds } } },
    { $group: { _id: "$role", count: { $sum: 1 } } },
  ]);

  const countMap = counts.reduce((acc, entry) => {
    acc[entry._id.toString()] = entry.count;
    return acc;
  }, {});

  return roles.map((role) => ({
    ...role.toObject(),
    userCount: countMap[role._id.toString()] || 0,
  }));
};

const getRoleById = async (id) => {
  return await Role.findById(id);
};

// If a role is being set as default, unset the flag on whichever role
// currently holds it, so exactly one role is ever the default.
const clearExistingDefault = async (excludeId = null) => {
  await Role.updateMany(
    { isDefault: true, _id: { $ne: excludeId } },
    { $set: { isDefault: false } }
  );
};

const createRole = async (roleData) => {
  if (roleData.isDefault) {
    await clearExistingDefault();
  }

  return await Role.create({
    name: roleData.name,
    description: roleData.description || "",
    isSystem: false, // isSystem can only ever be set by the seed script
    isDefault: Boolean(roleData.isDefault),
    permissions: normalizePermissions(roleData.permissions),
  });
};

const updateRole = async (id, roleData) => {
  const role = await Role.findById(id);

  if (!role) {
    return null;
  }

  if (role.isSystem) {
    throw new AppError("System roles cannot be modified", HTTP_STATUS.FORBIDDEN);
  }

  if (roleData.name !== undefined) role.name = roleData.name;
  if (roleData.description !== undefined) role.description = roleData.description;
  if (roleData.permissions !== undefined) {
    role.permissions = normalizePermissions(roleData.permissions);
  }
  if (roleData.isDefault !== undefined) {
    if (roleData.isDefault) {
      await clearExistingDefault(role._id);
    }
    role.isDefault = Boolean(roleData.isDefault);
  }

  await role.save();

  return role;
};

// Used by auth.service.js at registration time to assign a starting role
// to new signups.
const getDefaultRole = async () => {
  return await Role.findOne({ isDefault: true });
};

const deleteRole = async (id) => {
  const role = await Role.findById(id);

  if (!role) {
    return null;
  }

  if (role.isSystem) {
    throw new AppError("System roles cannot be deleted", HTTP_STATUS.FORBIDDEN);
  }

  if (role.isDefault) {
    throw new AppError(
      "This is the default signup role and cannot be deleted. Set another role as default first.",
      HTTP_STATUS.CONFLICT
    );
  }

  const assignedCount = await User.countDocuments({ role: id });

  if (assignedCount > 0) {
    throw new AppError(
      `Cannot delete role: ${assignedCount} user(s) are currently assigned to it`,
      HTTP_STATUS.CONFLICT
    );
  }

  await Role.findByIdAndDelete(id);

  return role;
};

module.exports = {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  getDefaultRole,
  normalizePermissions,
};
