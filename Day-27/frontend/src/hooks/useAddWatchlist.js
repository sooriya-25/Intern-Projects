import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addToWatchlist } from "../api/watchlist.api";

export const useAddWatchlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToWatchlist,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["watchlist"],
      });
    },
  });
};