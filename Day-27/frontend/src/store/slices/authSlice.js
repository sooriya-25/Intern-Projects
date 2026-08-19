import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  // Why the user was logged out, so redirects (ProtectedRoute, axios
  // interceptor) can agree on where to send them instead of racing each
  // other. null = normal/manual logout -> /login.
  // "accessDenied" -> /access-denied. "expired" -> /login.
  logoutReason: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.logoutReason = null;
    },

    updateUser: (state, action) => {
      state.user = action.payload;
    },

    updateProfileImage: (state, action) => {
      if (state.user) {
        state.user.profileImage = action.payload;
      }
    },

    logout: (state, action) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.logoutReason = action?.payload?.reason ?? null;
    },
  },
});

export const {
  loginSuccess,
  updateUser,
  updateProfileImage,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
