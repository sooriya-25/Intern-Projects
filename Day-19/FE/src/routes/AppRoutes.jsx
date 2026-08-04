import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";

// ===== Lazy Loading Routes =====
// Code-splitting for better performance: each page loads only when needed
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const TasksPage = lazy(() => import("../pages/Tasks"));
const Users = lazy(() => import("../pages/Users"));
const Profile = lazy(() => import("../pages/Profile"));
const NotFound = lazy(() => import("../pages/NotFound"));


// Loading component shown while lazy components are loading
const LoadingFallback = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <p>Loading...</p>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="tasks" replace />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="users" element={<ProtectedRoute allowedRoles={["Admin"]}><Users /></ProtectedRoute>} />
        </Route>

        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
