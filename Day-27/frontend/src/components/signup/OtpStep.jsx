import { Button, Form, Input, Typography } from "antd";
import { SafetyCertificateOutlined } from "@ant-design/icons";

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
}) => (
  <Form layout="vertical" form={form} onFinish={onFinish}>
    <Text type="secondary" className="block mb-4">
      We've sent a 6-digit verification code to <strong>{email}</strong>.
    </Text>

    <Form.Item
      label="OTP"
      name="otp"
      rules={[
        { required: true, message: "OTP is required" },
        { len: 6, message: "OTP must be 6 digits" },
        { pattern: /^\d{6}$/, message: "OTP must contain only numbers" },
      ]}
    >
      <Input
        prefix={<SafetyCertificateOutlined />}
        placeholder="Enter 6-digit OTP"
        maxLength={6}
        autoFocus
      />
    </Form.Item>

    <Button
      type="primary"
      htmlType="submit"
      block
      loading={loading}
      className="rounded-full mt-2"
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
