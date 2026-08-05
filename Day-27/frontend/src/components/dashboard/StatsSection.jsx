import { Col, Row } from "antd";

import {
  AreaChartOutlined,
  TeamOutlined,
  StarOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";

import StatCard from "./StatCard";

const StatsSection = ({ stats }) => {
  return (
    <Row gutter={[20, 20]}>
      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Total Stocks"
          value={stats.totalStocks}
          subtitle="Tracked stock symbols"
          color="#2563EB"
          icon={<AreaChartOutlined className="text-xl" />}
        />
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Users"
          value={stats.totalUsers}
          subtitle="Active users in system"
          color="#16A34A"
          icon={<TeamOutlined className="text-xl" />}
        />
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Watchlist"
          value={stats.totalWatchlist}
          subtitle="Saved watchlist entries"
          color="#EA580C"
          icon={<StarOutlined className="text-xl" />}
        />
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Market Cap"
          value={`$${(stats.marketCap / 1000000000).toFixed(1)}B`}
          subtitle="Estimated market coverage"
          color="#9333EA"
          icon={<DollarCircleOutlined className="text-xl" />}
        />
      </Col>
    </Row>
  );
};

export default StatsSection;