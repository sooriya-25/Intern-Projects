import { Card, Button } from "antd";
import { ExpandOutlined } from "@ant-design/icons";

import Chart from "./Chart";

const TopStocksChart = ({
  data,
  onExpand,
}) => {
  return (
    <Card
      title="Top Stocks"
      extra={
        <Button
          type="text"
          icon={<ExpandOutlined />}
          onClick={onExpand}
        >
          Expand
        </Button>
      }
      className="rounded-[1.5rem] border border-slate-200 bg-slate-50 shadow-sm"
    >
      <div className="mb-4 flex justify-between items-center text-sm text-slate-500">
        <span className="font-medium text-slate-700">
          Top Performing Stocks
        </span>

        <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
          Monthly View
        </span>
      </div>

      <Chart
        data={data}
        height={260}
      />
    </Card>
  );
};

export default TopStocksChart;