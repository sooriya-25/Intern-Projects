import { useState } from "react";
import { Input, Popover } from "antd";
import { CheckCircleFilled, CloseCircleFilled, LockOutlined } from "@ant-design/icons";

import { PASSWORD_REQUIREMENTS } from "../../constants/password";

const PasswordChecklist = ({ value = "" }) => (
  <div className="py-1 min-w-[230px]">
    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
      Password must have
    </p>

    <ul className="space-y-1.5">
      {PASSWORD_REQUIREMENTS.map((requirement) => {
        const passed = requirement.test(value);

        return (
          <li
            key={requirement.key}
            className={`flex items-center gap-2 text-sm transition-colors ${
              passed ? "text-green-600" : "text-slate-400"
            }`}
          >
            {passed ? (
              <CheckCircleFilled className="text-green-500" />
            ) : (
              <CloseCircleFilled className="text-slate-300" />
            )}
            <span>{requirement.label}</span>
          </li>
        );
      })}
    </ul>
  </div>
);

// Drop-in replacement for antd's <Input.Password>. Instead of printing
// validation errors under the field, it shows a checklist popover while the
// field is focused, ticking each requirement off live as the user types.
const PasswordInput = ({
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  autoFocus,
  size = "large",
  popoverPlacement = "leftTop",
  ...rest
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  return (
    <Popover
      open={focused}
      placement={popoverPlacement}
      trigger={[]}
      content={<PasswordChecklist value={value || ""} />}
      overlayClassName="password-strength-popover"
    >
      <Input.Password
        {...rest}
        size={size}
        prefix={<LockOutlined className="text-slate-400" />}
        placeholder={placeholder}
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </Popover>
  );
};

export default PasswordInput;
