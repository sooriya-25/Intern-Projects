import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const MainLayout = () => {
  const { theme } = useSelector((state) => state.theme);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={theme}>
      <div className="flex h-screen page-background">

        <Sidebar collapsed={collapsed} />

        <div className="flex flex-col flex-1 overflow-hidden">

          <Header collapsed={collapsed} onToggle={() => setCollapsed((prev) => !prev)} />

          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>

        </div>

      </div>
    </div>
  );
};

export default MainLayout;