import { Button, Input, Spin, message, Modal } from "antd";

import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { useSelector } from "react-redux";

import { useStocks } from "../../hooks/useStocks";
import useDebounce from "../../hooks/useDebounce";

import { useAddWatchlist } from "../../hooks/useAddWatchlist";
import { useWatchlist } from "../../hooks/useWatchlist";
import { useCreateStock } from "../../hooks/useCreateStock";
import { useUpdateStock } from "../../hooks/useUpdateStock";
import { useDeleteStock } from "../../hooks/useDeleteStock";

import StockModal from "../../components/stock/StockModal";
import StockCard from "../../components/stock/StockCard";

const Stocks = () => {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedStock, setSelectedStock] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const { mutate: createStock } = useCreateStock();

  const { mutate: updateStock } = useUpdateStock();

  const { mutate: deleteStock } = useDeleteStock();

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
        message.success(response.message);
      },
      onError: (error) => {
        setPendingAdds((p) => p.filter((id) => id !== stockId));
        message.error(error.response?.data?.message || "Failed");
      },
    });
  };

  const handleAdd = () => {
    setSelectedStock(null);

    setModalOpen(true);
  };

  const handleEdit = (stock) => {
    setSelectedStock(stock);

    setModalOpen(true);
  };

  const handleSubmit = (values) => {
    if (selectedStock) {
      updateStock(
        {
          id: selectedStock._id,
          data: values,
        },
        {
          onSuccess: () => {
            message.success("Stock updated successfully");

            setModalOpen(false);
          },
        },
      );

      return;
    }

    createStock(values, {
      onSuccess: () => {
        message.success("Stock created successfully");

        setModalOpen(false);
      },
    });
  };

  const handleDelete = (stock) => {
    Modal.confirm({
      title: "Delete Stock",

      content: `Delete ${stock.company}?`,

      okText: "Delete",

      okButtonProps: {
        danger: true,
      },

      onOk() {
        deleteStock(stock._id, {
          onSuccess: () => {
            message.success("Stock deleted successfully");
          },
        });
      },
    });
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
    <div>
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

        {user?.role === "ADMIN" && (
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
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {stocks.map((stock) => (
            <StockCard
              key={stock._id}
              stock={stock}
              isAdmin={user?.role === "ADMIN"}
              isInWatchlist={watchlistIds.includes(stock._id)}
              isPending={pendingAdds.includes(stock._id)}
              onWatchlist={handleWatchlist}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </InfiniteScroll>
      <StockModal
        open={modalOpen}
        stock={selectedStock}
        loading={false}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Stocks;
