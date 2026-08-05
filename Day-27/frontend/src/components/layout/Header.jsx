import {
  Avatar,
  Button,
} from "antd";

import {
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../store/slices/authSlice";

const Header = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

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
    <header className="flex items-center justify-between h-20 px-6 bg-white/95 border-b border-slate-200 shadow-sm backdrop-blur-sm">

      <div>
        <h2 className="text-2xl font-semibold leading-tight text-slate-900" style={{ letterSpacing: '-0.03em' }}>
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-4">

        <Button
          shape="circle"
          className="bg-slate-100 border-slate-200 text-slate-600"
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

        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">

          <Avatar className="bg-slate-100 text-slate-700" icon={<UserOutlined />} />

          <div className="min-w-[160px]">
            <p className="text-sm font-semibold text-slate-900 leading-none">{user?.name}</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>

          <Button
            type="default"
            onClick={handleLogout}
            className="rounded-full px-5 h-11 font-semibold"
          >
            Logout
          </Button>

        </div>

      </div>

    </header>
  );
};

export default Header;