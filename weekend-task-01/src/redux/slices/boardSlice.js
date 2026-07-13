import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "kanban_boards";

const cachedBoards =
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const initialState = {
  boards: cachedBoards,
  currentBoard: cachedBoards[0]?.id || null,
};

const saveBoards = (boards) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(boards)
  );
};

const boardSlice = createSlice({
  name: "board",

  initialState,

  reducers: {
    // ===================================
    // Boards
    // ===================================

    setBoards(state, action) {
      state.boards = action.payload;

      state.currentBoard =
        action.payload.find(
          (b) => b.id === state.currentBoard
        )?.id || action.payload[0]?.id || null;

      saveBoards(state.boards);
    },

    setCurrentBoard(state, action) {
      state.currentBoard = action.payload;
    },

    addBoard(state, action) {
      state.boards.push(action.payload);
      state.currentBoard = action.payload.id;

      saveBoards(state.boards);
    },

    updateBoard(state, action) {
      const index = state.boards.findIndex(
        (board) => board.id === action.payload.id
      );

      if (index !== -1) {
        state.boards[index] = action.payload;
        saveBoards(state.boards);
      }
    },

    deleteBoard(state, action) {
      state.boards = state.boards.filter(
        (board) => board.id !== action.payload
      );

      if (state.currentBoard === action.payload) {
        state.currentBoard =
          state.boards[0]?.id || null;
      }

      saveBoards(state.boards);
    },

    // ===================================
    // Columns
    // ===================================

    addColumn(state, action) {
      const { boardId, column } = action.payload;

      const board = state.boards.find(
        (b) => b.id === boardId
      );

      if (!board) return;

      board.columns.push(column);

      saveBoards(state.boards);
    },

    updateColumn(state, action) {
      const {
        boardId,
        columnId,
        updatedColumn,
      } = action.payload;

      const board = state.boards.find(
        (b) => b.id === boardId
      );

      if (!board) return;

      const column = board.columns.find(
        (c) => c.id === columnId
      );

      if (!column) return;

      Object.assign(column, updatedColumn);

      saveBoards(state.boards);
    },

    deleteColumn(state, action) {
      const { boardId, columnId } = action.payload;

      const board = state.boards.find(
        (b) => b.id === boardId
      );

      if (!board) return;

      board.columns = board.columns.filter(
        (c) => c.id !== columnId
      );

      saveBoards(state.boards);
    },

    // ===================================
    // Tasks
    // ===================================

    addTask(state, action) {
      const { boardId, columnId, task } =
        action.payload;

      const board = state.boards.find(
        (b) => b.id === boardId
      );

      if (!board) return;

      const column = board.columns.find(
        (c) => c.id === columnId
      );

      if (!column) return;

      column.tasks.push(task);

      saveBoards(state.boards);
    },

    updateTask(state, action) {
      const { boardId, task } = action.payload;

      const board = state.boards.find(
        (b) => b.id === boardId
      );

      if (!board) return;

      board.columns.forEach((column) => {
        const index = column.tasks.findIndex(
          (t) => t.id === task.id
        );

        if (index !== -1) {
          column.tasks[index] = task;
        }
      });

      saveBoards(state.boards);
    },

    deleteTask(state, action) {
      const { boardId, taskId } =
        action.payload;

      const board = state.boards.find(
        (b) => b.id === boardId
      );

      if (!board) return;

      board.columns.forEach((column) => {
        column.tasks = column.tasks.filter(
          (task) => task.id !== taskId
        );
      });

      saveBoards(state.boards);
    },

    moveTask(state, action) {
      const {
        boardId,
        taskId,
        destinationColumnId,
      } = action.payload;

      const board = state.boards.find(
        (b) => b.id === boardId
      );

      if (!board) return;

      let movedTask = null;

      board.columns.forEach((column) => {
        const index = column.tasks.findIndex(
          (task) => task.id === taskId
        );

        if (index !== -1) {
          movedTask = {
            ...column.tasks[index],
            status: destinationColumnId,
          };

          column.tasks.splice(index, 1);
        }
      });

      if (!movedTask) return;

      const destination = board.columns.find(
        (column) => column.id === destinationColumnId
      );

      if (!destination) return;

      destination.tasks.push(movedTask);

      saveBoards(state.boards);
    },

    toggleSubtask(state, action) {
      const {
        boardId,
        taskId,
        subtaskId,
      } = action.payload;

      const board = state.boards.find(
        (b) => b.id === boardId
      );

      if (!board) return;

      board.columns.forEach((column) => {
        column.tasks.forEach((task) => {
          if (task.id === taskId) {
            const subtask = task.subtasks.find(
              (s) => s.id === subtaskId
            );

            if (subtask) {
              subtask.done = !subtask.done;
            }
          }
        });
      });

      saveBoards(state.boards);
    },

    changeTaskStatus(state, action) {
      const {
        boardId,
        taskId,
        status,
      } = action.payload;

      const board = state.boards.find(
        (b) => b.id === boardId
      );

      if (!board) return;

      let taskToMove = null;

      board.columns.forEach((column) => {
        const index = column.tasks.findIndex(
          (task) => task.id === taskId
        );

        if (index !== -1) {
          taskToMove = {
            ...column.tasks[index],
            status,
          };

          column.tasks.splice(index, 1);
        }
      });

      if (!taskToMove) return;

      const destination = board.columns.find(
        (column) => column.id === status
      );

      if (destination) {
        destination.tasks.push(taskToMove);
      }

      saveBoards(state.boards);
    },
  },
});

export const {
  setBoards,
  setCurrentBoard,
  addBoard,
  updateBoard,
  deleteBoard,
  addColumn,
  updateColumn,
  deleteColumn,
  addTask,
  updateTask,
  deleteTask,
  moveTask,
  toggleSubtask,
  changeTaskStatus,
} = boardSlice.actions;

export default boardSlice.reducer;