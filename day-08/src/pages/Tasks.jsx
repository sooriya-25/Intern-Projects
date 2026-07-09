import "./Tasks.css";
import { useEffect, useState } from "react";
import { Alert, Card, Spin, Table, Tag } from "antd";

import TaskForm from "../components/TaskForm";

import { addTask, getTasks } from "../api/taskApi";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const data = await getTasks();

      setTasks(data);
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
      const newTask = await addTask(task);

      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      setError("Unable to add task.");
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

        if (priority === "Medium") color = "orange";

        if (priority === "High") color = "red";

        return <Tag color={color}>{priority}</Tag>;
      },
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
    </>
  );
};

export default Tasks;