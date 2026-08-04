import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeFromWatchlist } from "../api/watchlist.api";

export const useRemoveWatchlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromWatchlist,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["watchlist"],
      });
    },
  });
};