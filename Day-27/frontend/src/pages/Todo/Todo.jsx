import { Button, Space, Spin, Table, Tag, Modal, message } from "antd";

import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { useState } from "react";
import dayjs from "dayjs";

import { useTodos } from "../../hooks/useTodos";
import { useCreateTodo } from "../../hooks/useCreateTodo";
import { useUpdateTodo } from "../../hooks/useUpdateTodo";
import { useDeleteTodo } from "../../hooks/useDeleteTodo";
import usePermission from "../../hooks/usePermission";

import TodoModal from "../../components/todo/TodoModal";

const statusColor = {
  PENDING: "default",
  IN_PROGRESS: "blue",
  COMPLETED: "green",
};

const Todo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const { hasPermission } = usePermission();

  const canAdd = hasPermission("TODO", "add");
  const canEdit = hasPermission("TODO", "edit");
  const canDelete = hasPermission("TODO", "delete");

  const { data, isLoading } = useTodos();

  const { mutate: createTodo, isPending: creating } = useCreateTodo();
  const { mutate: updateTodo, isPending: updating } = useUpdateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleAdd = () => {
    setSelectedTodo(null);
    setModalOpen(true);
  };

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setModalOpen(true);
  };

  const handleSubmit = (values) => {
    if (selectedTodo) {
      updateTodo(
        { id: selectedTodo._id, data: values },
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

    createTodo(values, {
      onSuccess: (response) => {
        message.success(response.message);
        setModalOpen(false);
      },
      onError: (error) => {
        message.error(error.response?.data?.message || "Failed");
      },
    });
  };

  const handleDelete = (todo) => {
    Modal.confirm({
      title: "Delete Todo",
      content: `Delete "${todo.title}"?`,
      okText: "Delete",
      okButtonProps: { danger: true },
      onOk() {
        deleteTodo(todo._id, {
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

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (title) => (
        <span className="font-medium text-slate-800">{title}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => <Tag color={statusColor[status]}>{status}</Tag>,
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      render: (dueDate) => (dueDate ? dayjs(dueDate).format("DD MMM YYYY") : "—"),
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      render: (createdBy) => createdBy?.name || "—",
    },
    ...(canEdit || canDelete
      ? [
          {
            title: "Action",
            render: (_, todo) => (
              <Space>
                {canEdit && (
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(todo)}
                  >
                    Edit
                  </Button>
                )}
                {canDelete && (
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(todo)}
                  >
                    Delete
                  </Button>
                )}
              </Space>
            ),
          },
        ]
      : []),
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
<div className="flex flex-col gap-5 p-3">
  <div>
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold text-slate-800 mb-0">
        Todo Management
      </h1>

      {canAdd && (
        <Button
          type="primary"
          className="rounded-full"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Add Todo
        </Button>
      )}
    </div>

    <p className="text-sm text-gray-500 mt-1">
      View all available todos.
    </p>
  </div>

  <div className="rounded-[1.5rem] border border-[#d8e7f8] bg-[#eef6ff] shadow-sm overflow-hidden">
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={data?.todos}
      className="bg-transparent"
    />
  </div>

  <TodoModal
    open={modalOpen}
    todo={selectedTodo}
    loading={creating || updating}
    onCancel={() => setModalOpen(false)}
    onSubmit={handleSubmit}
  />
</div>
  );
};

export default Todo;
