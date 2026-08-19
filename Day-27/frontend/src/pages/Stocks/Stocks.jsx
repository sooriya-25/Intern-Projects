import { Button, Input, Spin } from "antd";

import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { useStocks } from "../../hooks/useStocks";
import useDebounce from "../../hooks/useDebounce";

import { useAddWatchlist } from "../../hooks/useAddWatchlist";
import { useWatchlist } from "../../hooks/useWatchlist";
import usePermission from "../../hooks/usePermission";

import StockCard from "../../components/stock/StockCard";
import { useToast } from "../../components/Toast/ToastProvider";

const Stocks = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [search, setSearch] = useState("");

  const { hasPermission } = usePermission();

  const canAddStock = hasPermission("STOCKS", "add");
  const canAddWatchlist = hasPermission("WATCHLIST", "add");

  const SCROLLABLE_TARGET = "page-content-main";

  const debouncedSearch = useDebounce(search);

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } =
    useStocks(debouncedSearch);

  const { mutate: addWatchlist } = useAddWatchlist();
  const { data: watchlistData } = useWatchlist();
  const [pendingAdds, setPendingAdds] = useState([]);

  const watchlistIds = useMemo(() => {
    if (!watchlistData) return [];
    return watchlistData.map((item) => item.stock?._id || item._id);
  }, [watchlistData]);

  const stocks = useMemo(() => {
    if (!data) return [];

    return data.pages.flatMap((page) => page.stocks);
  }, [data]);

  const handleWatchlist = (stockId) => {
    // optimistically mark as pending to avoid duplicate calls
    setPendingAdds((p) => [...p, stockId]);

    addWatchlist(stockId, {
      onSuccess: (response) => {
        setPendingAdds((p) => p.filter((id) => id !== stockId));
        toast.success(response.message);
      },
      onError: (error) => {
        setPendingAdds((p) => p.filter((id) => id !== stockId));
        toast.error(error.response?.data?.message || "Failed");
      },
    });
  };

  const handleAdd = () => {
    navigate("/dashboard/stocks/add");
  };

  const isInitialLoading = isLoading && !data;

  if (isInitialLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
        <div className="flex flex-col gap-5 p-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-800 mb-0">
            Stock Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View all available stocks.
          </p>
        </div>
      <div className="mb-6 flex justify-between items-center gap-4">
        <div className="relative w-full max-w-md">
          <Input
            placeholder="Search Company or Symbol..."
            allowClear
            size="large"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            suffix={isFetching ? <Spin size="small" /> : <SearchOutlined className="text-slate-400" />}
            className="w-full rounded-full overflow-hidden shadow-sm stocks-search"
            style={{ height: 44 }}
          />
        </div>

        {canAddStock && (
          <Button
            type="primary"
            className="rounded-full"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Add Stock
          </Button>
        )}
      </div>

      <InfiniteScroll
        dataLength={stocks.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={
          <div className="flex justify-center py-4">
            <Spin />
          </div>
        }
        scrollableTarget={SCROLLABLE_TARGET}
        window={false}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {stocks.map((stock) => (
            <StockCard
              key={stock._id}
              stock={stock}
              canAddWatchlist={canAddWatchlist}
              isInWatchlist={watchlistIds.includes(stock._id)}
              isPending={pendingAdds.includes(stock._id)}
              onWatchlist={handleWatchlist}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Stocks;