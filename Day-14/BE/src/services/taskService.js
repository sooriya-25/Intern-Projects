const { v4: uuid } = require("uuid");
const {
  readDB,
  writeDB,
} = require("../config/db");

const getTasks = () => {
  const db = readDB();
  return db.tasks;
};

const getTask = (id) => {
  const db = readDB();

  return (
    db.tasks.find(
      (task) => task.id === id
    ) || null
  );
};

const addTask = (taskData) => {
  const db = readDB();

  const newTask = {
    id: uuid(),
    status: "Yet to do",
    userId: taskData.userId || null,
    ...taskData,
  };

  db.tasks.push(newTask);

  writeDB(db);

  return newTask;
};

const editTask = (id, updatedData) => {
  const db = readDB();

  const index = db.tasks.findIndex(
    (task) => task.id === id
  );

  if (index === -1) return null;

  db.tasks[index] = {
    ...db.tasks[index],
    ...updatedData,
  };

  writeDB(db);

  return db.tasks[index];
};

const removeTask = (id) => {
  const db = readDB();

  const index = db.tasks.findIndex(
    (task) => task.id === id
  );

  if (index === -1) return false;

  db.tasks.splice(index, 1);

  writeDB(db);

  return true;
};

module.exports = {
  getTasks,
  getTask,
  addTask,
  editTask,
  removeTask,
};