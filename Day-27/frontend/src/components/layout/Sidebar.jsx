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

const Sidebar = () => {
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
    <aside className="w-64 h-screen bg-white border-r dark:bg-slate-900 dark:border-slate-700">

      <Logo />

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        className="border-0"
      />

    </aside>
  );
};

export default Sidebar;