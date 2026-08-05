import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateStock } from "../api/stock.api";

export const useUpdateStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStock,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stocks"],
      });
    },
  });
};