import { Modal, Form, Input, Switch, Divider } from "antd";

import { useEffect, useState } from "react";

import PermissionMatrix from "./PermissionMatrix";

const RoleModal = ({ open, onCancel, onSubmit, role, loading }) => {
  const [form] = Form.useForm();

  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (role) {
      form.setFieldsValue({
        name: role.name,
        description: role.description,
        isDefault: role.isDefault,
      });

      setPermissions(role.permissions || []);
    } else {
      form.resetFields();

      setPermissions([]);
    }
  }, [role, form]);

  const handleFinish = (values) => {
    onSubmit({
      ...values,
      permissions,
    });

    if (!role) {
      form.resetFields();
      setPermissions([]);
    }
  };

  return (
    <Modal
      open={open}
      centered
      width={720}
      destroyOnClose
      confirmLoading={loading}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={role ? "Update" : "Create"}
      title={
        <div className="pb-2">
          <h2 className="text-xl font-semibold text-slate-800">
            {role ? "Edit Role" : "Add Role"}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {role
              ? "Update this role's details and module permissions."
              : "Create a new role and choose what it can access."}
          </p>
        </div>
      }
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Role Name"
          name="name"
          rules={[{ required: true, message: "Role name is required" }]}
        >
          <Input size="large" placeholder="e.g. Editor" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={2} placeholder="What this role is for..." />
        </Form.Item>

        <Form.Item
          label="Default role for new signups"
          name="isDefault"
          valuePropName="checked"
          tooltip="Only one role can be the default. Setting this will unset it on whichever role currently holds it."
        >
          <Switch />
        </Form.Item>
      </Form>

      <Divider className="my-4" />

      <div className="mb-2">
        <h3 className="text-base font-semibold text-slate-800 mb-1">
          Module Permissions
        </h3>
        <p className="text-sm text-gray-500">
          Checking Add, Edit, or Delete automatically grants View.
        </p>
      </div>

      <PermissionMatrix value={permissions} onChange={setPermissions} />
    </Modal>
  );
};

export default RoleModal;
