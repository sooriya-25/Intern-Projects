import { createContext, useContext, useMemo } from "react";
import { notification } from "antd";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const api = useMemo(
    () => ({
      success: (content, options) =>
        notification.success({
          message: content,
          placement: "topRight",
          duration: options?.duration ?? 4.5,
        }),
      error: (content, options) =>
        notification.error({
          message: content,
          placement: "topRight",
          duration: options?.duration ?? 4.5,
        }),
      warning: (content, options) =>
        notification.warning({
          message: content,
          placement: "topRight",
          duration: options?.duration ?? 4.5,
        }),
      info: (content, options) =>
        notification.info({
          message: content,
          placement: "topRight",
          duration: options?.duration ?? 4.5,
        }),
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
