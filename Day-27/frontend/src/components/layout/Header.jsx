import { Avatar, Button } from "antd";
import {
  BellOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/slices/themeSlice";

const Header = () => {
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.theme);

  const { user } = useSelector((state) => state.auth);

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b dark:bg-slate-900 dark:border-slate-700">

      <h2 className="text-xl font-semibold dark:text-white">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">

        <Button
          shape="circle"
          icon={<BellOutlined />}
        />

        <Button
          shape="circle"
          onClick={() => dispatch(toggleTheme())}
          icon={
            theme === "light"
              ? <MoonOutlined />
              : <SunOutlined />
          }
        />

        <div className="flex items-center gap-2">

          <Avatar
            icon={<UserOutlined />}
          />

          <span className="font-medium dark:text-white">
            {user?.name || "Guest"}
          </span>

        </div>

      </div>

    </header>
  );
};

export default Header;