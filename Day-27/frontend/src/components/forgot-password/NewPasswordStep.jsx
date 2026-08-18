import { Button, Form, Input, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";

const { Text } = Typography;

const NewPasswordStep = ({ form, email, loading, onFinish, onBack }) => (
  <Form layout="vertical" form={form} onFinish={onFinish} requiredMark={false}>
    <Text type="secondary" className="block mb-4">
      Code verified for <strong>{email}</strong>. Choose a new password below.
    </Text>

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
        autoFocus
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
      />
    </Form.Item>

    <Button
      type="primary"
      htmlType="submit"
      block
      size="large"
      loading={loading}
      className="rounded-xl mt-2 h-12"
    >
      Reset Password
    </Button>

    <div className="flex items-center justify-between mt-4">
      <Button type="link" onClick={onBack} className="px-0">
        &larr; Use a different email
      </Button>
    </div>
  </Form>
);

export default NewPasswordStep;
