import { Input, Tooltip } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

const checkerboardStyle = {
  backgroundImage:
    "linear-gradient(45deg, rgba(15, 23, 42, 0.05) 25%, transparent 25%, transparent 75%, rgba(15, 23, 42, 0.05) 75%, rgba(15, 23, 42, 0.05)), linear-gradient(45deg, rgba(15, 23, 42, 0.05) 25%, transparent 25%, transparent 75%, rgba(15, 23, 42, 0.05) 75%, rgba(15, 23, 42, 0.05))",
  backgroundSize: "16px 16px",
  backgroundPosition: "0 0, 8px 8px",
};

const ImageCaptcha = ({
  challenge,
  loading,
  refreshing,
  answer,
  onAnswerChange,
  onRefresh,
  disabled,
}) => {
  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_auto] items-start w-full">
      <div
        className="rounded-2xl border border-surge-500/20 bg-white/95 p-3 min-h-[90px] flex items-center justify-center overflow-hidden"
        style={checkerboardStyle}
      >
        {loading ? (
          <span className="text-[#5b7b9d] text-sm">Loading…</span>
        ) : (
          <div
            className="w-full max-w-full"
            dangerouslySetInnerHTML={{ __html: challenge?.svg || "" }}
          />
        )}
      </div>

      <Tooltip title="Refresh captcha">
        <button
          type="button"
          onClick={onRefresh}
          disabled={disabled}
          aria-label="Refresh captcha"
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-surge-500/20 bg-ice-50 text-surge-500 hover:bg-surge-500/10 hover:text-surge-600 transition-all duration-200 active:scale-95 disabled:opacity-50"
        >
          <ReloadOutlined spin={refreshing} />
        </button>
      </Tooltip>

      <Input
        value={answer}
        onChange={(event) =>
          onAnswerChange(event.target.value.replace(/[^a-zA-Z0-9]/g, ""))
        }
        placeholder="Enter captcha text"
        disabled={disabled || loading}
        className="!rounded-2xl !bg-white !text-center !font-mono"
        maxLength={10}
      />
    </div>
  );
};

export default ImageCaptcha;
