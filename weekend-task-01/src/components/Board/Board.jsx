import { Empty } from "antd";
import Column from "./Column";
import useUIStore from "../../zustand/uiStore";

function Board({
  board,
  columns = [],
  onTaskClick,
  onDropTask,
  onAddColumn,
}) {
  const { darkMode } = useUIStore();

  if (!board || columns.length === 0) {
    return (
      <div
        style={{
          height: "calc(100vh - 96px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: darkMode ? "#20212C" : "#F5F7FB",
        }}
      >
        <Empty description="No Board Available" />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        padding: 24,
        overflowX: "auto",
        overflowY: "hidden",
        height: "calc(100vh - 96px)",
        background: darkMode ? "#20212C" : "#F5F7FB",
      }}
    >
      {columns.map((column) => (
        <Column
          key={column.id}
          column={{
            ...column,
            tasks: column.tasks || [],
          }}
          onTaskClick={onTaskClick}
          onDropTask={onDropTask}
        />
      ))}

      <div
        onClick={onAddColumn}
        style={{
          minWidth: 280,
          borderRadius: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          fontSize: 24,
          fontWeight: 700,
          color: "#828FA3",
          background: darkMode
            ? "linear-gradient(180deg,#2B2C37 0%,#20212C 100%)"
            : "linear-gradient(180deg,#EEF2FF 0%,#F5F7FB 100%)",
        }}
      >
        + New Column
      </div>
    </div>
  );
}

export default Board;