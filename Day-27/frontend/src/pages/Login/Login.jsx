import { Button, Form, Input, Typography } from "antd";
import { LockOutlined, LoginOutlined, MailOutlined } from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { loginSuccess } from "../../store/slices/authSlice";

import { useLogin } from "../../hooks/useLogin";
import { useToast } from "../../components/Toast/ToastProvider";
import AuthLayout from "../../components/auth/AuthLayout";

const { Text } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { mutate, isPending } = useLogin();

  const onFinish = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        dispatch(loginSuccess(response.data));

        toast.success(response.message || "Login successful");

        navigate("/dashboard");
      },

      onError: (error) => {
        toast.error(error.response?.data?.message || "Login failed");
      },
    });
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Log in to StockPro"
      subtitle="Enter your credentials to access your dashboard."
    >
      <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
        >
          <Input
            size="large"
            prefix={<MailOutlined className="text-slate-400" />}
            placeholder="you@company.com"
          />
        </Form.Item>

        <Form.Item
          label={
            <div className="w-full flex items-center justify-between gap-2">
              <span>Password</span>
              <Link
                to="/forgot-password"
                className="text-xs font-medium text-surge-500 hover:text-surge-600"
              >
                Forgot password?
              </Link>
            </div>
          }
          name="password"
          className="[&_.ant-form-item-label]:w-full"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="text-slate-400" />}
            placeholder="Enter Password"
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={isPending}
          icon={<LoginOutlined />}
          className="rounded-xl mt-2 h-12"
        >
          Log in
        </Button>
        <Text className="block text-center mt-5 text-slate-600">
        Don't have an account?{" "}
        <Link to="/signup" className="font-semibold text-surge-500">
          Sign up
        </Link>
      </Text>
      </Form>
    </AuthLayout>
  );
};

export default Login;
