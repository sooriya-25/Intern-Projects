import { Col, Row } from "antd";

import StatCard from "./StatCard";

const StatsSection = ({ stats }) => {
  return (
    <Row gutter={[20, 20]}>
      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Total Stocks"
          value={stats.totalStocks}
          color="#2563EB"
        />
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Users"
          value={stats.totalUsers}
          color="#16A34A"
        />
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Watchlist"
          value={stats.totalWatchlist}
          color="#EA580C"
        />
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Market Cap"
          value={`$${(stats.marketCap / 1000000000).toFixed(1)}B`}
          color="#9333EA"
        />
      </Col>
    </Row>
  );
};

export default StatsSection;