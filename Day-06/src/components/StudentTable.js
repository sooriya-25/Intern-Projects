import { Button, Popconfirm, Space, Table, Tag } from "antd";

function StudentTable({ students, deleteStudent, toggleAttendance }) {
  // Delete Student
  const handleDelete = (id) => {
    deleteStudent(id);
  };

  // Toggle Attendance
  const handleAttendance = (student) => {
    toggleAttendance(student.id);
  };

  const columns = [
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Roll Number",
      dataIndex: "roll",
      key: "roll",
    },

    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },

    {
      title: "Status",
      key: "status",

      render: (_, record) =>
        record.present ? (
          <Tag color="green">Present</Tag>
        ) : (
          <Tag color="red">Absent</Tag>
        ),
    },

    {
      title: "Actions",
      key: "actions",

      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Update Attendance"
            description={`Mark ${record.name} as ${
              record.present ? "Absent" : "Present"
            } ?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleAttendance(record)}
          >
            <Button type="primary">
              {record.present ? "Mark Absent" : "Mark Present"}
            </Button>
          </Popconfirm>

          <Popconfirm
            title="Delete Student"
            description={`Delete ${record.name}?`}
            okText="Delete"
            cancelText="Cancel"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={students}
      rowKey="id"
      bordered
      pagination={{
        pageSize: 5,
      }}
      scroll={{
        x: 900,
      }}
    />
  );
}

export default StudentTable;
