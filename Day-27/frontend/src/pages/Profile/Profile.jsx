import {
  Avatar,
  Button,
  Card,
  Empty,
  Form,
  Input,
  Modal,
  Popconfirm,
  Spin,
  Tabs,
  Tag,
  Tooltip,
  Typography,
  Upload,

} from "antd";

import {
  CameraOutlined,
  CheckCircleFilled,
  DeleteOutlined,
  DesktopOutlined,
  ExclamationCircleFilled,
  LockOutlined,
  LogoutOutlined,
  MailOutlined,
  MobileOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useProfile } from "../../hooks/useProfile";
import { useRemoveProfilePhoto, useUpdateProfile, useUploadProfilePhoto } from "../../hooks/useUpdateProfile";
import { useDeleteAccount } from "../../hooks/useDeleteAccount";
import { useRevokeOtherSessions, useRevokeSession, useSessions } from "../../hooks/useSessions";
import { logout, updateProfileImage, updateUser } from "../../store/slices/authSlice";
import { redirectTo } from "../../utils/navigation";
import { useFloatingWidget } from "../../context/FloatingWidgetContext";
import { useToast } from "../../components/Toast/ToastProvider";

const { Title, Text } = Typography;

// "Profile" tab: avatar + editable name/email form. Same content the
// old standalone Profile page used to show.
const ProfileTab = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const toast = useToast();

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

        toast.success(response.message || "Profile updated successfully");
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message || "Update Failed"
        );
      },
    });
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");

    if (!isImage) {
      toast.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      toast.error("Image must be smaller than 2MB!");
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

          toast.success(response.message || "Profile photo updated");
        },
        onError: (error) => {
          const errorMessage = error.response?.data?.message || "Photo upload failed";

          failUpload(uploadId, errorMessage);
          toast.error(errorMessage);
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

        toast.success(response.message || "Profile photo removed");
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Photo removal failed");
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
  );
};

// "Active Sessions" card inside the Security tab: lists every device
// currently logged into this account (backed by User.sessions — see
// backend/src/models/User.js) and lets the user log out one device or
// every device except this one.
const formatRelativeTime = (value) => {
  if (!value) return "—";

  const diffSec = Math.round((Date.now() - new Date(value).getTime()) / 1000);

  if (diffSec < 60) return "Just now";

  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;

  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;

  const diffDay = Math.round(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;

  return new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const isMobileDevice = (deviceName) =>
  ["iPhone", "iPad", "Android"].includes(deviceName);

const SessionRow = ({ session, onRevoke, isRevoking }) => (
  <div
    className={`group flex items-center justify-between gap-4 rounded-xl px-3 py-3 transition-colors ${
      session.isCurrent
        ? "bg-emerald-50/60 ring-1 ring-emerald-100"
        : "hover:bg-slate-50"
    }`}
  >
    <div className="flex items-center gap-3 min-w-0">
      <div
        className={`flex items-center justify-center w-11 h-11 rounded-full shrink-0 ${
          session.isCurrent
            ? "bg-emerald-100 text-emerald-600"
            : "bg-slate-100 text-slate-500"
        }`}
      >
        {isMobileDevice(session.deviceName) ? (
          <MobileOutlined className="text-lg" />
        ) : (
          <DesktopOutlined className="text-lg" />
        )}
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <Text strong className="!text-slate-800">
            {session.browserName} on {session.deviceName}
          </Text>
          {session.isCurrent && (
            <Tag
              icon={<CheckCircleFilled />}
              color="success"
              className="!m-0 !rounded-full !text-xs"
            >
              This device
            </Tag>
          )}
        </div>
        <Text type="secondary" className="text-xs">
          <Tooltip title={new Date(session.lastActiveAt).toLocaleString()}>
            Active {formatRelativeTime(session.lastActiveAt)}
          </Tooltip>
          {session.ip ? ` · ${session.ip}` : ""}
        </Text>
      </div>
    </div>

    {session.isCurrent ? (
      <Text type="secondary" className="text-xs shrink-0 hidden sm:block">
        Use Logout above to end this session
      </Text>
    ) : (
      <Popconfirm
        title="Log out this device?"
        okText="Log out"
        okButtonProps={{ danger: true, loading: isRevoking }}
        onConfirm={() => onRevoke(session)}
      >
        <Button
          type="text"
          danger
          size="small"
          icon={<LogoutOutlined />}
          className="shrink-0 opacity-70 group-hover:opacity-100"
        >
          Log out
        </Button>
      </Popconfirm>
    )}
  </div>
);

const ActiveSessionsCard = () => {
  const toast = useToast();

  const { data: sessions, isLoading, isFetching } = useSessions();
  const { mutate: revokeSession, isPending: isRevokingOne } =
    useRevokeSession();
  const { mutate: revokeOthers, isPending: isRevokingOthers } =
    useRevokeOtherSessions();

  const handleRevoke = (session) => {
    revokeSession(session.sessionId, {
      onSuccess: (response) => {
        toast.success(response.message || "Device logged out");
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message || "Failed to log out that device"
        );
      },
    });
  };

  const handleRevokeOthers = () => {
    revokeOthers(undefined, {
      onSuccess: (response) => {
        toast.success(response.message || "Logged out of all other devices");
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message || "Failed to log out other devices"
        );
      },
    });
  };

  const otherSessionsCount = (sessions || []).filter(
    (s) => !s.isCurrent
  ).length;

  return (
    <Card className="rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Title level={5} className="!mb-0">
              Active Sessions
            </Title>
            {!isLoading && sessions?.length > 0 && (
              <Tag className="!rounded-full !text-xs !text-slate-500 !border-slate-200">
                {sessions.length}
              </Tag>
            )}
            {isFetching && !isLoading && <Spin size="small" />}
          </div>
          <Text type="secondary" className="text-sm">
            Devices and browsers currently signed in to your account.
          </Text>
        </div>

        {otherSessionsCount > 0 && (
          <Popconfirm
            title="Log out of all other devices?"
            description="Every other session will need to log in again."
            okText="Log out others"
            okButtonProps={{ danger: true, loading: isRevokingOthers }}
            onConfirm={handleRevokeOthers}
          >
            <Button danger icon={<LogoutOutlined />} className="shrink-0">
              Log out all other devices
            </Button>
          </Popconfirm>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Spin />
        </div>
      ) : !sessions || sessions.length === 0 ? (
        <Empty
          description="No active sessions"
          className="py-4"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <div className="flex flex-col gap-1 -mx-1">
          {sessions.map((session) => (
            <SessionRow
              key={session.sessionId}
              session={session}
              onRevoke={handleRevoke}
              isRevoking={isRevokingOne}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

// "Security" tab: Active Sessions + account-deletion (Danger Zone),
// moved out of the Profile tab. Deletion is a permanent, hard delete on
// the backend — see profile.service.js#deleteAccount — and notifies
// ADMIN_EMAIL by email.
const SecurityTab = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: deleteAccount, isPending: isDeletingAccount } =
    useDeleteAccount();

  const openModal = () => setIsModalOpen(true);

  // While the mutation is in flight, block closing via Cancel/Esc/mask so
  // a request can't be left dangling behind a closed modal.
  const closeModal = () => {
    if (isDeletingAccount) return;
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    deleteAccount(undefined, {
      onSuccess: (response) => {
        toast.success(response.message || "Your account has been deleted");

        // Close the modal first and let its exit animation finish, THEN
        // log out / navigate. Firing the redirect immediately (from
        // inside this callback) unmounts the whole page mid-animation,
        // which is what made the modal look like it "wouldn't close".
        setIsModalOpen(false);

        setTimeout(() => {
          dispatch(logout());
          redirectTo("/login", { replace: true });
        }, 300);
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message || "Failed to delete account"
        );
        // Keep the modal open on failure so the user can see the error
        // and retry without having to click Delete Account again.
      },
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <ActiveSessionsCard />

      <Card className="rounded-2xl border border-red-200 bg-red-50/50 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Title level={5} className="!mb-1 !text-red-700">
              Danger Zone
            </Title>
            <Text type="secondary">
              Permanently deleting your account signs you out immediately and
              removes your data. This cannot be undone.
            </Text>
          </div>

          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={openModal}
            className="shrink-0"
          >
            Delete Account
          </Button>
        </div>
      </Card>

      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        centered
        width={420}
        closable={!isDeletingAccount}
        maskClosable={!isDeletingAccount}
        keyboard={!isDeletingAccount}
        footer={null}
      >
        <div className="flex flex-col items-center text-center pt-2 pb-1">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mb-4">
            <ExclamationCircleFilled className="text-2xl text-red-500" />
          </div>

          <Title level={4} className="!mb-2 !text-slate-900">
            Delete your account?
          </Title>

          <Text type="secondary" className="block mb-4">
            This is permanent — your account and all associated data will be
            removed and cannot be recovered.
          </Text>

          <ul className="w-full text-left text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-6 space-y-1.5">
            <li>• You'll be signed out immediately</li>
            <li>• Your profile, photo, and data will be erased</li>
            <li>• This action cannot be undone</li>
          </ul>

          <div className="flex w-full gap-3">
            <Button
              size="large"
              block
              disabled={isDeletingAccount}
              onClick={closeModal}
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button
              danger
              type="primary"
              size="large"
              block
              icon={<DeleteOutlined />}
              loading={isDeletingAccount}
              onClick={handleConfirmDelete}
              className="rounded-full"
            >
              {isDeletingAccount ? "Deleting..." : "Delete Permanently"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const Settings = () => {
  const items = [
    {
      key: "profile",
      label: (
        <span className="flex items-center gap-2">
          <UserOutlined />
          Profile
        </span>
      ),
      children: <ProfileTab />,
    },
    {
      key: "security",
      label: (
        <span className="flex items-center gap-2">
          <LockOutlined />
          Security
        </span>
      ),
      children: <SecurityTab />,
    },
  ];

  return (
    <div className="flex flex-col gap-5 p-3">
      <Tabs defaultActiveKey="profile" items={items} />
    </div>
  );
};

export default Settings;
