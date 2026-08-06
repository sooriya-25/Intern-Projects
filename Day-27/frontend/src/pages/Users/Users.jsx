import {
  Select,
  Space,
  Spin,
  Switch,
  Table,
  Tag,
  message,
} from "antd";

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
    <div className="rounded-[1.5rem] border border-[#d8e7f8] bg-[#eef6ff] shadow-sm overflow-hidden">
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={data}
        className="bg-transparent"
        rowClassName={() => "hover:bg-sky-50 transition-colors duration-200"}
      />
    </div>
  );
};

export default Users;
