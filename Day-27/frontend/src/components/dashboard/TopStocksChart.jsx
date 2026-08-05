import {
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";

import { Card } from "antd";

const TopStocksChart = ({ data }) => {
  return (
    <Card
      title="Top Stocks"
      className="rounded-[1.5rem] border border-slate-200 bg-slate-50 shadow-sm"
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-500">
        <span className="font-medium text-slate-700">Top performing stocks</span>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
          Monthly view
        </span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="symbol" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ borderRadius: 16, borderColor: "#e2e8f0" }} />
          <Bar dataKey="currentPrice" fill="#2563EB" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TopStocksChart;