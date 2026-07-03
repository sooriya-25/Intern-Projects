import { Table, Space, Popconfirm, Tag } from "antd";

import Button from "@mui/material/Button";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

function StudentTable({
  students,
  editStudent,
  deleteStudent,
  viewStudent,
}) {
  const departmentColor = (department) => {
    switch (department) {
      case "CSE":
        return "blue";
      case "IT":
        return "green";
      case "ECE":
        return "orange";
      case "EEE":
        return "purple";
      default:
        return "red";
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
      width: 70,
    },
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Age",
      dataIndex: "age",
      align: "center",
      width: 100,
    },
    {
      title: "Department",
      dataIndex: "department",
      align: "center",

      render: (department) => (
        <Tag color={departmentColor(department)}>
          {department}
        </Tag>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "Actions",
      align: "center",
      width: 320,

      render: (_, record) => (
        <Space size="small">

          <Button
            variant="contained"
            color="warning"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => editStudent(record)}
            sx={{
              textTransform: "none",
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete Student"
            description="Are you sure?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteStudent(record.id)}
          >
            <Button
              variant="contained"
              color="error"
              size="small"
              startIcon={<DeleteIcon />}
              sx={{
                textTransform: "none",
              }}
            >
              Delete
            </Button>
          </Popconfirm>

          <Button
            variant="contained"
            color="success"
            size="small"
            startIcon={<VisibilityIcon />}
            onClick={() => viewStudent(record)}
            sx={{
              textTransform: "none",
            }}
          >
            View
          </Button>

        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={students}
      bordered
      pagination={false}
      scroll={{ x: 900 }}
      size="middle"
    />
  );
}

export default StudentTable;