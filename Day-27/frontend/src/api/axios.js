import axios from "axios";
import { notification } from "antd";

import { store } from "../store/store";
import { logout } from "../store/slices/authSlice";

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

let accessDeniedToastShown = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, data } = error.response || {};
    const { isAuthenticated } = store.getState().auth;

    const isStalePermission =
      status === 403 && data?.success === false && data?.message === "Access denied";

    if (isStalePermission && isAuthenticated) {
      store.dispatch(logout());

      if (!accessDeniedToastShown) {
        accessDeniedToastShown = true;

        notification.warning({
          message: "Session ended",
          description:
            "Your permissions were updated by an admin. Please log in again.",
          placement: "topRight",
          duration: 5,
          className: "app-toast app-toast--warning",
          onClose: () => {
            accessDeniedToastShown = false;
          },
        });
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;