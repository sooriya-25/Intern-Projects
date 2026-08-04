import { Card, Col, Row } from "antd";

const Dashboard = () => {
  return (
    <Row gutter={[20, 20]}>

      <Col xs={24} md={12} lg={6}>
        <Card title="Total Stocks">
          <h1 className="text-4xl font-bold text-blue-600">
            60
          </h1>
        </Card>
      </Col>

      <Col xs={24} md={12} lg={6}>
        <Card title="Watchlist">
          <h1 className="text-4xl font-bold text-green-600">
            12
          </h1>
        </Card>
      </Col>

      <Col xs={24} md={12} lg={6}>
        <Card title="Users">
          <h1 className="text-4xl font-bold text-purple-600">
            2
          </h1>
        </Card>
      </Col>

      <Col xs={24} md={12} lg={6}>
        <Card title="Market Cap">
          <h1 className="text-3xl font-bold text-red-600">
            $18T
          </h1>
        </Card>
      </Col>

    </Row>
  );
};

export default Dashboard;