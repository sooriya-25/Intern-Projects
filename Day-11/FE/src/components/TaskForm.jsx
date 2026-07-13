import { Button, Form, Input, Select } from "antd";

const showPriority = process.env.REACT_APP_ENABLE_PRIORITY === "true";

const TaskForm = ({ onAddTask }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onAddTask({
      ...values,
      createdAt: new Date().toISOString(),
    });

    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="Task Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Task title is required",
          },
          {
            min: 3,
            message: "Minimum 3 characters",
          },
        ]}
      >
        <Input />
      </Form.Item>

      {showPriority && (
        <Form.Item label="Priority" name="priority" initialValue="Medium">
          <Select
            options={[
              {
                label: "Low",
                value: "Low",
              },
              {
                label: "Medium",
                value: "Medium",
              },
              {
                label: "High",
                value: "High",
              },
            ]}
          />
        </Form.Item>
      )}

      <Button type="primary" htmlType="submit">
        Add Task
      </Button>
    </Form>
  );
};

export default TaskForm;
