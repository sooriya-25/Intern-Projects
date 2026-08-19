import { Button, Card, Tag } from "antd";

import { StarOutlined } from "@ant-design/icons";

const StockCard = ({
  stock,
  canAddWatchlist,
  isInWatchlist,
  isPending,
  onWatchlist,
}) => {
  const buttonLabel = isPending
    ? "Adding..."
    : isInWatchlist
    ? "Added to Watchlist"
    : "Add to Watchlist";

  const actionButtonClass = "rounded-full h-11 px-6 font-semibold";

  return (
    <Card
      hoverable
      className="h-full rounded-2xl border border-slate-200 shadow-sm"
      headStyle={{ paddingTop: 20 }}
      bodyStyle={{ padding: 24 }}
      title={
        <div className="min-w-0">
          <h3 className="text-lg md:text-xl font-semibold text-slate-900 truncate mb-1">
            {stock.company}
          </h3>
          <p className="text-sm text-slate-500">{stock.symbol}</p>
        </div>
      }
      extra={
        <div className="text-right">
          <div className="text-2xl md:text-3xl font-bold text-indigo-600">
            ${stock.currentPrice}
          </div>
          <div className="text-xs text-slate-400">USD</div>
        </div>
      }
    >
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Tag color="#2563EB" className="text-sm font-medium">{stock.sector}</Tag>
          <Tag color="#16A34A" className="text-sm font-medium">{stock.exchange}</Tag>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-0">{stock.description}</p>
      </div>

      {canAddWatchlist && (
        <div className="mt-4 grid gap-2">
          <Button
            type={isInWatchlist || isPending ? "default" : "primary"}
            size="large"
            block
            icon={<StarOutlined />}
            className={actionButtonClass}
            onClick={() => !isInWatchlist && !isPending && onWatchlist(stock._id)}
            disabled={isInWatchlist || isPending}
          >
            {buttonLabel}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default StockCard;