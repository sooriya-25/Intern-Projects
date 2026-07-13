import { useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function EditTaskModal({
  open,
  task,
  columns = [],
  onCancel,
  onSubmit,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && task) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        status: task.status,
        subtasks: task.subtasks || [],
      });
    }
  }, [open, task, form]);

  const handleFinish = (values) => {
    if (!task) return;

    const updatedTask = {
      ...task,
      title: values.title.trim(),
      description: values.description?.trim() || "",
      status: values.status,

      subtasks: (values.subtasks || [])
        .filter(
          (item) =>
            item?.title &&
            item.title.trim() !== ""
        )
        .map((item, index) => ({
          id:
            item.id ||
            `sub-${Date.now()}-${index}`,
          title: item.title.trim(),
          done: item.done ?? false,
        })),
    };

    onSubmit(updatedTask);

    form.resetFields();

    onCancel();
  };

  return (
    <Modal
      open={open}
      title="Edit Task"
      footer={null}
      centered
      width={520}
      destroyOnHidden
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Task title is required",
            },
            {
              whitespace: true,
              message: "Task title is required",
            },
          ]}
        >
          <Input placeholder="Task title" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <Input.TextArea
            rows={4}
            placeholder="Task description"
          />
        </Form.Item>

        <Form.List name="subtasks">
          {(fields, { add, remove }) => (
            <>
              <label
                style={{
                  display: "block",
                  marginBottom: 12,
                  fontWeight: 600,
                }}
              >
                Subtasks
              </label>

              {fields.map((field) => (
                <Space
                  key={field.key}
                  align="baseline"
                  style={{
                    display: "flex",
                    marginBottom: 12,
                  }}
                >
                  {/* Preserve subtask id */}
                  <Form.Item
                    name={[field.name, "id"]}
                    hidden
                  >
                    <Input />
                  </Form.Item>

                  {/* Preserve done status */}
                  <Form.Item
                    name={[field.name, "done"]}
                    hidden
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    name={[field.name, "title"]}
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Subtask"
                      style={{
                        width: 360,
                      }}
                    />
                  </Form.Item>

                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() =>
                      remove(field.name)
                    }
                  />
                </Space>
              ))}

              <Button
                block
                type="default"
                style={{
                  marginBottom: 20,
                  borderRadius: 24,
                  height: 42,
                }}
                onClick={() =>
                  add({
                    title: "",
                    done: false,
                  })
                }
              >
                + Add New Subtask
              </Button>
            </>
          )}
        </Form.List>

        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: "Please select a status",
            },
          ]}
        >
          <Select
            placeholder="Select Status"
            options={columns.map((column) => ({
              value: column.id,
              label: column.name,
            }))}
          />
        </Form.Item>

        <Button
          htmlType="submit"
          type="primary"
          block
          style={{
            height: 45,
            borderRadius: 24,
          }}
        >
          Save Changes
        </Button>
      </Form>
    </Modal>
  );
}

export default EditTaskModal;