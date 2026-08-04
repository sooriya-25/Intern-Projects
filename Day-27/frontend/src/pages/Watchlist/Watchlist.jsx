import { Button, Card, Empty, Spin, message } from "antd";

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

  if (!data || data.length === 0) {
    return (
      <Empty description="No Stocks In Watchlist" />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

      {data.map((item) => (
        <Card key={item._id}>

          <h2 className="text-xl font-semibold">
            {item.stock.company}
          </h2>

          <p className="mt-2">
            Symbol : {item.stock.symbol}
          </p>

          <p>
            Sector : {item.stock.sector}
          </p>

          <p className="text-blue-600 font-bold mt-2">
            ${item.stock.currentPrice}
          </p>

          <Button
            danger
            block
            className="mt-4"
            onClick={() => handleRemove(item.stock._id)}
          >
            Remove
          </Button>

        </Card>
      ))}

    </div>
  );
};

export default Watchlist;