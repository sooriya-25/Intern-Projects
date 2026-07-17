import "./Login.css";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, Typography, Alert } from "antd";

import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../api/authApi";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // If already logged in
  if (user) {
    console.log("console from login",user)
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (values) => {
    setLoading(true);
    setError("");

    try {
      const loggedInUser = await loginUser(values.email, values.password);

      login(loggedInUser);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card
        title={
          <Title level={3} className="login-title">
            Task Manager Login
          </Title>
        }
        className="login-card"
      >
        {error && (
          <Alert
            type="error"
            message={error}
            showIcon
            style={{ marginBottom: 20 }}
          />
        )}

        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter email",
              },
              {
                type: "email",
                message: "Invalid email",
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
                message: "Please enter password",
              },
              {
                min: 6,
                message: "Minimum 6 characters",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
