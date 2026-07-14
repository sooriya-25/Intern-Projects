const { readDB } = require("../config/db");

function loginUser({ email, password }) {
  const db = readDB();

  const user = db.users.find(
    (user) =>
      user.email === email &&
      user.password === password
  );

  if (!user) return null;

  const { password: _, ...userData } = user;

  return userData;
}

function getUserProfile(id) {
  const db = readDB();

  return (
    db.users.find(
      (user) => user.id === String(id)
    ) || null
  );
}

module.exports = {
  loginUser,
  getUserProfile,
};
