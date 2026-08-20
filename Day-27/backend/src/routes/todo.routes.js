const express = require("express");

const router = express.Router();

const todoController = require("../controllers/todo.controller");

const authenticate = require("../middlewares/auth.middleware");
const checkPermission = require("../middlewares/checkPermission.middleware");

// Request body validation is handled globally by express-openapi-validator
// (see app.js + src/openapi/modules/todo.yaml).

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
  todoController.createTodo
);

router.put(
  "/:id",
  authenticate,
  checkPermission(MODULES.TODO, ACTIONS.EDIT),
  todoController.updateTodo
);

router.delete(
  "/:id",
  authenticate,
  checkPermission(MODULES.TODO, ACTIONS.DELETE),
  todoController.deleteTodo
);

module.exports = router;
