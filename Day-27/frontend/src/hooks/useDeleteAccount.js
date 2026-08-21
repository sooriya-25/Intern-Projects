import { useMutation } from "@tanstack/react-query";

import { deleteAccount } from "../api/profile.api";

// Self-service account deletion (hard delete on the backend — the
// account is permanently removed and cannot be recovered).
//
// Deliberately has no onSuccess side effects (logout/redirect) here —
// those are driven by the confirm modal in Profile.jsx so the UI can
// close/animate the modal first and only then navigate away, instead of
// the navigation yanking the modal out of the tree mid-animation.
export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: deleteAccount,
  });
};
