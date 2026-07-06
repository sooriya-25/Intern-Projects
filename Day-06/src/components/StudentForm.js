import { Button, Form, Input, Select, message } from "antd";

const departments = [
  "Computer Science",
  "Information Technology",
  "Electronics & Communication",
  "Electrical & Electronics",
  "Mechanical",
];

function StudentForm({ addStudent }) {
  const [form] = Form.useForm();

  // Watch form values
  const name = Form.useWatch("name", form);
  const roll = Form.useWatch("roll", form);
  const department = Form.useWatch("department", form);

  const handleSubmit = (values) => {
    const result = addStudent(values);

    if (result.success) {
      message.success("Student added successfully!");
      form.resetFields();
      return;
    }

    form.setFields([
      {
        name: result.field,
        errors: [result.message],
      },
    ]);
  };
  const isFormValid = name && roll && department;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ marginBottom: 30 }}
      onValuesChange={() => {
        form.setFields([
          { name: "name", errors: [] },
          { name: "roll", errors: [] },
        ]);
      }}
    >
      <div className="form-container">
        <Form.Item
          label="Student Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter student name",
            },
          ]}
        >
          <Input placeholder="Enter Student Name" />
        </Form.Item>

        <Form.Item
          label="Roll Number"
          name="roll"
          rules={[
            {
              required: true,
              message: "Please enter roll number",
            },
          ]}
        >
          <Input placeholder="Enter Roll Number" />
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          rules={[
            {
              required: true,
              message: "Please select department",
            },
          ]}
        >
          <Select
            placeholder="Select Department"
            options={departments.map((dept) => ({
              label: dept,
              value: dept,
            }))}
          />
        </Form.Item>

        <Form.Item label=" " className="add-btn">
          <Button type="primary" htmlType="submit" disabled={!isFormValid}>
            Add Student
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default StudentForm;
