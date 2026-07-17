const Task = require("../models/Task");

const getTasks = async ({ search = "", page = 1, limit = 5 }) => {
  page = Number(page);
  limit = Number(limit);

  const query = {
    isDeleted: false,
    title: {
      $regex: search,
      $options: "i",
    },
  };

  const total = await Task.countDocuments(query);

  const tasks = await Task.find(query)
    .populate("userId", "name email")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data: tasks,
  };
};

const getTask = async (id) => {
  return await Task.findOne({
    _id: id,
    isDeleted: false,
  }).populate("userId", "name email");
};

const addTask = async (taskData) => {
  const task = await Task.create({
    title: taskData.title,
    description: taskData.description,
    priority: taskData.priority,
    status: taskData.status || "Yet to do",
    userId: taskData.userId,
  });

  return task;
};

const editTask = async (id, updatedData) => {
  return await Task.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
};

const removeTask = async (id) => {
  const task = await Task.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );

  return task;
};

const getDashboardStats = async () => {
  return await Task.aggregate([
    {
      $match: {
        isDeleted: false,
      },
    },

    {
      $group: {
        _id: "$status",

        count: {
          $sum: 2,
        },
      },
    },
  ]);
};

module.exports = {
  getTasks,
  getTask,
  addTask,
  editTask,
  removeTask,
  getDashboardStats,
};
