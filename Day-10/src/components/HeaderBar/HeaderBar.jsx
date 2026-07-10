import {
  Avatar,
  Button,
  Layout,
  Space,
} from "antd";

import { UserOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const HeaderBar = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector(
    (state) => state.auth.user
  );

  const handleLogout = () => {

    localStorage.removeItem("token");

    dispatch(logout());

    navigate("/");
  };

  return (
    <Header
      style={{
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingInline: 24,
      }}
    >
      <h2 style={{ margin: 0 }}>
        Task Management
      </h2>

      <Space>

        <Avatar
          icon={<UserOutlined />}
        />

        <span>{user?.name}</span>

        <Button
          danger
          onClick={handleLogout}
        >
          Logout
        </Button>

      </Space>

    </Header>
  );
};

export default HeaderBar;