import {
  Avatar,
  Button,
} from "antd";

import {
  BellOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../store/slices/authSlice";
import { toggleTheme } from "../../store/slices/themeSlice";

const Header = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const { theme } = useSelector((state) => state.theme);

  const { user } = useSelector((state) => state.auth);

  const pageTitles = {
    "/": "Dashboard",
    "/stocks": "Stocks",
    "/watchlist": "Watchlist",
    "/users": "Users",
    "/profile": "Profile",
  };

  const title = pageTitles[location.pathname] || "StockPro";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b">

      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      <div className="flex items-center gap-4">

        <Button
          shape="circle"
          icon={<BellOutlined />}
        />

        {/* <Button
          shape="circle"
          onClick={() => dispatch(toggleTheme())}
          icon={
            theme === "light"
              ? <MoonOutlined />
              : <SunOutlined />
          }
        /> */}

        <div className="flex items-center gap-3">

          <Avatar icon={<UserOutlined />} />

          <span>{user?.name}</span>

          <Button
            danger
            onClick={handleLogout}
          >
            Logout
          </Button>

        </div>

      </div>

    </header>
  );
};

export default Header;