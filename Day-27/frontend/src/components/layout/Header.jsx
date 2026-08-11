import {
  Avatar,
  Button,
} from "antd";

import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../store/slices/authSlice";

const getAvatarUrl = (profileImage) => {
  if (!profileImage) {
    return null;
  }

  if (profileImage.startsWith("http")) {
    return profileImage;
  }

  return `${process.env.REACT_APP_API_URL.replace("/api", "")}${profileImage}`;
};

const Header = ({ collapsed, onToggle }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  console.log("user", user);

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/dashboard/stocks": "Stocks",
    "/dashboard/watchlist": "Watchlist",
    "/dashboard/users": "Users",
    "/dashboard/profile": "Profile",
  };

  const title = pageTitles[location.pathname] || "StockPro";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between h-20 px-6 bg-[#eff8ff]/95 border-b border-[#d8e7f8] shadow-sm backdrop-blur-sm">

      <div className="flex items-center gap-4">
        <Button
          type="text"
          shape="circle"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          className="text-blue-700 hover:bg-[#d8e7f8]"
        />

        <h2 className="text-2xl font-semibold leading-tight text-blue-900" style={{ letterSpacing: '-0.03em' }}>
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

          <Avatar
            size={40}
            src={getAvatarUrl(user?.profileImage)}
            className="bg-slate-100 text-slate-700"
            icon={<UserOutlined />}
          />

          <div className="min-w-[160px]">
            <p className="text-sm font-semibold text-slate-900 leading-none">{user?.name}</p>
            <p className="text-xs text-slate-500">{user?.role?.name}</p>
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