import { Button, Form, Input, Modal } from "antd";
import useUIStore from "../../zustand/uiStore";

function AddColumnModal({ open, onCancel, onSubmit }) {
  const [form] = Form.useForm();
  const { darkMode } = useUIStore();

  const handleFinish = (values) => {
    const payload = {
      name: values.name?.trim(),
      color: values.color?.trim() || "#49C4E5",
    };

    onSubmit?.(payload);
    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel?.();
  };

  return (
    <Modal
      open={open}
      title="Add New Column"
      centered
      footer={null}
      width={480}
      destroyOnClose
      onCancel={handleCancel}
      styles={{
        header: {
          borderBottom: `1px solid ${darkMode ? "#3E3F4E" : "#E4EBFA"}`,
        },
        body: {
          paddingTop: 20,
        },
        footer: {},
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          name: "",
          color: "#49C4E5",
        }}
      >
        <Form.Item
          label="Column Name"
          name="name"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Column name is required",
            },
          ]}
        >
          <Input
            placeholder="e.g. Review"
            style={{
              height: 44,
              borderRadius: 10,
              background: darkMode ? "#2B2C37" : "#FFFFFF",
              color: darkMode ? "#FFFFFF" : "#000112",
              border: darkMode ? "1px solid #3E3F4E" : "1px solid #E4EBFA",
            }}
          />
        </Form.Item>

        <Form.Item
          label="Column Color"
          name="color"
          rules={[
            {
              required: true,
              message: "Column color is required",
            },
          ]}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 10px",
              borderRadius: 10,
              border: darkMode ? "1px solid #3E3F4E" : "1px solid #E4EBFA",
              background: darkMode ? "#2B2C37" : "#FFFFFF",
              width: "fit-content",
            }}
          >
            <Input
              type="color"
              value={form.getFieldValue("color") || "#49C4E5"}
              onChange={(e) => form.setFieldValue("color", e.target.value)}
              style={{
                width: 40,
                height: 32,
                padding: 0,
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            />
            <span
              style={{
                fontSize: 13,
                color: darkMode ? "#FFFFFF" : "#000112",
                fontWeight: 500,
              }}
            >
              {form.getFieldValue("color") || "#49C4E5"}
            </span>
          </div>
        </Form.Item>

        <Button
          htmlType="submit"
          type="primary"
          block
          style={{
            height: 45,
            borderRadius: 24,
            marginTop: 8,
          }}
        >
          Add Column
        </Button>
      </Form>
    </Modal>
  );
}

export default AddColumnModal;
