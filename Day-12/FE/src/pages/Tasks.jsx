import "./Tasks.css";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Modal,
  Popconfirm,
  Space,
  Spin,
  Table,
  Tag,
} from "antd";

import TaskForm from "../components/TaskForm";
import EditTaskModal from "../components/EditTaskModal";

import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../api/taskApi";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [editingTask, setEditingTask] =
    useState(null);

  const [openEdit, setOpenEdit] =
    useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await getTasks();

      setTasks(response.data);
    } catch {
      setError("Unable to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (task) => {
    try {
      const response = await addTask(task);

      if (response.success) {
        fetchTasks();
      }
    } catch {
      setError("Unable to add task.");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setOpenEdit(true);
  };

  const handleUpdate = async (values) => {
    try {
      const response = await updateTask(
        editingTask.id,
        values
      );

      if (response.success) {
        setOpenEdit(false);
        fetchTasks();
      }
    } catch {
      setError("Unable to update task.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteTask(id);

      if (response.success) {
        fetchTasks();
      }
    } catch {
      setError("Unable to delete task.");
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (priority) => {
        let color = "green";

        if (priority === "Medium")
          color = "orange";

        if (priority === "High")
          color = "red";

        return (
          <Tag color={color}>{priority}</Tag>
        );
      },
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleEdit(record)
            }
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={() =>
              handleDelete(record.id)
            }
          >
            <Button danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <>
      <Card
        title="Add Task"
        className="task-card"
      >
        <TaskForm
          onSubmit={handleAddTask}
        />
      </Card>

      {error && (
        <Alert
          type="error"
          message={error}
          showIcon
          style={{
            marginBottom: 20,
          }}
        />
      )}

      <Card title="Task List">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={tasks}
          pagination={false}
        />
      </Card>

      <EditTaskModal
        open={openEdit}
        task={editingTask}
        onCancel={() =>
          setOpenEdit(false)
        }
        onUpdate={handleUpdate}
      />
    </>
  );
};

export default Tasks;