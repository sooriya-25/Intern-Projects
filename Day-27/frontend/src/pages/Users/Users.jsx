import {
  Button,
  Space,
  Spin,
  Switch,
  Table,
  Tag,
  message,
} from "antd";

import { useUsers } from "../../hooks/useUsers";
import { useUpdateUserStatus } from "../../hooks/useUpdateUserStatus";

const Users = () => {
  const { data, isLoading } = useUsers();

  const { mutate } = useUpdateUserStatus();

  const handleStatus = (user) => {
    mutate(
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
      render: (role) => (
        <Tag color="blue">{role}</Tag>
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