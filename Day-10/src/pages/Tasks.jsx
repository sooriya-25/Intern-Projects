import { useState } from "react";
import { Button, Flex, Typography } from "antd";

import TaskForm from "../components/TaskForm/TaskForm";
import TaskTable from "../components/TaskTable/TaskTable";

import { useTasks } from "../hooks/useTasks";

const { Title } = Typography;
console.log("console.log from Task component")

const Tasks = () => {
  const [open, setOpen] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  const {
    tasksQuery,
    deleteTaskMutation,
  } = useTasks();

  const handleAdd = () => {
    setEditingTask(null);
    setOpen(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setOpen(true);
  };

  const handleDelete = (id) => {
    deleteTaskMutation.mutate(id);
  };

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        style={{
          marginBottom: 20,
        }}
      >
        <Title level={3}>
          Task Management
        </Title>

        <Button
          type="primary"
          onClick={handleAdd}
        >
          Add Task
        </Button>
      </Flex>

      <TaskTable
        tasks={tasksQuery.data || []}
        loading={tasksQuery.isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TaskForm
        open={open}
        editingTask={editingTask}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};

export default Tasks;