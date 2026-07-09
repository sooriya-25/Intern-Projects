import { useEffect } from "react";

import {
  Card,
  Form,
  Input,
  Button,
  Alert,
  Typography,
} from "antd";

import { useNavigate } from "react-router-dom";

import useAuthStore from "../store/authStore";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const {
    login,
    user,
    loading,
    error,
  } = useAuthStore();

  useEffect(() => {
    if (user) {
      navigate("/dashboard/tasks");
    }
  }, [user, navigate]);

  const onFinish = (values) => {
    login(values);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: 400 }}>
        <Title
          level={3}
          style={{
            textAlign: "center",
          }}
        >
          Employee Login
        </Title>

        {error && (
          <Alert
            type="error"
            message={error}
            style={{
              marginBottom: 20,
            }}
          />
        )}

        <Form
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
              },
              {
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
              },
              {
                min: 6,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
          >
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;