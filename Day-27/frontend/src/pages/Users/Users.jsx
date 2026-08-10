import {
  Avatar,
  Select,
  Space,
  Spin,
  Switch,
  Table,
  Tag,
  message,
} from "antd";

import { UserOutlined } from "@ant-design/icons";

import { useUsers } from "../../hooks/useUsers";
import { useUpdateUserStatus } from "../../hooks/useUpdateUserStatus";
import { useUpdateUserRole } from "../../hooks/useUpdateUserRole";
import { useRoles } from "../../hooks/useRoles";

const Users = () => {
  const { data, isLoading } = useUsers();

  const { data: roles } = useRoles();

  const { mutate: mutateStatus } = useUpdateUserStatus();
  const { mutate: mutateRole } = useUpdateUserRole();

  const handleStatus = (user) => {
    mutateStatus(
      {
        id: user._id,
        status:
          user.status === "ACTIVE"
            ? "INACTIVE"
            : "ACTIVE",
      },
      {
        onSuccess: (response) => {
          message.success(response.message);
        },

        onError: (error) => {
          message.error(
            error.response?.data?.message ||
              "Failed"
          );
        },
      }
    );
  };

  const handleRoleChange = (user, roleId) => {
    mutateRole(
      { id: user._id, role: roleId },
      {
        onSuccess: (response) => {
          message.success(response.message);
        },
        onError: (error) => {
          message.error(error.response?.data?.message || "Failed");
        },
      }
    );
  };

  const columns = [
    {
      title: "Photo",
      dataIndex: "profileImage",
      width: 80,
      render: (profileImage, user) => {
        const avatarUrl = profileImage
          ? `${process.env.REACT_APP_API_URL.replace("/api", "")}${profileImage}`
          : null;

        return (
          <Avatar
            size={40}
            src={avatarUrl}
            icon={<UserOutlined />}
            className="bg-blue-100 text-blue-600"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      // role is now a populated Role document ({ _id, name, isSystem, ... })
      // instead of a plain "ADMIN" / "USER" string.
      render: (role, user) => (
        <Select
          size="small"
          value={role?._id}
          style={{ minWidth: 140 }}
          disabled={role?.isSystem}
          onChange={(roleId) => handleRoleChange(user, roleId)}
          options={roles?.map((r) => ({
            value: r._id,
            label: r.name,
          }))}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag
          color={
            status === "ACTIVE"
              ? "green"
              : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      render: (_, user) => (
        <Space>
          <Switch
            checked={user.status === "ACTIVE"}
            onChange={() =>
              handleStatus(user)
            }
          />
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-2">
        <div>
          <h1 className="text-xl font-semibold text-slate-800 mb-0">
            User Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage user accounts and their roles.
          </p>
        </div>
    <div className="rounded-[1.5rem] border border-[#d8e7f8] bg-[#eef6ff] shadow-sm overflow-hidden">
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={data}
        className="bg-transparent"
        rowClassName={() => "hover:bg-sky-50 transition-colors duration-200"}
        pagination={false}
      />
    </div>
    </div>
  );
};

export default Users;
