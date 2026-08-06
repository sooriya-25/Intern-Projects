import {
  Avatar,
  Button,
  Card,
  Divider,
  Form,
  Input,
  Spin,
  Typography,
  message,
} from "antd";

import { UserOutlined } from "@ant-design/icons";

import { useEffect } from "react";

import { useProfile } from "../../hooks/useProfile";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";

const { Title, Text } = Typography;

const Profile = () => {
  const [form] = Form.useForm();

  const { data, isLoading } = useProfile();
  console.log("profile data", data);

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
          error.response?.data?.message || "Update Failed"
        );
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4">

      <Card className="rounded-[1.5rem] shadow-xl border border-[#d8e7f8] bg-[#f6fbff]">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <Avatar
            size={80}
            icon={<UserOutlined />}
          />

          <div>
            <Title
              level={3}
              style={{ marginBottom: 0 }}
            >
              {data?.name}
            </Title>

            <Text type="secondary">
              {data?.email}
            </Text>

            <br />

            <Text strong>
              {data?.role}
            </Text>
          </div>

        </div>

        <Divider />

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter your name"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
          >
            <Input
              size="large"
              disabled
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={isPending}
            className="rounded-full"
          >
            Update Profile
          </Button>

        </Form>

      </Card>

    </div>
  );
};

export default Profile;