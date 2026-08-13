import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  Spin,
  Typography,
  Upload,
  message,
} from "antd";

import {
  CameraOutlined,
  DeleteOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useProfile } from "../../hooks/useProfile";
import { useRemoveProfilePhoto, useUpdateProfile, useUploadProfilePhoto } from "../../hooks/useUpdateProfile";
import { updateProfileImage, updateUser } from "../../store/slices/authSlice";
import { useFloatingWidget } from "../../context/FloatingWidgetContext";

const { Title, Text } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { data, isLoading } = useProfile();

  const { mutate, isPending } = useUpdateProfile();
  const { mutate: uploadPhoto, isPending: isUploadingPhoto } = useUploadProfilePhoto();
  const { mutate: removePhoto, isPending: isRemovingPhoto } = useRemoveProfilePhoto();

  const { addUpload, updateProgress, completeUpload, failUpload } = useFloatingWidget();

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
        if (response?.data) {
          dispatch(updateUser(response.data));
        }

        message.success(response.message || "Profile updated successfully");
      },
      onError: (error) => {
        message.error(
          error.response?.data?.message || "Update Failed"
        );
      },
    });
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");

    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return Upload.LIST_IGNORE;
    }

    const formData = new FormData();
    formData.append("photo", file);

// Add the upload to the floating widget and get its ID
    const uploadId = addUpload(file.name);

// Call the uploadPhoto mutation with the formData and progress callback
    uploadPhoto(
      {
        formData,
        onUploadProgress: (percent) => updateProgress(uploadId, percent),
      },
      {
        onSuccess: (response) => {
          completeUpload(uploadId);

          const nextImage = response?.data?.profileImage;

          if (nextImage) {
            dispatch(updateProfileImage(nextImage));
          }

          if (response?.data) {
            dispatch(updateUser(response.data));
          }

          message.success(response.message || "Profile photo updated");
        },
        onError: (error) => {
          const errorMessage = error.response?.data?.message || "Photo upload failed";

          failUpload(uploadId, errorMessage);
          message.error(errorMessage);
        },
      }
    );

    return Upload.LIST_IGNORE;
  };

  const handleRemovePhoto = () => {
    removePhoto(undefined, {
      onSuccess: (response) => {
        dispatch(updateProfileImage(null));

        if (response?.data) {
          dispatch(updateUser(response.data));
        }

        message.success(response.message || "Profile photo removed");
      },
      onError: (error) => {
        message.error(error.response?.data?.message || "Photo removal failed");
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

  const avatarUrl = data?.profileImage
    ? `${process.env.REACT_APP_API_URL.replace("/api", "")}${data.profileImage}`
    : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Card className="overflow-hidden rounded-2xl border border-[#d8e7f8] bg-gradient-to-br from-[#f6fbff] via-white to-[#eef6ff] shadow-lg">
        {/* Profile Header Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-8 pb-8 border-b border-[#d8e7f8]">
          {/* Left Column: Avatar with Edit Buttons */}
          <div className="flex flex-col items-center gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Profile Photo</p>
              <Avatar
                size={140}
                src={avatarUrl}
                icon={<UserOutlined />}
                className="border-4 border-blue-500 bg-gradient-to-br from-blue-100 to-slate-100 shadow-lg"
              />
            </div>

            {/* Action Buttons Below Avatar */}
            <div className="flex gap-3 justify-center">
              <Upload
                accept="image/*"
                showUploadList={false}
                beforeUpload={beforeUpload}
              >
                <Button
                  type="primary"
                  icon={<CameraOutlined />}
                  loading={isUploadingPhoto}
                  className="bg-blue-600 hover:bg-blue-700 border-0 shadow-md hover:shadow-lg"
                >
                  Upload
                </Button>
              </Upload>
              <Button
                danger
                icon={<DeleteOutlined />}
                loading={isRemovingPhoto}
                onClick={handleRemovePhoto}
                className="bg-red-600 hover:bg-red-700 border-0 shadow-md hover:shadow-lg"
              >
                Remove
              </Button>
            </div>
          </div>

          {/* Right Column: User Information */}
          <div className="flex flex-col justify-center gap-4">
            <div>
              <Title level={2} className="m-0 text-slate-900">
                {data?.name}
              </Title>
              <Text type="secondary" className="text-base">
                {data?.email}
              </Text>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Role</span>
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-200">
                {data?.role?.name || data?.role || "Member"}
              </div>
            </div>

            {data?.status && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Status</span>
                <div className="inline-flex items-center rounded-full bg-gradient-to-r from-green-100 to-green-50 px-4 py-2 text-sm font-semibold text-green-700 border border-green-200">
                  {data.status}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Edit Form Section */}
        <div>
          <Title level={4} className="mb-2 text-slate-800">
            Edit Profile
          </Title>
          <Text type="secondary" className="block mb-6">
            Update your personal information below.
          </Text>

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
              <Input size="large" placeholder="Enter your name" className="rounded-lg" />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input size="large" disabled prefix={<MailOutlined />} className="rounded-lg" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isPending}
              className="rounded-full px-10 bg-blue-600 hover:bg-blue-700 border-0 shadow-md hover:shadow-lg"
            >
              Save Changes
            </Button>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default Profile;