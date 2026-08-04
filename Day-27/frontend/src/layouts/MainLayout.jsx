import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const MainLayout = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;