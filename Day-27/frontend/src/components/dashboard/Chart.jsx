import {
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";

const Chart = ({ data, height = 260 }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        margin={{
          top: 40,
          right: 40,
          left: 30,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

        <XAxis dataKey="symbol" stroke="#94a3b8" />

        <YAxis stroke="#94a3b8" />

        <Tooltip
          contentStyle={{
            borderRadius: 16,
            borderColor: "#e2e8f0",
          }}
          cursor={{
            fill: "#BFDBFE",
            fillOpacity: 0.25,
          }}
        />

        <Bar
          dataKey="currentPrice"
          fill="#2563EB"
          radius={[10, 10, 0, 0]}
          activeBar={{
            fill: "#1D4ED8",
          }}
          animationDuration={900}
          animationEasing="ease-out"
          style={{ outline: "none" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
