import { Modal, Form, Input, Select, DatePicker } from "antd";

import { useEffect } from "react";

import dayjs from "dayjs";

const statusOptions = [
  { value: "PENDING", label: "Pending" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
];

const TodoModal = ({ open, onCancel, onSubmit, todo, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (todo) {
      form.setFieldsValue({
        title: todo.title,
        description: todo.description,
        status: todo.status,
        dueDate: todo.dueDate ? dayjs(todo.dueDate) : null,
      });
    } else {
      form.resetFields();

      form.setFieldsValue({
        status: "PENDING",
      });
    }
  }, [todo, form]);

  const handleFinish = (values) => {
    onSubmit({
      ...values,
      dueDate: values.dueDate ? values.dueDate.toISOString() : null,
    });

    if (!todo) {
      form.resetFields();
    }
  };

  return (
    <Modal
      open={open}
      centered
      width={520}
      destroyOnClose
      confirmLoading={loading}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={todo ? "Update" : "Create"}
      title={
        <div className="pb-2">
          <h2 className="text-xl font-semibold text-slate-800">
            {todo ? "Edit Todo" : "Add Todo"}
          </h2>
        </div>
      }
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input size="large" placeholder="Finish quarterly report" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} placeholder="Details..." />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select size="large" options={statusOptions} />
        </Form.Item>

        <Form.Item label="Due Date" name="dueDate">
          <DatePicker size="large" className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoModal;
