import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteStock } from "../api/stock.api";

export const useDeleteStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStock,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stocks"],
      });
    },
  });
};