import { Col, Row } from "antd";

import StatCard from "./StatCard";

const StatsSection = () => {
  return (
    <Row gutter={[20, 20]}>

      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Total Stocks"
          value="60"
          color="#2563EB"
        />
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Watchlist"
          value="12"
          color="#16A34A"
        />
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Users"
          value="2"
          color="#9333EA"
        />
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Market Cap"
          value="$18T"
          color="#DC2626"
        />
      </Col>

    </Row>
  );
};

export default StatsSection;