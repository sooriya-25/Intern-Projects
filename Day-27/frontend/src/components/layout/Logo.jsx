import { StockOutlined } from "@ant-design/icons";

const Logo = ({ collapsed }) => {
  return (
    <div className={`flex items-center gap-3 px-6 py-5 border-b border-[#d8e7f8] ${collapsed ? "justify-center" : "justify-start"}`}>
      <StockOutlined className="text-2xl text-blue-600" />

      {!collapsed && (
        <div>
          <h2 className="text-lg font-bold text-blue-900">
            StockPro
          </h2>

          <p className="text-xs text-sky-700">
            Management System
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;