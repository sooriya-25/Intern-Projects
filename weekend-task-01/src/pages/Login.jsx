import { useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { login as loginUser } from "../services/api";

const { Title, Text } = Typography;

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    try {
      setLoading(true);

      const user = await loginUser({
        email: values.email,
        password: values.password,
      });

      if (!user) {
        message.error("Invalid email or password");
        return;
      }

      localStorage.setItem(
        "token",
        JSON.stringify("kanban-token")
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      message.success("Login Successful");

      navigate("/");
    } catch (error) {
      console.error(error);
      message.error("Unable to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#20212C",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Card
        style={{
          width: 420,
          borderRadius: 12,
          background: "#2B2C37",
          border: "none",
        }}
      >
        <Title
          level={2}
          style={{
            color: "#FFFFFF",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          Kanban
        </Title>

        <Text
          style={{
            color: "#828FA3",
            display: "block",
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          Login to continue
        </Text>

        <Form
          layout="vertical"
          onFinish={handleLogin}
          autoComplete="off"
        >
          <Form.Item
            label={
              <span style={{ color: "#FFFFFF" }}>
                Email
              </span>
            }
            name="email"
            rules={[
              {
                required: true,
                message: "Email is required",
              },
              {
                type: "email",
                message: "Enter a valid email",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter email"
            />
          </Form.Item>

          <Form.Item
            label={
              <span style={{ color: "#FFFFFF" }}>
                Password
              </span>
            }
            name="password"
            rules={[
              {
                required: true,
                message: "Password is required",
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Enter password"
            />
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            block
            loading={loading}
            size="large"
            style={{
              marginTop: 8,
              background: "#635FC7",
              borderColor: "#635FC7",
            }}
          >
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Login;