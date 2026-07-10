import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Loader from "../components/Loader/Loader";

import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/Profile";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Tasks = lazy(() => import("../pages/Tasks"));
// const Profile = lazy(() => import("../pages/Profile"));
const Login = lazy(() => import("../pages/Login"));

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Suspense fallback={<Loader />}>

        <Routes>

          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={<Dashboard />}
            />

            <Route
              path="tasks"
              element={<Tasks />}
            />

            <Route
              path="profile"
              element={<Profile />}
            />
          </Route>

          <Route
            path="*"
            element={<Navigate to="/" />}
          />

        </Routes>

      </Suspense>

    </BrowserRouter>
  );
};

export default AppRoutes;