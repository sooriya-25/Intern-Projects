import { Button, Form, Input } from "antd";
import { MailOutlined, SendOutlined } from "@ant-design/icons";

const RequestResetStep = ({ form, initialValues, loading, onFinish }) => (
  <Form
    layout="vertical"
    form={form}
    initialValues={initialValues}
    onFinish={onFinish}
    requiredMark={false}
  >
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
        autoFocus
      />
    </Form.Item>

    <Button
      type="primary"
      htmlType="submit"
      block
      size="large"
      loading={loading}
      icon={<SendOutlined />}
      className="rounded-xl mt-2 h-12"
    >
      Send reset code
    </Button>
  </Form>
);

export default RequestResetStep;
