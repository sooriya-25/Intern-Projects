import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateRole } from "../api/role.api";

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRole,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
  });
};
