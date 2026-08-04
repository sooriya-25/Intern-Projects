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
    <Card title="Top Stocks">

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="symbol" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="currentPrice"
            fill="#2563EB"
          />

        </BarChart>

      </ResponsiveContainer>

    </Card>
  );
};

export default TopStocksChart;