import "./Tasks.css";
import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import {
  Alert,
  Button,
  Card,
  Input,
  Modal,
  Popconfirm,
  Space,
  Spin,
  Table,
  Tag,
  notification,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import TaskForm from "../components/TaskForm";
import { AuthContext } from "../context/AuthContext";
import { useDebounce } from "../hooks/useDebounce";

import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../api/taskApi";

const { Search } = Input;

const Tasks = () => {
  const { user } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  // ===== Debouncing =====
  // Search state and debounced value: delays API call by 500ms to reduce requests
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await getTasks(
        currentPage,
        pageSize,
        debouncedSearch
      );

      setTasks(response.data);
      setTotal(response.total);
    } catch (err) {
      setError("Unable to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch when debounced search changes
  useEffect(() => {
    setCurrentPage(1); // Reset to first page on new search
    fetchTasks();
  }, [debouncedSearch]);

  // Fetch when pagination changes
  useEffect(() => {
    fetchTasks();
  }, [currentPage, pageSize]);

  // ===== useCallback =====
  // Memoize handlers to prevent unnecessary re-renders of memoized child components
  const handleAddTask = useCallback(async (task) => {
    try {
      const response = await addTask({
        ...task,
        userId: user?._id,
      });

      if (response.success) {
        notification.success({
          message: "Task added",
          description: "The task was created successfully.",
        });
        fetchTasks();
      }
    } catch (err) {
      setError("Unable to add task.");
      notification.error({
        message: "Task add failed",
        description: "Unable to add the task right now.",
      });
    }
  }, [user?._id]);

  const handleUpdateTask = useCallback(async (id, values) => {
    try {
      const response = await updateTask(id, values);

      if (response.success) {
        setIsModalOpen(false);
        setEditingTask(null);
        notification.success({
          message: "Task updated",
          description: "The task was updated successfully.",
        });
        fetchTasks();
      }
    } catch (err) {
      setError("Unable to update task.");
      notification.error({
        message: "Task update failed",
        description: "Unable to update the task right now.",
      });
    }
  }, []);

  const handleDeleteTask = useCallback(async (id) => {
    try {
      const response = await deleteTask(id);

      if (response.success) {
        notification.success({
          message: "Task deleted",
          description: "The task was deleted successfully.",
        });
        fetchTasks();
      }
    } catch (err) {
      setError("Unable to delete task.");
      notification.error({
        message: "Task delete failed",
        description: "Unable to delete the task right now.",
      });
    }
  }, []);

  const handleEditClick = useCallback((task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  }, []);

  const handleModalCancel = useCallback(() => {
    setIsModalOpen(false);
    setEditingTask(null);
  }, []);

  // ===== Memoization =====
  // Column configuration is memoized to prevent recalculation on every render
  const columns = useMemo(() => [
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
      render: (status) => (
        <Tag
          color={
            status === "Completed"
              ? "green"
              : status === "In Progress"
              ? "blue"
              : "default"
          }
        >
          {status}
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
            onConfirm={() =>
              handleDeleteTask(record._id)
            }
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ], []);

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
            marginTop: 20,
            marginBottom: 20,
          }}
        />
      )}

      <Card
        title="Task List"
        extra={
          <Search
            placeholder="Search tasks..."
            allowClear
            enterButton={<SearchOutlined />}
            style={{ width: 300 }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        }
      >
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={tasks}
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize,
            total,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20"],
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
          }}
        />
      </Card>

      <Modal
        title="Edit Task"
        open={isModalOpen}
        onCancel={handleModalCancel}
        footer={null}
        destroyOnClose
      >
        {editingTask && (
          <TaskForm
            initialValues={{
              title: editingTask.title,
              priority: editingTask.priority,
              status:
                editingTask.status || "Yet to do",
            }}
            submitLabel="Save"
            onAddTask={(values) =>
              handleUpdateTask(
                editingTask._id,
                values
              )
            }
          />
        )}
      </Modal>
    </>
  );
};

export default Tasks;