import { Button, Form, Input } from "antd";
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";

const DetailsStep = ({ form, initialValues, loading, onFinish }) => (
  <Form
    layout="vertical"
    form={form}
    initialValues={initialValues}
    onFinish={onFinish}
  >
    <Form.Item
      label="Full Name"
      name="name"
      rules={[{ required: true, message: "Name is required" }]}
    >
      <Input prefix={<UserOutlined />} placeholder="Enter your name" />
    </Form.Item>

    <Form.Item
      label="Email"
      name="email"
      rules={[
        { required: true, message: "Email is required" },
        { type: "email", message: "Please enter a valid email address" },
      ]}
    >
      <Input prefix={<MailOutlined />} placeholder="Enter Email" />
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
      <Input prefix={<PhoneOutlined />} placeholder="Enter Phone Number" />
    </Form.Item>

    <Button
      type="primary"
      htmlType="submit"
      block
      loading={loading}
      className="rounded-full mt-2"
    >
      Send OTP to Email
    </Button>
  </Form>
);

export default DetailsStep;
