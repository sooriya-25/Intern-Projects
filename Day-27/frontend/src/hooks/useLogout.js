import { useMutation } from "@tanstack/react-query";

import { logout as logoutApi } from "../api/auth.api";

// Revokes the current session on the server (see auth.service.js#logout)
// so it stops showing up in Active Sessions on other devices. Callers
// should clear local/Redux auth state in onSettled, not onSuccess — the
// user should still get logged out locally even if this request fails
// (e.g. offline), same as the app already does for expired tokens.
export const useLogout = () => {
  return useMutation({
    mutationFn: logoutApi,
  });
};
