import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUserStatus } from "../api/user.api";

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) =>
      updateUserStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};