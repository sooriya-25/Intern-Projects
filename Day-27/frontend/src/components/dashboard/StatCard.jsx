import { Card } from "antd";

const StatCard = ({ title, value, color, icon, subtitle }) => {
  return (
    <Card className="h-full rounded-[1.5rem] border border-slate-200 bg-slate-50 shadow-sm p-5">
      <div className="flex h-full flex-col justify-between gap-6">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                {title}
              </p>
              <h2 className="text-3xl font-semibold mt-4" style={{ color }}>
                {value}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              {icon}
            </div>
          </div>

          {subtitle && (
            <p className="mt-4 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3 text-xs text-slate-500">
          <span>Updated</span>
          <span className="font-semibold text-slate-700">Today</span>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;