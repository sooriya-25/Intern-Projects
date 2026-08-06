import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Spin } from "antd";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

const Login = lazy(() => import("../pages/Login/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Stocks = lazy(() => import("../pages/Stocks/Stocks"));
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
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={withSuspense(<Login />)} />

        <Route
          path="/"
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
    </BrowserRouter>
  );
};

export default AppRoutes;
