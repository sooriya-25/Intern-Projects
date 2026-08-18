import { Button, Form, Input, Typography } from "antd";
import {
  ClockCircleOutlined,
  LoginOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const LoginOtpStep = ({
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
      Enter the code sent to <strong>{email}</strong> to finish logging in.
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
      label="Login Code"
      name="otp"
      rules={[
        { required: true, message: "Code is required" },
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

    <Button
      type="primary"
      htmlType="submit"
      block
      size="large"
      loading={loading}
      disabled={isExpired}
      icon={<LoginOutlined />}
      className="rounded-xl mt-2 h-12"
    >
      Verify & Log in
    </Button>

    <div className="flex items-center justify-between mt-4">
      <Button type="link" onClick={onBack} className="px-0">
        &larr; Back to login
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

export default LoginOtpStep;
