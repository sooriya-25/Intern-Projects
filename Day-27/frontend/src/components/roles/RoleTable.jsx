import { Button, Space, Table, Tag, Tooltip } from "antd";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const RoleTable = ({ roles, loading, onEdit, onDelete }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (name, role) => (
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-800">{name}</span>
          {role.isSystem && <Tag color="gold">System</Tag>}
          {role.isDefault && <Tag color="blue">Default</Tag>}
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (description) => (
        <span className="text-slate-500">{description || "—"}</span>
      ),
    },
    {
      title: "Users Assigned",
      dataIndex: "userCount",
      align: "center",
      render: (count) => count ?? 0,
    },
    {
      title: "Action",
      align: "center",
      render: (_, role) => {
        // isSystem roles are permanently locked. Non-system roles with
        // users still assigned, or the current default role, can't be
        // deleted until that's resolved — the backend enforces this too,
        // this is just so the button gives instant feedback.
        const deleteDisabled =
          role.isSystem || role.isDefault || (role.userCount || 0) > 0;

        const deleteTooltip = role.isSystem
          ? "System roles can't be deleted"
          : role.isDefault
          ? "Set another role as default first"
          : role.userCount > 0
          ? `${role.userCount} user(s) still assigned to this role`
          : "";

        return (
          <Space>
            <Button
              icon={<EditOutlined />}
              disabled={role.isSystem}
              onClick={() => onEdit(role)}
            >
              Edit
            </Button>

            <Tooltip title={deleteTooltip}>
              <Button
                danger
                icon={<DeleteOutlined />}
                disabled={deleteDisabled}
                onClick={() => onDelete(role)}
              >
                Delete
              </Button>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  return (
    <Table
      rowKey="_id"
      loading={loading}
      columns={columns}
      dataSource={roles}
      className="bg-transparent"
      pagination={false}
    />
  );
};

export default RoleTable;
