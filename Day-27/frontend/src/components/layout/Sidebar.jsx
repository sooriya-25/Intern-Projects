import {
  DashboardOutlined,
  StockOutlined,
  StarOutlined,
  TeamOutlined,
  CheckSquareOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { Menu } from "antd";

import { Link, useLocation } from "react-router-dom";

import usePermission from "../../hooks/usePermission";

import Logo from "./Logo";

const Sidebar = ({ collapsed }) => {
  const location = useLocation();

  const { hasPermission, isAdmin } = usePermission();

  const items = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    ...(hasPermission("STOCKS", "view")
      ? [
          {
            key: "/dashboard/stocks",
            icon: <StockOutlined />,
            label: <Link to="/dashboard/stocks">Stocks</Link>,
          },
        ]
      : []),
    ...(hasPermission("WATCHLIST", "view")
      ? [
          {
            key: "/dashboard/watchlist",
            icon: <StarOutlined />,
            label: <Link to="/dashboard/watchlist">Watchlist</Link>,
          },
        ]
      : []),
    ...(hasPermission("TODO", "view")
      ? [
          {
            key: "/dashboard/todos",
            icon: <CheckSquareOutlined />,
            label: <Link to="/dashboard/todos">Todo</Link>,
          },
        ]
      : []),
    // Users and Roles are admin-only (isSystem), not part of the
    // dynamic matrix — see usePermission.js / backend requireSystemRole.
    ...(isAdmin
      ? [
          {
            key: "/dashboard/users",
            icon: <TeamOutlined />,
            label: <Link to="/dashboard/users">Users</Link>,
          },
          {
            key: "/dashboard/roles",
            icon: <SafetyCertificateOutlined />,
            label: <Link to="/dashboard/roles">Roles</Link>,
          },
        ]
      : []),
    {
      key: "/dashboard/profile",
      icon: <SettingOutlined />,
      label: <Link to="/dashboard/profile">Settings</Link>,
    },
  ];

  return (
    <aside className={`h-screen sidebar-surface transition-all duration-300 ${collapsed ? "w-20" : "w-72"}`}>

      <Logo collapsed={collapsed} />

      <div className={`mt-4 ${collapsed ? "px-2" : "px-4"}`}>
        <Menu
          mode="inline"
          inlineCollapsed={collapsed}
          selectedKeys={[location.pathname]}
          items={items}
          className="border-0 bg-transparent"
        />
      </div>

    </aside>
  );
};

export default Sidebar;
