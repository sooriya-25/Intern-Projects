import { useInfiniteQuery } from "@tanstack/react-query";

import { getStocks } from "../api/stock.api";

export const useStocks = (search) => {
  return useInfiniteQuery({
    queryKey: ["stocks", search],

    queryFn: ({ pageParam }) =>
      getStocks({
        pageParam,
        search,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
  });
};