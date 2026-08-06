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


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center py-4">
                  <Spin />
                </div>
              }
            >
              <Login />
            </Suspense>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <Suspense
                fallback={
                  <div className="flex justify-center py-4">
                    <Spin />
                  </div>
                }
              >
                <Dashboard />
              </Suspense>
            }
          />

          <Route
            path="stocks"
            element={
              <Suspense
                fallback={
                  <div className="flex justify-center py-4">
                    <Spin />
                  </div>
                }
              >
                <Stocks />
              </Suspense>
            }
          />

          <Route
            path="watchlist"
            element={
              <Suspense
                fallback={
                  <div className="flex justify-center py-4">
                    <Spin />
                  </div>
                }
              >
                <Watchlist />
              </Suspense>
            }
          />

          <Route
            path="users"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <Suspense
                  fallback={
                    <div className="flex justify-center py-4">
                      <Spin />
                    </div>
                  }
                >
                  <Users />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="profile"
            element={
              <Suspense
                fallback={
                  <div className="flex justify-center py-4">
                    <Spin />
                  </div>
                }
              >
                <Profile />
              </Suspense>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;