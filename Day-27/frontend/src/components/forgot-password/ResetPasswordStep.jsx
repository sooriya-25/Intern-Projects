import { Button, Form, Input, Typography } from "antd";
import {
  ClockCircleOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const ResetPasswordStep = ({
  form,
  email,
  loading,
  onFinish,
  resendCooldown,
  resendLoading,
  onResend,
  onBack,
  expiryLabel,
  isExpired,
}) => (
  <Form layout="vertical" form={form} onFinish={onFinish} requiredMark={false}>
    <Text type="secondary" className="block mb-1">
      Enter the code sent to <strong>{email}</strong> and choose a new
      password.
    </Text>

    {expiryLabel && (
      <div
        className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1 mb-4 ${
          isExpired
            ? "bg-rose-50 text-rose-600"
            : "bg-amber-50 text-amber-600"
        }`}
      >
        <ClockCircleOutlined />
        {isExpired
          ? "Code expired — resend to get a new one"
          : `Expires in ${expiryLabel}`}
      </div>
    )}

    <Form.Item
      label="Reset Code"
      name="otp"
      rules={[
        { required: true, message: "Reset code is required" },
        { len: 6, message: "Code must be 6 digits" },
        { pattern: /^\d{6}$/, message: "Code must contain only numbers" },
      ]}
    >
      <Input
        size="large"
        prefix={<SafetyCertificateOutlined className="text-slate-400" />}
        placeholder="Enter 6-digit code"
        maxLength={6}
        autoFocus
        disabled={isExpired}
      />
    </Form.Item>

    <Form.Item
      label="New Password"
      name="password"
      rules={[
        { required: true, message: "Password is required" },
        { min: 6, message: "At least 6 characters" },
      ]}
      hasFeedback
    >
      <Input.Password
        size="large"
        prefix={<LockOutlined className="text-slate-400" />}
        placeholder="Create a new password"
        disabled={isExpired}
      />
    </Form.Item>

    <Form.Item
      label="Confirm New Password"
      name="confirmPassword"
      dependencies={["password"]}
      hasFeedback
      rules={[
        { required: true, message: "Please confirm your new password" },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }

            return Promise.reject(new Error("Passwords do not match"));
          },
        }),
      ]}
    >
      <Input.Password
        size="large"
        prefix={<LockOutlined className="text-slate-400" />}
        placeholder="Re-enter new password"
        disabled={isExpired}
      />
    </Form.Item>

    <Button
      type="primary"
      htmlType="submit"
      block
      size="large"
      loading={loading}
      disabled={isExpired}
      className="rounded-xl mt-2 h-12"
    >
      Reset Password
    </Button>

    <div className="flex items-center justify-between mt-4">
      <Button type="link" onClick={onBack} className="px-0">
        &larr; Use a different email
      </Button>

      <Button
        type="link"
        onClick={onResend}
        disabled={resendCooldown > 0}
        loading={resendLoading}
        className="px-0"
      >
        {resendCooldown > 0
          ? `Resend code in ${resendCooldown}s`
          : "Resend code"}
      </Button>
    </div>
  </Form>
);

export default ResetPasswordStep;
