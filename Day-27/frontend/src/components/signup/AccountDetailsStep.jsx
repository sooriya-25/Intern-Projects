import { Button, Form, Input, Typography } from "antd";
import {
  BankOutlined,
  HomeOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";

import PasswordInput from "../common/PasswordInput";
import { isPasswordValid } from "../../constants/password";

const { Text } = Typography;

const passwordRules = [
  { required: true, message: "Password is required" },
  {
    validator: (_, value) => {
      if (!value || isPasswordValid(value)) {
        return Promise.resolve();
      }

      return Promise.reject(new Error("Password does not meet all the requirements"));
    },
  },
];

const AccountDetailsStep = ({ form, initialValues, loading, onFinish }) => (
  <Form
    layout="vertical"
    form={form}
    initialValues={initialValues}
    onFinish={onFinish}
    requiredMark={false}
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
      <Form.Item
        label="Full Name"
        name="name"
        rules={[{ required: true, message: "Name is required" }]}
      >
        <Input
          size="large"
          prefix={<UserOutlined className="text-slate-400" />}
          placeholder="Jane Doe"
        />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phone"
        rules={[
          { required: true, message: "Phone number is required" },
          {
            pattern: /^[0-9+\-\s()]{7,20}$/,
            message: "Please enter a valid phone number",
          },
        ]}
      >
        <Input
          size="large"
          prefix={<PhoneOutlined className="text-slate-400" />}
          placeholder="+1 555 000 1234"
        />
      </Form.Item>
    </div>

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

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
      <Form.Item label="Company Name" name="companyName">
        <Input
          size="large"
          prefix={<BankOutlined className="text-slate-400" />}
          placeholder="Optional"
        />
      </Form.Item>

      <Form.Item label="Address" name="address">
        <Input
          size="large"
          prefix={<HomeOutlined className="text-slate-400" />}
          placeholder="Optional"
        />
      </Form.Item>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
      <Form.Item
        label="Password"
        name="password"
        rules={passwordRules}
        hasFeedback
      >
        <PasswordInput placeholder="Create a password" />
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
        <Input.Password
          size="large"
          prefix={<LockOutlined className="text-slate-400" />}
          placeholder="Re-enter password"
        />
      </Form.Item>
    </div>

    <Button
      type="primary"
      htmlType="submit"
      block
      size="large"
      loading={loading}
      className="rounded-xl mt-2 h-12"
    >
      Continue &amp; verify email
    </Button>
      <Text className="block text-center mt-5 text-slate-600">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-surge-500">
          Login
        </Link>
      </Text>
  </Form>
);

export default AccountDetailsStep;
