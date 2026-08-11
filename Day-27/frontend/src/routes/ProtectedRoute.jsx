import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import usePermission from "../hooks/usePermission";

// Two ways to guard a route:
//   1. roles={["ADMIN"]}      -> legacy, now checks role.isSystem for
//                                 "ADMIN" specifically (Users/Roles pages)
//   2. module="TODO" action="view" -> new dynamic permission check,
//                                 reads the matrix via usePermission
const ProtectedRoute = ({ children, roles = [], module, action }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { hasPermission, isAdmin } = usePermission();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length && roles.includes("ADMIN") && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (module && action && !hasPermission(module, action)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
