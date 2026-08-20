import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { deleteAccount } from "../api/profile.api";
import { logout } from "../store/slices/authSlice";
import { redirectTo } from "../utils/navigation";

// Self-service account deletion (soft delete on the backend). On success
// we log the user out locally and send them to the landing page — the
// account no longer authenticates, so there's nothing left to show them.
export const useDeleteAccount = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: deleteAccount,

    onSuccess: () => {
      dispatch(logout());
      redirectTo("/", { replace: true });
    },
  });
};
