import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const normalizeUserData = (userData) => {
  if (!userData) return null;

  if (userData.success && userData.data) {
    return userData.data;
  }

  return userData;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restore user on refresh

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(normalizeUserData(JSON.parse(storedUser)));
    }
  }, []);

  // Login

  const login = (userData) => {
    const normalizedUser = normalizeUserData(userData);

    setUser(normalizedUser);
    localStorage.setItem("user", JSON.stringify(normalizedUser));
  };

  // Logout

  const logout = () => {
    setUser(null);

    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
