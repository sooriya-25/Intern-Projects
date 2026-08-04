import { useQuery } from "@tanstack/react-query";

import { getWatchlist } from "../api/watchlist.api";

export const useWatchlist = () => {
  return useQuery({
    queryKey: ["watchlist"],
    queryFn: getWatchlist,
  });
};