import { Card, Col, Row, Spin } from "antd";

import { useDashboard } from "../../hooks/useDashboard";

import StatsSection from "../../components/dashboard/StatsSection";
import SectorChart from "../../components/dashboard/SectorChart";
import TopStocksChart from "../../components/dashboard/TopStocksChart";
import RecentStocksTable from "../../components/dashboard/RecentStocksTable";

const Dashboard = () => {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <StatsSection stats={data.stats} />

      <Row gutter={[20, 20]}>
        <Col xs={24} lg={12}>
          <SectorChart data={data.sectors} />
        </Col>

        <Col xs={24} lg={12}>
          <div className="space-y-6">
            <TopStocksChart data={data.topStocks} />

            <Card className="rounded-[1.5rem] border border-slate-200 bg-slate-50 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Snapshot
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Quick view of core dashboard metrics.
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                  Real-time overview
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.24em] text-sky-700">
                    Active Users
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">
                    {data.stats.totalUsers}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    People currently engaging with your platform.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.24em] text-orange-600">
                    Watchlist Items
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">
                    {data.stats.totalWatchlist}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Stocks currently saved for monitoring.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.24em] text-violet-700">
                    Total Stocks
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">
                    {data.stats.totalStocks}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Number of stock listings available.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.24em] text-emerald-700">
                    Top Sectors
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">
                    {data.sectors.length}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Number of leading sectors in the current view.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Col>
      </Row>

      <RecentStocksTable
        data={data.recentStocks}
      />
    </div>
  );
};

export default Dashboard;