import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Spin } from "antd";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

const Landing = lazy(() => import("../pages/Landing/Landing"));
const Login = lazy(() => import("../pages/Login/Login"));
const Signup = lazy(() => import("../pages/Signup/Signup"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword/ForgotPassword"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Stocks = lazy(() => import("../pages/Stocks/Stocks"));
const AddStock = lazy(() => import("../pages/Stocks/AddStock"));
const EditStock = lazy(() => import("../pages/Stocks/EditStock"));
const Watchlist = lazy(() => import("../pages/Watchlist/Watchlist"));
const Users = lazy(() => import("../pages/Users/Users"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const RoleManagement = lazy(() => import("../pages/RoleManagement/RoleManagement"));
const Todo = lazy(() => import("../pages/Todo/Todo"));

const withSuspense = (element) => (
  <Suspense
    fallback={
      <div className="flex justify-center py-4">
        <Spin />
      </div>
    }
  >
    {element}
  </Suspense>
);

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={withSuspense(<Landing />)} />

        <Route path="/login" element={withSuspense(<Login />)} />

        <Route path="/signup" element={withSuspense(<Signup />)} />

        <Route
          path="/forgot-password"
          element={withSuspense(<ForgotPassword />)}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={withSuspense(<Dashboard />)} />

          <Route
            path="stocks"
            element={
              <ProtectedRoute module="STOCKS" action="view">
                {withSuspense(<Stocks />)}
              </ProtectedRoute>
            }
          />

          <Route
            path="stocks/add"
            element={
              <ProtectedRoute module="STOCKS" action="add">
                {withSuspense(<AddStock />)}
              </ProtectedRoute>
            }
          />

          <Route
            path="stocks/:id/edit"
            element={
              <ProtectedRoute module="STOCKS" action="edit">
                {withSuspense(<EditStock />)}
              </ProtectedRoute>
            }
          />

          <Route
            path="watchlist"
            element={
              <ProtectedRoute module="WATCHLIST" action="view">
                {withSuspense(<Watchlist />)}
              </ProtectedRoute>
            }
          />

          <Route
            path="todos"
            element={
              <ProtectedRoute module="TODO" action="view">
                {withSuspense(<Todo />)}
              </ProtectedRoute>
            }
          />

          <Route
            path="users"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                {withSuspense(<Users />)}
              </ProtectedRoute>
            }
          />

          <Route
            path="roles"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                {withSuspense(<RoleManagement />)}
              </ProtectedRoute>
            }
          />

          <Route path="profile" element={withSuspense(<Profile />)} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  );
};

export default AppRoutes;
