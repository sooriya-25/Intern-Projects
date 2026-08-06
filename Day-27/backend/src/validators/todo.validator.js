const { body } = require("express-validator");

const STATUS_VALUES = ["PENDING", "IN_PROGRESS", "COMPLETED"];

const createTodoValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),

  body("description").optional().trim(),

  body("status")
    .optional()
    .isIn(STATUS_VALUES)
    .withMessage(`Status must be one of: ${STATUS_VALUES.join(", ")}`),

  body("dueDate").optional().isISO8601().withMessage("Due date must be a valid date"),
];

const updateTodoValidator = [
  body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),

  body("description").optional().trim(),

  body("status")
    .optional()
    .isIn(STATUS_VALUES)
    .withMessage(`Status must be one of: ${STATUS_VALUES.join(", ")}`),

  body("dueDate").optional().isISO8601().withMessage("Due date must be a valid date"),
];

module.exports = {
  createTodoValidator,
  updateTodoValidator,
};
