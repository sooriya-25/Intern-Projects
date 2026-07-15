const https = require("https");
const fs = require("fs");
const path = require("path");

const USERS_FILE_PATH = path.join(__dirname, "../data/users.json");

const readUsersStore = () => {
  if (!fs.existsSync(USERS_FILE_PATH)) {
    return [];
  }

  try {
    const data = fs.readFileSync(USERS_FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

const writeUsersStore = (users) => {
  fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2));
};

const fetchUsersFromPlaceholder = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  const users = await response.json();

  return users.map((user) => ({
    ...user,
    id: String(user.id),
  }));
}

const getAllUsers = async () => {
  const users = await fetchUsersFromPlaceholder();
  writeUsersStore(users);
  return users;
};

const createUser = (userData) => {
  const users = readUsersStore();
  const newUser = {
    id: String(Date.now()),
    ...userData,
  };

  users.push(newUser);
  writeUsersStore(users);
  return newUser;
}

const updateUser = (id, updates) => {
  const users = readUsersStore();
  const index = users.findIndex((user) => String(user.id) === String(id));

  if (index === -1) {
    return null;
  }

  const updatedUser = {
    ...users[index],
    ...updates,
    id: String(id),
  };

  users[index] = updatedUser;
  writeUsersStore(users);
  return updatedUser;
}

const deleteUser = (id) => {
  const users = readUsersStore();
  const filteredUsers = users.filter((user) => String(user.id) !== String(id));

  if (filteredUsers.length === users.length) {
    return false;
  }

  writeUsersStore(filteredUsers);
  return true;
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
