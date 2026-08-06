const Todo = require("../models/Todo");
const getPagination = require("../utils/pagination");

const getTodos = async ({
  page = 1,
  limit = 10,
  status = "",
  sort = "createdAt",
  order = "desc",
} = {}) => {
  const query = {};

  if (status) {
    query.status = status;
  }

  const { page: parsedPage, limit: parsedLimit, skip } = getPagination(
    page,
    limit
  );

  const todos = await Todo.find(query)
    .populate("createdBy", "name email")
    .sort({ [sort]: order === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(parsedLimit);

  const total = await Todo.countDocuments(query);

  return {
    todos,
    page: parsedPage,
    limit: parsedLimit,
    total,
    hasMore: parsedPage * parsedLimit < total,
  };
};

const createTodo = async (todoData, userId) => {
  return await Todo.create({
    ...todoData,
    createdBy: userId,
  });
};

const updateTodo = async (id, todoData) => {
  return await Todo.findByIdAndUpdate(id, todoData, {
    new: true,
    runValidators: true,
  }).populate("createdBy", "name email");
};

const deleteTodo = async (id) => {
  return await Todo.findByIdAndDelete(id);
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
