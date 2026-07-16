import { useEffect } from "react";
import { Button, Form, Input, Select } from "antd";

const showPriority = process.env.REACT_APP_ENABLE_PRIORITY === "true";

const TaskForm = ({ onAddTask, initialValues = {}, submitLabel = "Add Task" }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const handleFinish = (values) => {
    onAddTask({
      ...values,
      createdAt: new Date().toISOString(),
    });

    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={initialValues}
    >
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

      <Form.Item label="Progress" name="status" initialValue="Yet to do">
        <Select
          options={[
            {
              label: "Yet to do",
              value: "Yet to do",
            },
            {
              label: "In progress",
              value: "In progress",
            },
            {
              label: "Done",
              value: "Done",
            },
          ]}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        {submitLabel}
      </Button>
    </Form>
  );
};

export default TaskForm;
