import "./Tasks.css";
import { useContext, useEffect, useState } from "react";
import { Alert, Button, Card, Modal, Popconfirm, Space, Spin, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import TaskForm from "../components/TaskForm";
import { AuthContext } from "../context/AuthContext";

import { addTask, deleteTask, getTasks, updateTask } from "../api/taskApi";

const Tasks = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await getTasks();
      setTasks(response.data);
    } catch (err) {
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
      const response = await addTask({
        ...task,
        userId: user?.id,
      });

      if (response.success) {
        fetchTasks();
      }
    } catch (err) {
      setError("Unable to add task.");
    }
  };

  const handleUpdateTask = async (id, values) => {
    try {
      const response = await updateTask(id, values);

      if (response.success) {
        setIsModalOpen(false);
        setEditingTask(null);
        fetchTasks();
      }
    } catch (err) {
      setError("Unable to update task.");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await deleteTask(id);

      if (response.success) {
        fetchTasks();
      }
    } catch (err) {
      setError("Unable to delete task.");
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setEditingTask(null);
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

        if (priority === "Medium") color = "orange";

        if (priority === "High") color = "red";

        return <Tag color={color}>{priority}</Tag>;
      },
    },
    {
      title: "Progress",
      dataIndex: "status",
      render: (status, record) => (
        <Tag
          color={
            status === "Done"
              ? "green"
              : status === "In progress"
              ? "blue"
              : "default"
          }
        >
          {status || "Yet to do"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditClick(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete this task?"
            onConfirm={() => handleDeleteTask(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
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
      <Card title="Add Task" className="task-card">
        <TaskForm onAddTask={handleAddTask} />
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

      <Modal
        title="Edit Task"
        open={isModalOpen}
        onCancel={handleModalCancel}
        footer={null}
      >
        {editingTask && (
          <TaskForm
            initialValues={{
              title: editingTask.title,
              priority: editingTask.priority,
              status: editingTask.status || "Yet to do",
            }}
            submitLabel="Save"
            onAddTask={(values) => handleUpdateTask(editingTask.id, values)}
          />
        )}
      </Modal>
    </>
  );
};

export default Tasks;
