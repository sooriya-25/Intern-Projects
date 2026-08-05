import { Button, Empty, Spin, Tag, message } from "antd";

import { DeleteOutlined } from "@ant-design/icons";

import { useWatchlist } from "../../hooks/useWatchlist";
import { useRemoveWatchlist } from "../../hooks/useRemoveWatchlist";

const Watchlist = () => {
  const { data, isLoading } = useWatchlist();

  const { mutate } = useRemoveWatchlist();

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

  if (!data || data.length === 0) {
    return <Empty description="No Stocks In Watchlist" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {data.map((item) => {
        const stock = item.stock;

        return (
          <div
            key={item._id}
            className="rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-5"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {stock.company}
                </h2>

                <p className="text-gray-500">{stock.symbol}</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-blue-600">
                  ${stock.currentPrice}
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Tag color="blue">{stock.sector}</Tag>

              <Tag color="green">{stock.exchange}</Tag>
            </div>

            <p className="text-gray-500 text-sm mt-4 line-clamp-2">
              {stock.description}
            </p>

            <Button
              danger
              size="large"
              block
              icon={<DeleteOutlined />}
              className="mt-5 rounded-lg"
              onClick={() => handleRemove(stock._id)}
            >
              Remove From Watchlist
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default Watchlist;
