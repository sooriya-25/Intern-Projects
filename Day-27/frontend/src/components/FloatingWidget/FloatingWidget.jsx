import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Collapse, Progress } from "antd";
import {
  CheckCircleFilled,
  CloseOutlined,
  DownOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";

import { useFloatingWidget } from "../../context/FloatingWidgetContext";

const UploadItem = ({ upload }) => {
  const { fileName, progress, status, error } = upload;

  return (
    <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-700">{fileName}</p>

        {status === "error" ? (
          <p className="text-xs text-red-500">{error || "Upload failed"}</p>
        ) : (
          <Progress
            percent={progress}
            size="small"
            status={status === "completed" ? "success" : "active"}
            showInfo={false}
          />
        )}
      </div>

      <div className="flex w-9 items-center justify-end">
        {status === "completed" && <CheckCircleFilled className="text-green-500" />}
        {status === "error" && <ExclamationCircleFilled className="text-red-500" />}
        {status === "uploading" && (
          <span className="text-xs tabular-nums text-slate-400">{progress}%</span>
        )}
      </div>
    </div>
  );
};

const FloatingWidget = () => {
  const { uploads, expanded, visible, toggleWidget, cancelWidget } = useFloatingWidget();
  const navigate = useNavigate();
  const location = useLocation();

  const [shouldRender, setShouldRender] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  const authRoutes = ["/login", "/signup", "/forgot-password"];
  const isAuthRoute = authRoutes.includes(location.pathname);

  useEffect(() => {
    if (isAuthRoute) {
      cancelWidget();
    }
  }, [isAuthRoute, cancelWidget]);

  const lastUploadsRef = useRef(uploads);
  if (uploads.length > 0) {
    lastUploadsRef.current = uploads;
  }

  useEffect(() => {
    if (isAuthRoute) {
      setShouldRender(false);
      setIsEntering(false);
      return;
    }

    if (visible) {
      setShouldRender(true);
      const frame = requestAnimationFrame(() => setIsEntering(true));
      return () => cancelAnimationFrame(frame);
    }

    setIsEntering(false);
    const timeout = setTimeout(() => setShouldRender(false), 250);
    return () => clearTimeout(timeout);
  }, [isAuthRoute, visible]);

  if (isAuthRoute || !shouldRender) return null;

  const displayUploads = uploads.length > 0 ? uploads : lastUploadsRef.current;
  const activeCount = displayUploads.filter(
    (upload) => upload.status === "uploading"
  ).length;

  const headerLabel =
    activeCount > 0
      ? `Uploading ${activeCount} file${activeCount > 1 ? "s" : ""}`
      : `${displayUploads.length} upload${displayUploads.length > 1 ? "s" : ""} complete`;

  const iconButtonClass =
    "flex h-6 w-6 items-center justify-center rounded-full text-white/0 opacity-0 " +
    "transition-all duration-200 group-hover:text-white group-hover:opacity-100 hover:!bg-white/15";

  return (
    <div
      className={`group fixed bottom-5 right-5 z-[9999] w-80 transition-all duration-300 ease-out ${
        isEntering ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <Card
        size="small"
        className="!rounded-lg cursor-pointer overflow-hidden shadow-2xl [&_.ant-card-body]:p-0 [&_.ant-card-head]:min-h-0 [&_.ant-card-head]:border-0 [&_.ant-card-head]:bg-blue-600 [&_.ant-card-head]:px-4 [&_.ant-card-head]:py-3 [&_.ant-card-head-title]:text-white"
        onClick={() => navigate("/dashboard/profile")}
        title={headerLabel}
        extra={
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={toggleWidget}
              title={expanded ? "Collapse" : "Expand"}
              className={iconButtonClass}
            >
              <DownOutlined
                className={`text-xs transition-transform duration-300 ease-in-out ${
                  expanded ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            <button
              type="button"
              onClick={cancelWidget}
              title="Cancel"
              className={iconButtonClass}
            >
              <CloseOutlined className="text-xs" />
            </button>
          </div>
        }
      >
        <Collapse
          ghost
          activeKey={expanded ? ["uploads"] : []}
          className="[&_.ant-collapse-item]:border-0 [&_.ant-collapse-content-box]:!p-0 [&_.ant-collapse-header]:!hidden"
          items={[
            {
              key: "uploads",
              children: (
                <div
                  className="max-h-72 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {displayUploads.map((upload) => (
                    <UploadItem key={upload.id} upload={upload} />
                  ))}
                </div>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default FloatingWidget;