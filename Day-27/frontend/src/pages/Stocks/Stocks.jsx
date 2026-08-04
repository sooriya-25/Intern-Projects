import { Button, Input, Spin, message } from "antd";
import { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { useStocks } from "../../hooks/useStocks";
import useDebounce from "../../hooks/useDebounce";
import { useAddWatchlist } from "../../hooks/useAddWatchlist";

const Stocks = () => {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useStocks(debouncedSearch);

  const { mutate: addWatchlist } = useAddWatchlist();

  const stocks = useMemo(() => {
    if (!data) return [];

    return data.pages.flatMap((page) => page.stocks);
  }, [data]);

  const handleWatchlist = (stockId) => {
    addWatchlist(stockId, {
      onSuccess: (response) => {
        message.success(response.message);
      },

      onError: (error) => {
        message.error(
          error.response?.data?.message || "Failed"
        );
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <Input
        placeholder="Search Company..."
        className="mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <InfiniteScroll
        dataLength={stocks.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={
          <div className="flex justify-center py-4">
            <Spin />
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {stocks.map((stock) => (
            <div
              key={stock._id}
              className="rounded-lg border bg-white shadow p-5"
            >
              <h2 className="text-xl font-semibold">
                {stock.company}
              </h2>

              <p className="mt-2">
                Symbol : {stock.symbol}
              </p>

              <p>
                Sector : {stock.sector}
              </p>

              <p>
                Exchange : {stock.exchange}
              </p>

              <p className="mt-2 text-blue-600 font-bold text-lg">
                ${stock.currentPrice}
              </p>

              <Button
                type="primary"
                block
                className="mt-4"
                onClick={() => handleWatchlist(stock._id)}
              >
                Add To Watchlist
              </Button>
            </div>
          ))}

        </div>
      </InfiniteScroll>
    </>
  );
};

export default Stocks;