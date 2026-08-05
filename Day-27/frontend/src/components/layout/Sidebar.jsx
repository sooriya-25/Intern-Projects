import {
  DashboardOutlined,
  StockOutlined,
  StarOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import { Menu } from "antd";

import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Logo from "./Logo";

const Sidebar = ({ collapsed }) => {
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  const items = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: "/stocks",
      icon: <StockOutlined />,
      label: <Link to="/stocks">Stocks</Link>,
    },
    {
      key: "/watchlist",
      icon: <StarOutlined />,
      label: <Link to="/watchlist">Watchlist</Link>,
    },
    ...(user?.role === "ADMIN"
      ? [
          {
            key: "/users",
            icon: <TeamOutlined />,
            label: <Link to="/users">Users</Link>,
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