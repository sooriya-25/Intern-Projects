import { Checkbox } from "antd";
import useUIStore from "../../zustand/uiStore";

function SubTask({
  subtask,
  taskId,
  onToggle,
}) {
  const { darkMode } = useUIStore();

  if (!subtask) return null;

  const handleChange = () => {
    onToggle?.(taskId, subtask.id);
  };

  return (
    <div
      onClick={handleChange}
      style={{
        background: darkMode ? "#20212C" : "#F4F7FD",
        borderRadius: 8,
        padding: "14px 16px",
        cursor: "pointer",
        transition: "0.3s",
      }}
    >
      <Checkbox
        checked={subtask.done}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
        }}
      >
        <span
          style={{
            color: subtask.done
              ? "#828FA3"
              : darkMode
              ? "#FFFFFF"
              : "#000112",
            textDecoration: subtask.done
              ? "line-through"
              : "none",
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          {subtask.title}
        </span>
      </Checkbox>
    </div>
  );
}

export default SubTask;