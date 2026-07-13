import TaskCard from "./TaskCard";

const DEFAULT_COLORS = {
  todo: "#49C4E5",
  doing: "#8471F2",
  done: "#67E2AE",
};

function Column({
  column,
  onTaskClick,
  onDropTask,
}) {
  if (!column) return null;

  const tasks = column.tasks || [];

  const handleDrop = (e) => {
    e.preventDefault();

    const taskId = e.dataTransfer.getData("taskId");

    if (!taskId) return;

    onDropTask?.(taskId, column.id);
  };

  return (
    <div
      style={{
        minWidth: 300,
        display: "flex",
        flexDirection: "column",
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 15,
            height: 15,
            borderRadius: "50%",
            background:
              column.color ||
              DEFAULT_COLORS[column.name?.toLowerCase()] ||
              "#635FC7",
          }}
        />

        <span
          style={{
            color: "#828FA3",
            fontWeight: 700,
            letterSpacing: 2,
            fontSize: 12,
          }}
        >
          {column.name?.toUpperCase()} ({tasks.length})
        </span>
      </div>

      {/* Task Cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          minHeight: 100,
        }}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick?.(task)}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;