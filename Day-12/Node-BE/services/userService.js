const https = require("https");
const fs = require("fs");
const path = require("path");

const USERS_FILE_PATH = path.join(__dirname, "../data/users.json");

function readUsersStore() {
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

function writeUsersStore(users) {
  fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2));
}

function fetchUsersFromPlaceholder() {
  return new Promise((resolve, reject) => {
    const req = https.get(
      "https://jsonplaceholder.typicode.com/users",
      {
        headers: {
          Accept: "application/json",
        },
      },
      (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            const parsed = JSON.parse(data);

            resolve(
              parsed.map((user) => ({
                ...user,
                id: String(user.id),
              }))
            );
          } catch (error) {
            reject(error);
          }
        });
      }
    );

    req.on("error", reject);
  });
}

async function getAllUsers() {
  const users = await fetchUsersFromPlaceholder();
  writeUsersStore(users);
  return users;
}

function createUser(userData) {
  const users = readUsersStore();
  const newUser = {
    id: String(Date.now()),
    ...userData,
  };

  users.push(newUser);
  writeUsersStore(users);
  return newUser;
}

function updateUser(id, updates) {
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

function deleteUser(id) {
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
