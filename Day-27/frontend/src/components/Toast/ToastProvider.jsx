import { createContext, useContext, useMemo } from "react";
import { notification } from "antd";

const ToastContext = createContext(null);

const buildConfig = (type, content, options) => {
  const styles = {
    success: {
      background: "#f0fff4",
      border: "1px solid #b7ebc6",
      color: "#166534",
    },
    error: {
      background: "#fff1f2",
      border: "1px solid #fecdd3",
      color: "#991b1b",
    },
    warning: {
      background: "#fffbeb",
      border: "1px solid #fde68a",
      color: "#92400e",
    },
    info: {
      background: "#eff6ff",
      border: "1px solid #bfdbfe",
      color: "#1e3a8a",
    },
  };

  return {
    message: content,
    placement: "topRight",
    duration: options?.duration ?? 4.5,
    style: {
      ...styles[type],
      borderRadius: 10,
      padding: "14px 16px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
      fontSize: 14,
    },
  };
};

export const ToastProvider = ({ children }) => {
  const api = useMemo(
    () => ({
      success: (content, options) =>
        notification.success(buildConfig("success", content, options)),

      error: (content, options) =>
        notification.error(buildConfig("error", content, options)),

      warning: (content, options) =>
        notification.warning(buildConfig("warning", content, options)),

      info: (content, options) =>
        notification.info(buildConfig("info", content, options)),

      dismiss: (id) => notification.close(id),
    }),
    [],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return ctx;
};