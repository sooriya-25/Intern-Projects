const { readDB } = require("../config/db");

const loginUser = ({ email, password }) => {
  const db = readDB();

  const user = db.users.find(
    (user) =>
      user.email === email &&
      user.password === password
  );

  if (!user) return null;

  const { password: _, ...userData } = user;

  return userData;
};

const getUserProfile = (id) => {
  const db = readDB();

  return (
    db.users.find(
      (user) => user.id === Number(id)
    ) || null
  );
};

module.exports = {
  loginUser,
  getUserProfile,
};