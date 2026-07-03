import { useEffect } from "react";

import {
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
} from "antd";

import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";

const departments = [
  "CSE",
  "IT",
  "ECE",
  "EEE",
  "Mechanical",
];

function StudentForm({
  addStudent,
  updateStudent,
  editingStudent,
  setEditingStudent,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingStudent) {
      form.setFieldsValue(editingStudent);
    } else {
      form.resetFields();
    }
  }, [editingStudent, form]);

  const onFinish = (values) => {
    if (editingStudent) {
      updateStudent(values);
    } else {
      addStudent(values);
    }

    form.resetFields();
    setEditingStudent(null);
  };

  return (
    <Card
      title={
        <span
          style={{
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          Add / Edit Student
        </span>
      }
      style={{
        marginBottom: 25,
        borderRadius: 12,
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={[24, 8]}>

          {/* Student Name */}

          <Col xs={24} md={12}>
            <Form.Item
              label={
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  Student Name
                </span>
              }
              name="name"
              rules={[
                {
                  required: true,
                  message: "Enter student name",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter student name"
              />
            </Form.Item>
          </Col>

          {/* Age */}

          <Col xs={24} md={12}>
            <Form.Item
              label={
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  Age
                </span>
              }
              name="age"
              rules={[
                {
                  required: true,
                  message: "Enter age",
                },
              ]}
            >
              <InputNumber
                size="large"
                style={{ width: "100%" }}
                placeholder="Enter age"
              />
            </Form.Item>
          </Col>

          {/* Department */}

          <Col xs={24} md={12}>
            <Form.Item
              label={
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  Department
                </span>
              }
              name="department"
              rules={[
                {
                  required: true,
                  message: "Select department",
                },
              ]}
            >
              <Select
                size="large"
                placeholder="Select Department"
                options={departments.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Form.Item>
          </Col>

          {/* Email */}

          <Col xs={24} md={12}>
            <Form.Item
              label={
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  Email
                </span>
              }
              name="email"
              rules={[
                {
                  required: true,
                  message: "Enter email",
                },
                {
                  type: "email",
                  message: "Enter a valid email",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter email"
              />
            </Form.Item>
          </Col>

          {/* Submit Button */}

          <Col span={24}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              startIcon={<SaveIcon />}
              sx={{
                height: 50,
                fontSize: 16,
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
                mt: 1,
              }}
            >
              {editingStudent
                ? "Update Student"
                : "Add Student"}
            </Button>
          </Col>

        </Row>
      </Form>
    </Card>
  );
}

export default StudentForm;