import { Col, Row, Spin } from "antd";

import StatsSection from "../../components/dashboard/StatsSection";
import SectorChart from "../../components/dashboard/SectorChart";
import TopStocksChart from "../../components/dashboard/TopStocksChart";
import RecentStocksTable from "../../components/dashboard/RecentStocksTable";

import { useDashboard } from "../../hooks/useDashboard";

const Dashboard = () => {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <StatsSection stats={data.stats} />

      <Row gutter={[20, 20]}>

        <Col span={12}>
          <SectorChart data={data.sectors} />
        </Col>

        <Col span={12}>
          <TopStocksChart data={data.topStocks} />
        </Col>

      </Row>

      <RecentStocksTable
        data={data.recentStocks}
      />

    </div>
  );
};

export default Dashboard;