import { createContext, useCallback, useContext, useMemo, useState } from "react";

const FloatingWidgetContext = createContext(null);

let uploadIdCounter = 0;

export const FloatingWidgetProvider = ({ children }) => {
  const [uploads, setUploads] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [visible, setVisible] = useState(false);

  const addUpload = useCallback((fileName) => {
    const id = ++uploadIdCounter;

    setUploads((prev) => [
      ...prev,
      { id, fileName, progress: 0, status: "uploading" },
    ]);
    setVisible(true);
    setExpanded(true);

    return id;
  }, []);

  const updateProgress = useCallback((id, progress) => {
    setUploads((prev) =>
      prev.map((upload) =>
        upload.id === id ? { ...upload, progress } : upload
      )
    );
  }, []);

  const completeUpload = useCallback((id) => {
    setUploads((prev) =>
      prev.map((upload) =>
        upload.id === id
          ? { ...upload, progress: 100, status: "completed" }
          : upload
      )
    );
  }, []);

  const failUpload = useCallback((id, errorMessage) => {
    setUploads((prev) =>
      prev.map((upload) =>
        upload.id === id
          ? { ...upload, status: "error", error: errorMessage }
          : upload
      )
    );
  }, []);


  const toggleWidget = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const cancelWidget = useCallback(() => {
    setVisible(false);
    setUploads([]);
  }, []);

  const value = useMemo(
    () => ({
      uploads,
      expanded,
      visible,
      addUpload,
      updateProgress,
      completeUpload,
      failUpload,
      toggleWidget,
      cancelWidget,
    }),
    [
      uploads,
      expanded,
      visible,
      addUpload,
      updateProgress,
      completeUpload,
      failUpload,
      toggleWidget,
      cancelWidget,
    ]
  );

  return (
    <FloatingWidgetContext.Provider value={value}>
      {children}
    </FloatingWidgetContext.Provider>
  );
};

export const useFloatingWidget = () => {
  const ctx = useContext(FloatingWidgetContext);

  if (!ctx) {
    throw new Error(
      "useFloatingWidget must be used within a FloatingWidgetProvider"
    );
  }

  return ctx;
};
