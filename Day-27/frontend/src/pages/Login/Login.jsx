import { Button, Card, Form, Input, Typography, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { loginSuccess } from "../../store/slices/authSlice";

import { useLogin } from "../../hooks/useLogin";

const { Title, Text } = Typography;

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { mutate, isPending } = useLogin();

  const onFinish = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        dispatch(loginSuccess(response.data));

        message.success(response.message);

        navigate("/dashboard");
      },

      onError: (error) => {
        message.error(error.response?.data?.message || "Login failed");
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4">
      <Card className="w-full max-w-md shadow-2xl rounded-[1.5rem] border border-slate-200">
        <Title level={2} className="text-center text-slate-900">
          StockPro Login
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
rules={[
  {
    required: true,
    message: "Email is required",
  },
  {
    type: "email",
    message: "Please enter a valid email address",
  },
]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Password is required",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter Password"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isPending}
            className="rounded-full"
          >
            Login
          </Button>
        </Form>

        <Text className="block text-center mt-6 text-slate-600">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Text>
      </Card>
    </div>
  );
};

export default Login;
