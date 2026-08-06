import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTodo } from "../api/todo.api";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};
