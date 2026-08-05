import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const MainLayout = () => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={theme}>
      <div className="flex h-screen bg-gray-100 dark:bg-slate-950">

        <Sidebar />

        <div className="flex flex-col flex-1 overflow-hidden">

          <Header />

          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>

        </div>

      </div>
    </div>
  );
};

export default MainLayout;