import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const persistAuth = localStorage.getItem('persist:auth');
    if (persistAuth) {
      const { token } = JSON.parse(persistAuth);
      // Clean token string quotes if persisted as JSON string
      const cleanToken = token ? token.replace(/^"(.*)"$/, '$1') : null;
      if (cleanToken) {
        config.headers.Authorization = `Bearer ${cleanToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;