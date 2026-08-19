// Mirrors backend/src/constants/modules.js. Roles and Users are
// intentionally excluded — those two are locked to isSystem admin
// roles and never appear in the editable permission matrix.
export const MODULES = [
  {
    key: "STOCKS",
    label: "Stocks",
    // Editing/deleting stocks isn't grantable through roles anymore —
    // the checkboxes stay locked (and unset) in the permission matrix.
    disabledActions: ["edit", "delete"],
  },
  { key: "WATCHLIST", label: "Watchlist" },
  { key: "TODO", label: "Todo" },
];

export const ACTIONS = [
  { key: "view", label: "View" },
  { key: "add", label: "Add" },
  { key: "edit", label: "Edit" },
  { key: "delete", label: "Delete" },
];
