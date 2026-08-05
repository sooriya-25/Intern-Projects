import { Button, Input, Spin, message, Modal } from "antd";

import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { useSelector } from "react-redux";

import { useStocks } from "../../hooks/useStocks";
import useDebounce from "../../hooks/useDebounce";

import { useAddWatchlist } from "../../hooks/useAddWatchlist";
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
      <div className="mb-6 flex justify-between items-center">
        <Input.Search
          placeholder="Search Company or Symbol..."
          allowClear
          size="large"
          loading={isFetching}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />

        {user?.role === "ADMIN" && (
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
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
