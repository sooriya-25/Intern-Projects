const ROLE_HIERARCHY = {
  Member: 1,
  Admin: 2,
};

const canAccessTaskActions = (role) => {
  return ROLE_HIERARCHY[role] >= ROLE_HIERARCHY.Member;
};

const canAccessUserManagement = (role) => {
  return ROLE_HIERARCHY[role] >= ROLE_HIERARCHY.Admin;
};

module.exports = {
  canAccessTaskActions,
  canAccessUserManagement,
};
