import axios from "axios";
import { notification } from "antd";

import { store } from "../store/store";
import { logout } from "../store/slices/authSlice";
import { redirectTo } from "../utils/navigation";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let sessionExpiredToastShown = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios response error:", error.response || error);
    const { status, data } = error.response || {};
    const { isAuthenticated } = store.getState().auth;
    // Only react to auth failures for someone who *was* logged in. Login /
    // register endpoints also return 401/403 for bad credentials etc, and
    // those should be left alone to show their own inline form errors.
    
    if (!isAuthenticated) {
      console.log("User is not authenticated, ignoring auth error handling");
      return Promise.reject(error);
    }

    const isStalePermission =
      status === 403 && data?.success === false && data?.message === "Access denied";

    const isExpiredOrInvalidToken = status === 401;

    if (isStalePermission) {
      // Store the reason on the auth slice FIRST: ProtectedRoute reads it
      // and redirects to /access-denied itself the moment isAuthenticated
      // flips to false. The imperative redirectTo below is just a fast
      // path for cases outside a ProtectedRoute (e.g. a modal) — both are
      // now pointed at the same destination, so there's no race between
      // them regardless of render timing.
      store.dispatch(logout({ reason: "accessDenied" }));
      redirectTo("/access-denied", { replace: true });

      return Promise.reject(error);
    }

    if (isExpiredOrInvalidToken) {
      console.warn("Session expired or invalid token, logging out user");
      store.dispatch(logout({ reason: "expired" }));

      if (!sessionExpiredToastShown) {
        sessionExpiredToastShown = true;

        notification.warning({
          message: "Session expired",
          description: "Your session has expired. Please log in again.",
          placement: "topRight",
          duration: 5,
          className: "app-toast app-toast--warning",
          onClose: () => {
            sessionExpiredToastShown = false;
          },
        });
      }

      redirectTo("/login", { replace: true });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
