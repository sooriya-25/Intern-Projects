import { Grid, Layout, message } from "antd";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import Sidebar from "../components/Layout/Sidebar";
import MobileSidebar from "../components/Layout/MobileSidebar";
import Header from "../components/Layout/Header";

import Board from "../components/Board/Board";

import AddTaskModal from "../components/Task/AddTaskModal";
import TaskDetailsModal from "../components/Task/TaskDetailsModal";

import AddBoardModal from "../components/BoardModal/AddBoardModal";
import EditBoardModal from "../components/BoardModal/EditBoardModal";
import DeleteBoardModal from "../components/BoardModal/DeleteBoardModal";
import AddColumnModal from "../components/BoardModal/AddColumnModal";

import useUIStore from "../zustand/uiStore";

import {
  addBoard,
  updateBoard,
  deleteBoard,
  addColumn,
  addTask,
  updateTask,
  deleteTask,
  changeTaskStatus,
  toggleSubtask,
  setBoards,
  setCurrentBoard,
} from "../redux/slices/boardSlice";
import {
  getBoards as fetchBoards,
  createBoard as createBoardApi,
  updateBoard as updateBoardApi,
  removeBoard as removeBoardApi,
} from "../services/api";

const { Content } = Layout;
const { useBreakpoint } = Grid;

const DEFAULT_COLUMN_COLORS = [
  "#49C4E5",
  "#8471F2",
  "#67E2AE",
  "#F39C12",
  "#E91E63",
  "#9C27B0",
];

function Dashboard() {
  const screens = useBreakpoint();
  const dispatch = useDispatch();

  const {
    sidebarCollapsed,
    setSidebarCollapsed,

    mobileSidebar,
    setMobileSidebar,

    darkMode,
    toggleTheme,

    showAddTask,
    setShowAddTask,

    showAddBoard,
    setShowAddBoard,

    showEditBoard,
    setShowEditBoard,

    showDeleteBoard,
    setShowDeleteBoard,

    showAddColumn,
    setShowAddColumn,

    selectedTask,
    setSelectedTask,
  } = useUIStore();

  const boards = useSelector((state) => state.board.boards);
  const currentBoard = useSelector(
    (state) => state.board.currentBoard
  );

  const board =
    boards.find((item) => item.id === currentBoard) ||
    boards[0] ||
    null;

  const selectedBoardTask =
    selectedTask && board
      ? board.columns
          ?.flatMap((column) => column.tasks || [])
          .find((task) => task.id === selectedTask.id) || null
      : null;

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const remoteBoards = await fetchBoards();

        if (Array.isArray(remoteBoards) && remoteBoards.length > 0) {
          dispatch(setBoards(remoteBoards));
        }
      } catch (error) {
        console.error("Failed to load boards", error);
      }
    };

    if (boards.length === 0) {
      loadBoards();
    }
  }, [boards.length, dispatch]);

  useEffect(() => {
    if (!currentBoard && boards.length > 0) {
      dispatch(setCurrentBoard(boards[0].id));
    }
  }, [boards, currentBoard, dispatch]);

  const handleAddBoard = useCallback(
    async (newBoard) => {
      try {
        const createdBoard = await createBoardApi(newBoard);
        dispatch(addBoard(createdBoard));
        dispatch(setCurrentBoard(createdBoard.id));
        setShowAddBoard(false);
      } catch (error) {
        console.error("Failed to create board", error);
      }
    },
    [dispatch, setShowAddBoard]
  );

  const handleUpdateBoard = useCallback(
    async (updatedBoard) => {
      try {
        const savedBoard = await updateBoardApi(updatedBoard);
        dispatch(updateBoard(savedBoard));
        setShowEditBoard(false);
      } catch (error) {
        console.error("Failed to update board", error);
      }
    },
    [dispatch, setShowEditBoard]
  );

  const handleDeleteBoard = useCallback(
    async (boardId) => {
      try {
        await removeBoardApi(boardId);
        dispatch(deleteBoard(boardId));
        setShowDeleteBoard(false);
      } catch (error) {
        console.error("Failed to delete board", error);
      }
    },
    [dispatch, setShowDeleteBoard]
  );

  const handleBoardChange = useCallback(
    (id) => {
      dispatch(setCurrentBoard(id));
    },
    [dispatch]
  );

  const handleAddColumn = useCallback(
    async (values) => {
      if (!board?.id || !values?.name) return;

      const newColumn = {
        id: `${board.id}-column-${Date.now()}`,
        name: values.name.trim(),
        color: values.color?.trim() || "#49C4E5",
        tasks: [],
      };

      dispatch(
        addColumn({
          boardId: board.id,
          column: newColumn,
        })
      );

      try {
        await updateBoardApi({
          ...board,
          columns: [...(board?.columns || []), newColumn],
        });
      } catch (error) {
        console.error("Failed to add column", error);
      }

      setShowAddColumn(false);
    },
    [board?.id, board, dispatch, setShowAddColumn]
  );

  const handleAddTask = useCallback(
    (task) => {
      if (!board?.id) return;

      dispatch(
        addTask({
          boardId: board.id,
          task,
          columnId: task.status,
        })
      );
      setShowAddTask(false);
      message.success("Task added successfully");
    },
    [board?.id, dispatch, setShowAddTask]
  );

  const handleUpdateTask = useCallback(
    (updatedTask) => {
      if (!board?.id) return;

      dispatch(
        updateTask({
          boardId: board.id,
          task: updatedTask,
        })
      );
      setSelectedTask(null);
      message.success("Task updated successfully");
    },
    [board?.id, dispatch, setSelectedTask]
  );

  const handleDeleteTask = useCallback(
    (taskId) => {
      if (!board?.id) return;

      dispatch(
        deleteTask({
          boardId: board.id,
          taskId,
        })
      );
      setSelectedTask(null);
      message.success("Task deleted successfully");
    },
    [board?.id, dispatch, setSelectedTask]
  );

  const handleStatusChange = useCallback(
    (taskId, status) => {
      if (!board?.id) return;

      dispatch(
        changeTaskStatus({
          boardId: board.id,
          taskId,
          status,
        })
      );
      message.success("Task status updated");
    },
    [board?.id, dispatch]
  );

  const handleDropTask = useCallback(
    (taskId, destinationColumnId) => {
      if (!board?.id) return;

      dispatch(
        changeTaskStatus({
          boardId: board.id,
          taskId,
          status: destinationColumnId,
        })
      );
      message.success("Task moved successfully");
    },
    [board?.id, dispatch]
  );

  const handleSubtaskToggle = useCallback(
    (taskId, subtaskId) => {
      if (!board?.id) return;

      dispatch(
        toggleSubtask({
          boardId: board.id,
          taskId,
          subtaskId,
        })
      );
    },
    [board?.id, dispatch]
  );

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: darkMode ? "#20212C" : "#F4F7FD",
      }}
    >
      {screens.md ? (
        <Sidebar
          collapsed={sidebarCollapsed}
          boards={boards}
          currentBoard={currentBoard}
          darkMode={darkMode}
          onThemeChange={toggleTheme}
          onToggleSidebar={() =>
            setSidebarCollapsed(!sidebarCollapsed)
          }
          onBoardChange={handleBoardChange}
          onCreateBoard={() => setShowAddBoard(true)}
        />
      ) : (
        <MobileSidebar
          open={mobileSidebar}
          onClose={() => setMobileSidebar(false)}
          boards={boards}
          currentBoard={currentBoard}
          darkMode={darkMode}
          onThemeChange={toggleTheme}
          onBoardChange={(id) => {
            handleBoardChange(id);
            setMobileSidebar(false);
          }}
          onCreateBoard={() => setShowAddBoard(true)}
        />
      )}

      <Layout>
        <Header
          boardName={board?.name}
          onAddTask={() => setShowAddTask(true)}
          onEditBoard={() => setShowEditBoard(true)}
          onDeleteBoard={() => setShowDeleteBoard(true)}
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          collapsed={sidebarCollapsed}
          darkMode={darkMode}
          onThemeChange={toggleTheme}
        />

        <Content
          style={{
            background: darkMode ? "#20212C" : "#F5F7FB",
            overflow: "auto",
          }}
        >
          <Board
            board={board}
            columns={board?.columns || []}
            onTaskClick={setSelectedTask}
            onDropTask={handleDropTask}
            onAddColumn={() => setShowAddColumn(true)}
          />
        </Content>
      </Layout>

      <AddTaskModal
        open={showAddTask}
        columns={board?.columns || []}
        onCancel={() => setShowAddTask(false)}
        onSubmit={handleAddTask}
      />

      <TaskDetailsModal
        open={!!selectedTask}
        task={selectedBoardTask || selectedTask}
        columns={board?.columns || []}
        onClose={() => setSelectedTask(null)}
        onEdit={handleUpdateTask}
        onDelete={handleDeleteTask}
        onStatusChange={handleStatusChange}
        onSubtaskToggle={handleSubtaskToggle}
      />

      <AddBoardModal
        open={showAddBoard}
        onCancel={() => setShowAddBoard(false)}
        onSubmit={handleAddBoard}
      />

      <EditBoardModal
        open={showEditBoard}
        board={board}
        onCancel={() => setShowEditBoard(false)}
        onSubmit={handleUpdateBoard}
      />

      <DeleteBoardModal
        open={showDeleteBoard}
        board={board}
        onCancel={() => setShowDeleteBoard(false)}
        onDelete={handleDeleteBoard}
      />

      <AddColumnModal
        open={showAddColumn}
        onCancel={() => setShowAddColumn(false)}
        onSubmit={handleAddColumn}
      />
    </Layout>
  );
}

export default Dashboard;