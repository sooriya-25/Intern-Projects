import { StockOutlined } from "@ant-design/icons";

const Logo = () => {
  return (
    <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200 dark:border-slate-700">
      <StockOutlined className="text-2xl text-blue-600" />

      <div>
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
          StockPro
        </h2>

        <p className="text-xs text-gray-500">
          Management System
        </p>
      </div>
    </div>
  );
};

export default Logo;