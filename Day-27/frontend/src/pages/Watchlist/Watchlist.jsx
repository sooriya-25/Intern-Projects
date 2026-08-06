import { Button, Card, Empty, Spin, Tag, message } from "antd";

import { DeleteOutlined } from "@ant-design/icons";

import { useWatchlist } from "../../hooks/useWatchlist";
import { useRemoveWatchlist } from "../../hooks/useRemoveWatchlist";
import usePermission from "../../hooks/usePermission";

const Watchlist = () => {
  const { data, isLoading } = useWatchlist();

  const { mutate } = useRemoveWatchlist();

  const { hasPermission } = usePermission();

  const canRemove = hasPermission("WATCHLIST", "delete");

  const handleRemove = (stockId) => {
    mutate(stockId, {
      onSuccess: (response) => {
        message.success(response.message);
      },

      onError: (error) => {
        message.error(error.response?.data?.message || "Failed");
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

  const watchlistItems = Array.isArray(data)
    ? data.filter((item) => item?.stock)
    : [];

  if (!watchlistItems.length) {
    return <Empty description="No Stocks In Watchlist" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {watchlistItems.map((item) => {
        const stock = item.stock;

        return (
          <Card
            key={item._id}
            hoverable
            className="rounded-[1.5rem] border border-slate-200 shadow-sm transition-all duration-300"
            headStyle={{ paddingTop: 20 }}
            bodyStyle={{ padding: 24 }}
            title={
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-1">
                  {stock?.company || "Unknown Company"}
                </h2>
                <p className="text-gray-500 mb-0">{stock?.symbol || "--"}</p>
              </div>
            }
            extra={
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600 mb-0">
                  ${stock.currentPrice}
                </p>
              </div>
            }
          >
            <div className="flex flex-wrap gap-2 mb-3">
              <Tag color="blue">{stock?.sector || "Unknown"}</Tag>
              <Tag color="green">{stock?.exchange || "--"}</Tag>
            </div>

            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
              {stock?.description || "No description available."}
            </p>

            {canRemove && (
              <Button
                danger
                type="default"
                size="large"
                icon={<DeleteOutlined />}
                className="rounded-full w-full md:w-auto px-6 font-semibold"
                onClick={() => handleRemove(stock._id)}
              >
                Remove
              </Button>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default Watchlist;
