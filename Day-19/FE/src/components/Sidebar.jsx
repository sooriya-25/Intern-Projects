import "./Sidebar.css";
import { Menu } from "antd";
import React from "react";

import {
  ProfileOutlined,
  CheckSquareOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { NavLink, useNavigate } from "react-router-dom";

import { useContext, useCallback } from "react";

import { AuthContext } from "../context/AuthContext";

/**
 * ===== Memoization =====
 * Sidebar component is memoized to prevent unnecessary re-renders
 * Only re-renders when props (collapsed) or context values change
 */
const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();

  const { logout, user } = useContext(AuthContext);

  // ===== useCallback =====
  // Memoize logout handler to prevent unnecessary re-renders
  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return (
    <>
      <div className="logo">{collapsed ? "TM" : "Task Manager"}</div>

      <Menu theme="dark" mode="inline">
        <Menu.Item key="tasks" icon={<CheckSquareOutlined />}>
          <NavLink to="/dashboard/tasks">Tasks</NavLink>
        </Menu.Item>

        <Menu.Item key="profile" icon={<ProfileOutlined />}>
          <NavLink to="/dashboard/profile">Profile</NavLink>
        </Menu.Item>

        {user?.role === "Admin" && (
          <Menu.Item key="users" icon={<UserOutlined />}>
            <NavLink to="/dashboard/users">Users</NavLink>
          </Menu.Item>
        )}

        <Menu.Item
          key="logout"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>
      </Menu>
    </>
  );
};

export default React.memo(Sidebar);
