import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUserRole } from "../api/user.api";

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }) => updateUserRole({ id, role }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
