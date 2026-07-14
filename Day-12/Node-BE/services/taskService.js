const { readDB, writeDB } = require("../config/db");

function getAllTasks() {
  const db = readDB();
  return db.tasks;
}

function getTaskById(id) {
  const db = readDB();
  const tasks = db.tasks;

  return tasks.find(
    (task) => task.id === String(id)
  );
}

function createTask(task) {
  const db = readDB();
  const tasks = db.tasks;

  const newTask = {
    id: String(
      tasks.length > 0
        ? Math.max(...tasks.map(t => Number(t.id))) + 1
        : 1
    ),
    title: task.title,
    priority: task.priority,
    createdAt:
      task.createdAt ||
      new Date().toISOString(),
  };

  tasks.push(newTask);
  db.tasks = tasks;

  writeDB(db);

  return newTask;
}

function updateTask(id, updatedTask) {
  const db = readDB();
  const tasks = db.tasks;

  const index = tasks.findIndex(
    (task) => task.id === String(id)
  );

  if (index === -1) {
    return null;
  }

  tasks[index] = {
    ...tasks[index],
    ...updatedTask,
  };

  db.tasks = tasks;
  writeDB(db);

  return tasks[index];
}

function deleteTask(id) {
  const db = readDB();
  const tasks = db.tasks;

  const index = tasks.findIndex(
    (task) => task.id === String(id)
  );

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);
  db.tasks = tasks;

  writeDB(db);

  return true;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};