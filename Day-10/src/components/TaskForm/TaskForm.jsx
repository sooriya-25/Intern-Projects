import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";

import { useTasks } from "../../hooks/useTasks";

const TaskForm = ({ open, onCancel, editingTask }) => {
  const [form] = Form.useForm();

  const { addTaskMutation, updateTaskMutation } = useTasks();

  useEffect(() => {
    if (editingTask) {
      form.setFieldsValue(editingTask);
    } else {
      form.resetFields();
    }
  }, [editingTask, form]);

  const handleSubmit = (values) => {
    if (editingTask) {
      updateTaskMutation.mutate({
        id: editingTask.id,
        task: values,
      });
    } else {
      addTaskMutation.mutate(values);
    }

    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      open={open}
      title={editingTask ? "Edit Task" : "Add Task"}
      footer={null}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter task title",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          initialValue="Pending"
        >
          <Select
            options={[
              {
                label: "Pending",
                value: "Pending",
              },
              {
                label: "Completed",
                value: "Completed",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Priority"
          name="priority"
          initialValue="Medium"
        >
          <Select
            options={[
              {
                label: "High",
                value: "High",
              },
              {
                label: "Medium",
                value: "Medium",
              },
              {
                label: "Low",
                value: "Low",
              },
            ]}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          loading={
            addTaskMutation.isPending ||
            updateTaskMutation.isPending
          }
        >
          {editingTask ? "Update Task" : "Add Task"}
        </Button>
      </Form>
    </Modal>
  );
};

export default TaskForm;