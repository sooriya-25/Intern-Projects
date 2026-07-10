import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
import HeaderBar from "../components/HeaderBar/HeaderBar";

const { Content } = Layout;

const DashboardLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />

      <Layout>
        <HeaderBar />

        <Content
          style={{
            margin: "24px",
            padding: "24px",
            background: "#fff",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;