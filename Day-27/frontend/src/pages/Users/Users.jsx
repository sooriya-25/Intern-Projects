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

          <Button>
            Edit
          </Button>
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
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={data}
    />
  );
};

export default Users;