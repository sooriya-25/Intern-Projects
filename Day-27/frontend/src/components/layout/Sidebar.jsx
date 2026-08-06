import {
  DashboardOutlined,
  StockOutlined,
  StarOutlined,
  UserOutlined,
  TeamOutlined,
  CheckSquareOutlined,
  SafetyCertificateOutlined,
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
      key: "/",
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    ...(hasPermission("STOCKS", "view")
      ? [
          {
            key: "/stocks",
            icon: <StockOutlined />,
            label: <Link to="/stocks">Stocks</Link>,
          },
        ]
      : []),
    ...(hasPermission("WATCHLIST", "view")
      ? [
          {
            key: "/watchlist",
            icon: <StarOutlined />,
            label: <Link to="/watchlist">Watchlist</Link>,
          },
        ]
      : []),
    ...(hasPermission("TODO", "view")
      ? [
          {
            key: "/todos",
            icon: <CheckSquareOutlined />,
            label: <Link to="/todos">Todo</Link>,
          },
        ]
      : []),
    // Users and Roles are admin-only (isSystem), not part of the
    // dynamic matrix — see usePermission.js / backend requireSystemRole.
    ...(isAdmin
      ? [
          {
            key: "/users",
            icon: <TeamOutlined />,
            label: <Link to="/users">Users</Link>,
          },
          {
            key: "/roles",
            icon: <SafetyCertificateOutlined />,
            label: <Link to="/roles">Roles</Link>,
          },
        ]
      : []),
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: <Link to="/profile">Profile</Link>,
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
