const express = require("express");

const router = express.Router();

const todoController = require("../controllers/todo.controller");

const authenticate = require("../middlewares/auth.middleware");
const checkPermission = require("../middlewares/checkPermission.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  createTodoValidator,
  updateTodoValidator,
} = require("../validators/todo.validator");

const MODULES = require("../constants/modules");
const ACTIONS = require("../constants/actions");

router.get(
  "/",
  authenticate,
  checkPermission(MODULES.TODO, ACTIONS.VIEW),
  todoController.getTodos
);

router.post(
  "/",
  authenticate,
  checkPermission(MODULES.TODO, ACTIONS.ADD),
  createTodoValidator,
  validate,
  todoController.createTodo
);

router.put(
  "/:id",
  authenticate,
  checkPermission(MODULES.TODO, ACTIONS.EDIT),
  updateTodoValidator,
  validate,
  todoController.updateTodo
);

router.delete(
  "/:id",
  authenticate,
  checkPermission(MODULES.TODO, ACTIONS.DELETE),
  todoController.deleteTodo
);

module.exports = router;
