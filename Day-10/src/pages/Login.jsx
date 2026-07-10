import { Button, Card, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = (values) => {

    const user = {
      name: values.username,
      email: `${values.username}@gmail.com`,
    };

    localStorage.setItem("token", "dummy-token");

    dispatch(login(user));

    navigate("/dashboard");
  };

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 400 }}>
        <Title level={3}>
          Login
        </Title>

        <Form
          layout="vertical"
          onFinish={handleLogin}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
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
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            block
          >
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;