import { Button, Modal, Spin, message } from "antd";

import { PlusOutlined } from "@ant-design/icons";

import { useState } from "react";

import { useRoles } from "../../hooks/useRoles";
import { useCreateRole } from "../../hooks/useCreateRole";
import { useUpdateRole } from "../../hooks/useUpdateRole";
import { useDeleteRole } from "../../hooks/useDeleteRole";

import RoleTable from "../../components/roles/RoleTable";
import RoleModal from "../../components/roles/RoleModal";

const RoleManagement = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const { data, isLoading } = useRoles();

  const { mutate: createRole, isPending: creating } = useCreateRole();
  const { mutate: updateRole, isPending: updating } = useUpdateRole();
  const { mutate: deleteRole } = useDeleteRole();

  const handleAdd = () => {
    setSelectedRole(null);
    setModalOpen(true);
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setModalOpen(true);
  };

  const handleSubmit = (values) => {
    if (selectedRole) {
      updateRole(
        { id: selectedRole._id, data: values },
        {
          onSuccess: (response) => {
            message.success(response.message);
            setModalOpen(false);
          },
          onError: (error) => {
            message.error(error.response?.data?.message || "Failed");
          },
        }
      );
      return;
    }

    createRole(values, {
      onSuccess: (response) => {
        message.success(response.message);
        setModalOpen(false);
      },
      onError: (error) => {
        message.error(error.response?.data?.message || "Failed");
      },
    });
  };

  const handleDelete = (role) => {
    Modal.confirm({
      title: "Delete Role",
      content: `Delete "${role.name}"? This can't be undone.`,
      okText: "Delete",
      okButtonProps: { danger: true },
      onOk() {
        deleteRole(role._id, {
          onSuccess: (response) => {
            message.success(response.message);
          },
          onError: (error) => {
            message.error(error.response?.data?.message || "Failed");
          },
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-800 mb-0">
            Role Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create roles and control what each one can do, module by module.
          </p>
        </div>

        <Button
          type="primary"
          className="rounded-full"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Add Role
        </Button>
      </div>

      <div className="rounded-[1.5rem] border border-[#d8e7f8] bg-[#eef6ff] shadow-sm overflow-hidden">
        <RoleTable
          roles={data}
          loading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <RoleModal
        open={modalOpen}
        role={selectedRole}
        loading={creating || updating}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default RoleManagement;
