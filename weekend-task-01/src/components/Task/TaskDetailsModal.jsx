import { useEffect, useState } from "react";
import {
  Modal,
  Typography,
  Select,
  Dropdown,
  Button,
} from "antd";
import {
  MoreVert,
  Edit,
  Delete,
} from "@mui/icons-material";

import SubTask from "./SubTask";
import useUIStore from "../../zustand/uiStore";

const { Title, Paragraph } = Typography;

function TaskDetailsModal({
  open,
  task,
  columns = [],
  onClose,
  onEdit,
  onDelete,
  onStatusChange,
  onSubtaskToggle,
}) {
  const { darkMode } = useUIStore();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (open && task) {
      setStatus(task.status);
    }
  }, [open, task]);

  if (!task) return null;

  const subtasks = task.subtasks || [];

  const completed = subtasks.filter(
    (subtask) => subtask.done
  ).length;

  const menuItems = [
    {
      key: "edit",
      icon: <Edit fontSize="small" />,
      label: "Edit Task",
      onClick: () => onEdit?.(task),
    },
    {
      key: "delete",
      danger: true,
      icon: <Delete fontSize="small" />,
      label: "Delete Task",
      onClick: () => onDelete?.(task),
    },
  ];

  const handleStatusChange = (value) => {
    setStatus(value);
    onStatusChange?.(task.id, value);
  };

  return (
    <Modal
      open={open}
      footer={null}
      centered
      width={520}
      title={null}
      destroyOnHidden
      onCancel={onClose}
      styles={{
        content: {
          background: darkMode
            ? "#2B2C37"
            : "#FFFFFF",
        },
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 20,
        }}
      >
        <Title
          level={4}
          style={{
            margin: 0,
            width: "85%",
            color: darkMode
              ? "#FFFFFF"
              : "#000112",
          }}
        >
          {task.title}
        </Title>

        <Dropdown
          trigger={["click"]}
          menu={{ items: menuItems }}
        >
          <Button
            type="text"
            onClick={(e) => e.stopPropagation()}
            icon={
              <MoreVert
                style={{
                  color: "#828FA3",
                }}
              />
            }
          />
        </Dropdown>
      </div>

      {/* Description */}
      <Paragraph
        style={{
          color: "#828FA3",
          lineHeight: 1.8,
          marginBottom: 24,
        }}
      >
        {task.description ||
          "No description available."}
      </Paragraph>

      {/* Subtasks */}
      <Paragraph
        style={{
          color: darkMode
            ? "#FFFFFF"
            : "#000112",
          fontWeight: 600,
          marginBottom: 14,
        }}
      >
        Subtasks ({completed} of {subtasks.length})
      </Paragraph>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 24,
        }}
      >
        {subtasks.length > 0 ? (
          subtasks.map((subtask) => (
            <SubTask
              key={subtask.id}
              subtask={subtask}
              taskId={task.id}
              onToggle={onSubtaskToggle}
            />
          ))
        ) : (
          <Paragraph
            style={{
              color: "#828FA3",
              marginBottom: 0,
            }}
          >
            No subtasks available.
          </Paragraph>
        )}
      </div>

      {/* Status */}
      <Paragraph
        style={{
          color: darkMode
            ? "#FFFFFF"
            : "#000112",
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        Current Status
      </Paragraph>

      <Select
        value={status}
        style={{ width: "100%" }}
        onChange={handleStatusChange}
        options={columns.map((column) => ({
          label: column.name,
          value: column.id,
        }))}
      />
    </Modal>
  );
}

export default TaskDetailsModal;