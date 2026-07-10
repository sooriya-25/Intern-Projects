import { Card, Col, Row, Statistic } from "antd";

import Loader from "../components/Loader/Loader";
import { useTasks } from "../hooks/useTasks";

console.log("console.log from Dashboard");

const Dashboard = () => {
  const { tasksQuery } = useTasks();

  if (tasksQuery.isLoading) {
    return <Loader />;
  }

  if (tasksQuery.isError) {
    return <h2>Something went wrong!</h2>;
  }

  const tasks = tasksQuery.data || [];

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  return (
    <Row gutter={20}>
      <Col span={8}>
        <Card>
          <Statistic title="Total Tasks" value={tasks.length} />
        </Card>
      </Col>

      <Col span={8}>
        <Card>
          <Statistic title="Completed" value={completed} />
        </Card>
      </Col>

      <Col span={8}>
        <Card>
          <Statistic title="Pending" value={pending} />
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;