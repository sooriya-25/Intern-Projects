import { Button, Popconfirm, Space, Table, Tag } from "antd";

const TaskTable = ({
  tasks,
  loading,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Completed" ? "green" : "orange"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => {
        let color = "blue";

        if (priority === "High") color = "red";
        if (priority === "Medium") color = "gold";
        if (priority === "Low") color = "green";

        return <Tag color={color}>{priority}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete Task?"
            onConfirm={() => onDelete(record.id)}
          >
            <Button danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={tasks}
      loading={loading}
      pagination={{
        pageSize: 5,
      }}
    />
  );
};

export default TaskTable;