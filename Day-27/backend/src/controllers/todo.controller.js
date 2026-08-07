const todoService = require("../services/todo.service");
const HTTP_STATUS = require("../constants/httpStatus");
const AppError = require("../utils/appError");

const getTodos = async (req, res, next) => {
  try {
    const result = await todoService.getTodos(req.query);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createTodo = async (req, res, next) => {
  try {
    const todo = await todoService.createTodo(req.body, req.user._id);

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const todo = await todoService.updateTodo(req.params.id, req.body);

    if (!todo) {
      return next(new AppError("Todo not found", HTTP_STATUS.NOT_FOUND));
    }

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const todo = await todoService.deleteTodo(req.params.id);

    if (!todo) {
      return next(new AppError("Todo not found", HTTP_STATUS.NOT_FOUND));
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
