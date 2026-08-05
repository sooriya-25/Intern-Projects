import { Button, Tag } from "antd";

import {
  DeleteOutlined,
  EditOutlined,
  StarOutlined,
} from "@ant-design/icons";

const StockCard = ({ stock, isAdmin, isInWatchlist, isPending, onWatchlist, onEdit, onDelete }) => {
  let buttonLabel;
  if (isPending) buttonLabel = "Adding...";
  else if (isInWatchlist) buttonLabel = "Added to Watchlist";
  else buttonLabel = "Add to Watchlist";
  return (
    <div className="h-full flex flex-col justify-between rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300 p-6">

      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg md:text-xl font-semibold text-slate-900 truncate">
              {stock.company}
            </h3>
            <p className="text-sm text-slate-500 mt-1">{stock.symbol}</p>
          </div>

          <div className="text-right">
            <div className="inline-flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-bold text-indigo-600">${stock.currentPrice}</span>
              <span className="text-xs text-slate-400">USD</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Tag color="#2563EB" className="text-sm font-medium">{stock.sector}</Tag>
          <Tag color="#16A34A" className="text-sm font-medium">{stock.exchange}</Tag>
        </div>

        <p className="text-sm text-slate-600 mt-4 line-clamp-2 leading-relaxed">{stock.description}</p>
      </div>

      <div className="mt-6 grid gap-3">
        <Button
          type="default"
          size="large"
          block
          icon={<StarOutlined className={isInWatchlist || isPending ? "text-slate-700" : "text-indigo-600"} />}
          className={`rounded-full h-11 px-6 font-semibold ${isInWatchlist || isPending ? "border border-slate-200 bg-slate-100 text-slate-700" : "bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 shadow-md"}`}
          onClick={() => !isInWatchlist && !isPending && onWatchlist(stock._id)}
          disabled={isInWatchlist || isPending}
        >
          {buttonLabel}
        </Button>

        {isAdmin && (
          <div className="flex gap-3">
            <Button
              className="flex-1 rounded-full h-10 font-medium"
              icon={<EditOutlined />}
              onClick={() => onEdit(stock)}
            >
              Edit
            </Button>

            <Button
              danger
              className="flex-1 rounded-full h-10 font-medium"
              icon={<DeleteOutlined />}
              onClick={() => onDelete(stock)}
            >
              Delete
            </Button>
          </div>
        )}
      </div>

    </div>
  );
};

export default StockCard;