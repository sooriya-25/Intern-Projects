import { useEffect, useState } from "react";

const STORAGE_KEY = "kanban-theme";

function useTheme() {
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? true;
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(darkMode)
    );

    document.body.style.background = darkMode
      ? "#20212C"
      : "#F5F7FB";

    document.body.style.transition = "0.3s";
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return {
    darkMode,
    toggleTheme,
    setDarkMode,
  };
}

export default useTheme;