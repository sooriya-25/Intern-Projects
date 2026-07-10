import { create } from "zustand";
import { persist } from "zustand/middleware";

import { loginApi } from "../api/authApi";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,

      loading: false,

      error: null,

      login: async ({ email, password }) => {
        try {
          set({
            loading: true,
            error: null,
          });

          const user = await loginApi(
            email,
            password
          );

          set({
            user,
            loading: false,
          });
        } catch (error) {
          set({
            loading: false,
            error: error.message,
          });
        }
      },

      logout: () =>
        set({
          user: null,
          error: null,
        }),
    }),

    {
      name: "auth-storage",

      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;