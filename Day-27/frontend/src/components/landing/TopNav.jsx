import { useEffect, useState } from "react";
import { Button, Drawer } from "antd";
import { MenuOutlined, RiseOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NAV_LINKS = [
  { label: "Markets", href: "#ticker" },
  { label: "Platform", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Insights", href: "#subscribe" },
];

const TopNav = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    setDrawerOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ice-50/85 backdrop-blur-xl border-b border-surge-500/10 shadow-[0_8px_30px_rgba(15,32,68,0.06)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-[76px] flex items-center justify-between">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 group"
        >
          <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-surge-400 to-surge-600 shadow-glow-blue transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <RiseOutlined className="text-white text-base" />
          </span>
          <span className="font-display font-bold text-xl tracking-tight text-ink-900">
            Stock<span className="text-surge-500">Pro</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="px-4 py-2 text-sm font-medium text-[#4d6d92] hover:text-ink-900 rounded-full hover:bg-surge-500/8 transition-all duration-200"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <Button
              type="primary"
              className="!rounded-full !h-[42px] !px-6 !bg-surge-500 !border-surge-500 hover:!bg-surge-600"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
          ) : (
            <>
              <Button
                ghost
                className="!rounded-full !h-[42px] !px-5 !border-surge-500/30 !text-ink-900 hover:!border-surge-400 hover:!text-surge-500"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
              <Button
                type="primary"
                className="!rounded-full !h-[42px] !px-6 !bg-surge-500 !border-surge-500 hover:!bg-surge-600 shadow-glow-blue"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className="md:hidden text-ink-900 text-xl p-2"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          <MenuOutlined />
        </button>
      </nav>

      <Drawer
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        closeIcon={<CloseOutlined className="text-ink-900" />}
        width={280}
        styles={{
          content: { background: "#F4FAFF" },
          header: { background: "#F4FAFF", borderBottom: "1px solid rgba(37,99,235,0.1)" },
          body: { padding: "1.5rem" },
        }}
        title={
          <span className="font-display font-bold text-ink-900">
            Stock<span className="text-surge-500">Pro</span>
          </span>
        }
      >
        <div className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-left px-4 py-3 rounded-xl text-[#4d6d92] hover:text-ink-900 hover:bg-surge-500/8 font-medium transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-surge-500/10">
          {isAuthenticated ? (
            <Button
              type="primary"
              block
              className="!rounded-full !h-11 !bg-surge-500 !border-surge-500"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
          ) : (
            <>
              <Button
                ghost
                block
                className="!rounded-full !h-11 !border-surge-500/30 !text-ink-900"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
              <Button
                type="primary"
                block
                className="!rounded-full !h-11 !bg-surge-500 !border-surge-500"
                onClick={() => navigate("/login")}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Drawer>
    </header>
  );
};

export default TopNav;
