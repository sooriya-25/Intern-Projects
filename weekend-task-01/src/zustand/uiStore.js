import { create } from "zustand";

const savedTheme = localStorage.getItem("theme");

const useUIStore = create((set) => ({
  // ======================================
  // Theme
  // ======================================

  darkMode: savedTheme ? savedTheme === "dark" : true,

  toggleTheme: () =>
    set((state) => {
      const value = !state.darkMode;

      localStorage.setItem(
        "theme",
        value ? "dark" : "light"
      );

      document.body.setAttribute(
        "data-theme",
        value ? "dark" : "light"
      );

      return {
        darkMode: value,
      };
    }),

  setDarkMode: (value) => {
    localStorage.setItem(
      "theme",
      value ? "dark" : "light"
    );

    document.body.setAttribute(
      "data-theme",
      value ? "dark" : "light"
    );

    set({
      darkMode: value,
    });
  },

  // ======================================
  // Desktop Sidebar
  // ======================================

  sidebarCollapsed: false,

  setSidebarCollapsed: (value) =>
    set({
      sidebarCollapsed: value,
    }),

  toggleSidebar: () =>
    set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed,
    })),

  // ======================================
  // Mobile Sidebar
  // ======================================

  mobileSidebar: false,

  setMobileSidebar: (value) =>
    set({
      mobileSidebar: value,
    }),

  // ======================================
  // Add Task Modal
  // ======================================

  showAddTask: false,

  setShowAddTask: (value) =>
    set({
      showAddTask: value,
    }),

  // ======================================
  // Add Board Modal
  // ======================================

  showAddBoard: false,

  setShowAddBoard: (value) =>
    set({
      showAddBoard: value,
    }),

  // ======================================
  // Edit Board Modal
  // ======================================

  showEditBoard: false,

  setShowEditBoard: (value) =>
    set({
      showEditBoard: value,
    }),

  // ======================================
  // Delete Board Modal
  // ======================================

  showDeleteBoard: false,

  setShowDeleteBoard: (value) =>
    set({
      showDeleteBoard: value,
    }),

  // ======================================
  // Add Column Modal
  // ======================================

  showAddColumn: false,

  setShowAddColumn: (value) =>
    set({
      showAddColumn: value,
    }),

  // ======================================
  // Selected Task
  // ======================================

  selectedTask: null,

  setSelectedTask: (task) =>
    set({
      selectedTask: task,
    }),

  // ======================================
  // Reset
  // ======================================

  resetUI: () =>
    set({
      mobileSidebar: false,
      showAddTask: false,
      showAddBoard: false,
      showEditBoard: false,
      showDeleteBoard: false,
      showAddColumn: false,
      selectedTask: null,
    }),
}));

export default useUIStore;