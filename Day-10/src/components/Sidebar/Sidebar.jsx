import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  ProfileOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();

  return (
    <Sider collapsible>
      <div
        style={{
          color: "#fff",
          textAlign: "center",
          padding: "16px",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        Task Manager
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={[
          {
            key: "/dashboard",
            icon: <DashboardOutlined />,
            label: <Link to="/dashboard">Dashboard</Link>,
          },
          {
            key: "/dashboard/tasks",
            icon: <UnorderedListOutlined />,
            label: <Link to="/dashboard/tasks">Tasks</Link>,
          },
          {
            key: "/dashboard/profile",
            icon: <ProfileOutlined />,
            label: <Link to="/dashboard/profile">Profile</Link>,
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;