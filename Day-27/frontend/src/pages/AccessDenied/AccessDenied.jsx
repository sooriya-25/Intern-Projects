import { Button } from "antd";
import { LockOutlined, LoginOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

// Landed on whenever the API rejects a request with 403 "Access denied"
// while the user still thinks they're logged in — i.e. an admin changed
// their role/permissions since their last login. See api/axios.js, which
// logs the user out and redirects here instead of just showing a toast.
const AccessDenied = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#eaf4ff] px-5 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-8 sm:p-10 text-center">
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center">
          <LockOutlined className="text-3xl text-rose-500" />
        </div>

        <h1 className="font-display text-2xl font-bold text-ink-900 mb-2">
          Access Denied
        </h1>

        <p className="text-slate-500 leading-relaxed mb-1">
          An admin has updated your account permissions, so your current
          session is no longer valid.
        </p>
        <p className="text-slate-500 leading-relaxed mb-8">
          Please log in again to continue with your updated access.
        </p>

        <Link to="/login">
          <Button
            type="primary"
            size="large"
            icon={<LoginOutlined />}
            block
            className="rounded-xl h-12"
          >
            Go to Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AccessDenied;
