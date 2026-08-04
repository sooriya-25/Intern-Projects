import {
  Button,
  Card,
  Form,
  Input,
  Spin,
  message,
} from "antd";

import { useEffect } from "react";

import { useProfile } from "../../hooks/useProfile";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";

const Profile = () => {
  const [form] = Form.useForm();

  const { data, isLoading } = useProfile();

  const { mutate, isPending } = useUpdateProfile();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        email: data.email,
      });
    }
  }, [data, form]);

  const onFinish = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        message.success(response.message);
      },

      onError: (error) => {
        message.error(
          error.response?.data?.message ||
            "Update Failed"
        );
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card
      title="My Profile"
      className="max-w-xl"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Name is required",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
        >
          <Input disabled />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={isPending}
        >
          Update Profile
        </Button>
      </Form>
    </Card>
  );
};

export default Profile;