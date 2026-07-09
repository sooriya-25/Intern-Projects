import { useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  Alert,
} from "antd";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../features/auth/authSlice";

const { Title } = Typography;

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, isLoggedIn } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard/tasks");
    }
  }, [isLoggedIn, navigate]);

  const onFinish = (values) => {
    dispatch(login(values));
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <Card
        style={{
          width: 400,
        }}
      >
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
            name="email"
            label="Email"
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
            name="password"
            label="Password"
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
            htmlType="submit"
            type="primary"
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