import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

import { Card } from "antd";

const colors = [
  "#2563EB",
  "#16A34A",
  "#DC2626",
  "#9333EA",
  "#EA580C",
];

const SectorChart = ({ data }) => {
  return (
    <Card
      title="Sector Distribution"
      className="rounded-[1.5rem] border border-slate-200 bg-slate-50 shadow-sm"
    >
      <div className="mb-4 text-sm text-slate-500">
        Market exposure by sector.
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="sector"
            outerRadius={98}
            innerRadius={62}
            paddingAngle={4}
            labelLine={false}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: 16, borderColor: "#e2e8f0" }} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {data.map((item, index) => {
          const total = data.reduce((sum, row) => sum + row.count, 0);
          const percentage = total ? ((item.count / total) * 100).toFixed(1) : 0;

          return (
            <div
              key={item.sector}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
            >
              <span
                className="h-3.5 w-3.5 rounded-full"
                style={{ background: colors[index % colors.length] }}
              />
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.sector}</p>
                <p className="text-xs text-slate-500">
                  {percentage}% • {item.count} stocks
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default SectorChart;