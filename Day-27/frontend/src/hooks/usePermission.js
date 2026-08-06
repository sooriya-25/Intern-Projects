import { useSelector } from "react-redux";

// Central place every component/route uses to answer "can this user do X
// on module Y". Reads straight from the Redux auth state, which holds
// whatever role object came back from the last /auth/login or /auth/me
// response — so a permission change made in Role Management shows up
// the next time this user's role is re-fetched (e.g. on next login, or
// if you wire up a periodic /profile refetch).
//
// Roles and Users modules are NOT part of the dynamic matrix (see
// backend constants/modules.js) — they're gated purely by role.isSystem,
// mirrored here via isAdmin.
const usePermission = () => {
  const { user } = useSelector((state) => state.auth);

  const role = user?.role;

  const isAdmin = Boolean(role?.isSystem);

  const hasPermission = (module, action) => {
    if (isAdmin) return true;

    if (!role || !Array.isArray(role.permissions)) return false;

    const modulePermission = role.permissions.find(
      (permission) => permission.module === module
    );

    if (!modulePermission) return false;

    if (action === "view") {
      return Boolean(
        modulePermission.view ||
          modulePermission.add ||
          modulePermission.edit ||
          modulePermission.delete
      );
    }

    return Boolean(modulePermission[action]);
  };

  return { hasPermission, isAdmin, role };
};

export default usePermission;
