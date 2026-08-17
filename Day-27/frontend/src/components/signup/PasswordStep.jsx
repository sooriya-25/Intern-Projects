import { Button, Form, Input } from "antd";
import { BankOutlined, LockOutlined } from "@ant-design/icons";

const PasswordStep = ({ form, loading, onFinish, onBack }) => (
  <Form layout="vertical" form={form} onFinish={onFinish}>
    <Form.Item label="Company Name" name="companyName">
      <Input
        prefix={<BankOutlined />}
        placeholder="Enter Company Name (optional)"
      />
    </Form.Item>

    <Form.Item label="Address" name="address">
      <Input.TextArea
        placeholder="Enter Address (optional)"
        autoSize={{ minRows: 2, maxRows: 3 }}
      />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        { required: true, message: "Password is required" },
        { min: 6, message: "Password should be at least 6 characters" },
      ]}
      hasFeedback
    >
      <Input.Password
        prefix={<LockOutlined />}
        placeholder="Enter Password"
        autoFocus
      />
    </Form.Item>

    <Form.Item
      label="Confirm Password"
      name="confirmPassword"
      dependencies={["password"]}
      hasFeedback
      rules={[
        { required: true, message: "Please confirm your password" },
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
      <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
    </Form.Item>

    <Button
      type="primary"
      htmlType="submit"
      block
      loading={loading}
      className="rounded-full mt-2"
    >
      Create Account
    </Button>

    <Button type="link" onClick={onBack} className="px-0 mt-2">
      &larr; Back
    </Button>
  </Form>
);

export default PasswordStep;
