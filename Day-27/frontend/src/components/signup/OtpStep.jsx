import { Button, Form, Input, Typography } from "antd";
import { ClockCircleOutlined, SafetyCertificateOutlined } from "@ant-design/icons";

const { Text } = Typography;

const OtpStep = ({
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
      We've sent a 6-digit verification code to <strong>{email}</strong>.
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
        {isExpired ? "Code expired — resend to get a new one" : `Expires in ${expiryLabel}`}
      </div>
    )}

    <Form.Item
      label="OTP"
      name="otp"
      className={expiryLabel ? "" : "mt-4"}
      rules={[
        { required: true, message: "OTP is required" },
        { len: 6, message: "OTP must be 6 digits" },
        { pattern: /^\d{6}$/, message: "OTP must contain only numbers" },
      ]}
    >
      <Input
        size="large"
        prefix={<SafetyCertificateOutlined className="text-slate-400" />}
        placeholder="Enter 6-digit OTP"
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
  className="verify-email-btn rounded-xl mt-2 h-12"
>
  Verify Email
</Button>
    <div className="flex items-center justify-between mt-4">
      <Button type="link" onClick={onBack} className="px-0">
        &larr; Back
      </Button>

      <Button
        type="link"
        onClick={onResend}
        disabled={resendCooldown > 0}
        loading={resendLoading}
        className="px-0"
      >
        {resendCooldown > 0
          ? `Resend OTP in ${resendCooldown}s`
          : "Resend OTP"}
      </Button>
    </div>
  </Form>
);

export default OtpStep;
