import {
  Button,
  Form,
  Input,
  Select,
} from "antd";
import { useEffect } from "react";

const showPriority =
  process.env.REACT_APP_ENABLE_PRIORITY ===
  "true";

const TaskForm = ({
  onSubmit,
  initialValues,
  submitText = "Add Task",
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleFinish = (values) => {
    if (!initialValues) {
      values.createdAt =
        new Date().toISOString();
    }

    onSubmit(values);

    if (!initialValues) {
      form.resetFields();
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
    >
      <Form.Item
        label="Task Title"
        name="title"
        rules={[
          {
            required: true,
            message:
              "Task title is required",
          },
          {
            min: 3,
            message:
              "Minimum 3 characters",
          },
        ]}
      >
        <Input />
      </Form.Item>

      {showPriority && (
        <Form.Item
          label="Priority"
          name="priority"
          initialValue="Medium"
        >
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

      <Button
        type="primary"
        htmlType="submit"
      >
        {submitText}
      </Button>
    </Form>
  );
};

export default TaskForm;