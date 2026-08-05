import { Button, Tag } from "antd";

import {
  DeleteOutlined,
  EditOutlined,
  StarOutlined,
} from "@ant-design/icons";

const StockCard = ({
  stock,
  isAdmin,
  onWatchlist,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-5">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            {stock.company}
          </h2>

          <p className="text-gray-500">
            {stock.symbol}
          </p>

        </div>

        <div className="text-right">

          <p className="text-2xl font-bold text-blue-600">
            ${stock.currentPrice}
          </p>

        </div>

      </div>

      <div className="flex gap-2 mt-4">

        <Tag color="blue">
          {stock.sector}
        </Tag>

        <Tag color="green">
          {stock.exchange}
        </Tag>

      </div>

      <p className="text-gray-500 text-sm mt-4 line-clamp-2">
        {stock.description}
      </p>

      <Button
        type="primary"
        size="large"
        block
        icon={<StarOutlined />}
        className="mt-5 rounded-lg"
        onClick={() => onWatchlist(stock._id)}
      >
        Add To Watchlist
      </Button>

      {isAdmin && (
        <div className="flex gap-3 mt-3">

          <Button
            className="flex-1"
            icon={<EditOutlined />}
            onClick={() => onEdit(stock)}
          >
            Edit
          </Button>

          <Button
            danger
            className="flex-1"
            icon={<DeleteOutlined />}
            onClick={() => onDelete(stock)}
          >
            Delete
          </Button>

        </div>
      )}

    </div>
  );
};

export default StockCard;