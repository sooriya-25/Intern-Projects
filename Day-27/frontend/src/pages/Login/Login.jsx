import { useState } from "react";

import { Button, Form, Input, Typography } from "antd";
import { LockOutlined, LoginOutlined, MailOutlined } from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { loginSuccess } from "../../store/slices/authSlice";

import { useLogin } from "../../hooks/useLogin";
import { useVerifyLoginOtp } from "../../hooks/useVerifyLoginOtp";
import { useResendCooldown } from "../../hooks/useResendCooldown";
import { useCountdown } from "../../hooks/useCountdown";
import { useToast } from "../../components/Toast/ToastProvider";

import { DEFAULT_OTP_TTL_MINUTES, RESEND_COOLDOWN_SECONDS } from "../../constants/otp";

import LoginOtpStep from "../../components/login/LoginOtpStep";
import AuthLayout from "../../components/auth/AuthLayout";

const { Text } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [otpForm] = Form.useForm();

  // Step 0: email + password. Step 1: OTP sent to that email — only after
  // both password AND otp are correct do we actually log the user in.
  const [currentStep, setCurrentStep] = useState(0);
  const [credentials, setCredentials] = useState(null);

  const { resendCooldown, startCooldown } = useResendCooldown(
    RESEND_COOLDOWN_SECONDS,
  );
  const otpExpiry = useCountdown();

  const { mutate: login, isPending: isLoggingIn } = useLogin();
  const { mutate: verifyOtp, isPending: isVerifyingOtp } = useVerifyLoginOtp();

  const requestLoginOtp = (values) => {
    login(values, {
      onSuccess: (response) => {
        toast.success(response.message || "Code sent to your email");

        const ttlMinutes =
          response?.data?.expiresInMinutes ?? DEFAULT_OTP_TTL_MINUTES;

        otpExpiry.restart(Date.now() + ttlMinutes * 60 * 1000);

        setCredentials(values);
        setCurrentStep(1);
        startCooldown();
      },

      onError: (error) => {
        toast.error(error.response?.data?.message || "Login failed");
      },
    });
  };

  const handleCredentialsSubmit = (values) => {
    requestLoginOtp(values);
  };

  const handleResendOtp = () => {
    if (resendCooldown > 0 || !credentials) return;

    requestLoginOtp(credentials);
  };

  const handleVerifyOtp = ({ otp }) => {
    verifyOtp(
      { email: credentials.email, otp },
      {
        onSuccess: (response) => {
          dispatch(loginSuccess(response.data));

          toast.success(response.message || "Login successful");

          navigate("/dashboard");
        },

        onError: (error) => {
          toast.error(error.response?.data?.message || "Invalid code");
        },
      },
    );
  };

  const goBack = () => {
    otpForm.resetFields();
    otpExpiry.clear();

    setCurrentStep(0);
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title={currentStep === 0 ? "Log in to StockPro" : "Enter your code"}
      subtitle={
        currentStep === 0
          ? "Enter your credentials to access your dashboard."
          : "We take security seriously — confirm it's you to continue."
      }
    >
      {currentStep === 0 && (
        <Form layout="vertical" onFinish={handleCredentialsSubmit} requiredMark={false}>
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
            loading={isLoggingIn}
            icon={<LoginOutlined />}
            className="rounded-xl mt-2 h-12"
          >
            Continue
          </Button>
          <Text className="block text-center mt-5 text-slate-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-surge-500">
              Sign up
            </Link>
          </Text>
        </Form>
      )}

      {currentStep === 1 && (
        <LoginOtpStep
          form={otpForm}
          email={credentials?.email}
          loading={isVerifyingOtp}
          onFinish={handleVerifyOtp}
          resendCooldown={resendCooldown}
          resendLoading={isLoggingIn}
          onResend={handleResendOtp}
          onBack={goBack}
          expiryLabel={otpExpiry.label}
          isExpired={otpExpiry.isExpired}
        />
      )}
    </AuthLayout>
  );
};

export default Login;
