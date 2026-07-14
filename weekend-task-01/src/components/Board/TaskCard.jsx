import { Card, Typography } from "antd";
import useUIStore from "../../zustand/uiStore";

const { Text } = Typography;

function TaskCard({ task, onClick }) {
  const { darkMode } = useUIStore();

  if (!task) return null;

  const completedSubtasks =
    task.subtasks?.filter((subtask) => subtask.done).length || 0;

  const totalSubtasks = task.subtasks?.length || 0;

  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <Card
      hoverable
      draggable
      onClick={() => onClick?.(task)}
      onDragStart={handleDragStart}
      bodyStyle={{
        padding: 20,
      }}
      style={{
        width: "100%",
        background: darkMode ? "#2B2C37" : "#FFFFFF",
        border: darkMode ? "none" : "1px solid #E5E7EB",
        borderRadius: 12,
        cursor: "pointer",
        userSelect: "none",
        boxShadow: darkMode
          ? "0 4px 6px rgba(0,0,0,.15)"
          : "0 8px 24px rgba(15, 23, 42, 0.08)",
        transition: "all .25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <Text
        strong
        style={{
          display: "block",
          color: darkMode ? "#FFFFFF" : "#0F172A",
          fontSize: 15,
          marginBottom: 10,
        }}
      >
        {task.title}
      </Text>

      <Text
        style={{
          color: darkMode ? "#828FA3" : "#64748B",
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        {completedSubtasks} of {totalSubtasks} subtasks
      </Text>
    </Card>
  );
}

export default TaskCard;