import React, { useEffect, useCallback } from "react";
import { Button, Form, Input, Select } from "antd";

const showPriority =
  process.env.REACT_APP_ENABLE_PRIORITY === "true";

/**
 * ===== Memoization =====
 * TaskForm component is wrapped with React.memo to prevent unnecessary re-renders
 * It only re-renders when its props change, improving performance
 */
const TaskForm = ({
  onAddTask,
  initialValues = {},
  submitLabel = "Add Task",
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  // ===== useCallback =====
  // Memoize form submission handler to maintain consistent reference
  const handleFinish = useCallback((values) => {
    onAddTask({
      ...values,
    });

    // Don't clear form while editing
    if (submitLabel === "Add Task") {
      form.resetFields();
    }
  }, [onAddTask, submitLabel, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        priority: "Medium",
        status: "Yet to do",
        ...initialValues,
      }}
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
        <Input placeholder="Enter task title" />
      </Form.Item>

      {showPriority && (
        <Form.Item
          label="Priority"
          name="priority"
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

      <Form.Item
        label="Progress"
        name="status"
      >
        <Select
          options={[
            {
              label: "Yet to do",
              value: "Yet to do",
            },
            {
              label: "In Progress",
              value: "In Progress",
            },
            {
              label: "Completed",
              value: "Completed",
            },
          ]}
        />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        block
      >
        {submitLabel}
      </Button>
    </Form>
  );
};

// Export memoized component - prevents re-renders unless props change
export default React.memo(TaskForm);