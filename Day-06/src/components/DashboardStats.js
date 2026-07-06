import { Card, Col, Row, Statistic } from "antd";
import {
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

function DashboardStats({ students }) {
  // Total Students
  const totalStudents = students.length;

  // Present Students
  const presentStudents = students.filter((student) => student.present).length;

  // Absent Students
  const absentStudents = totalStudents - presentStudents;

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 25 }}>
      <Col xs={24} sm={8}>
        <Card>
          <Statistic
            title="Total Students"
            value={totalStudents}
            prefix={<TeamOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={8}>
        <Card>
          <Statistic
            title="Present"
            value={presentStudents}
            valueStyle={{ color: "#3f8600" }}
            prefix={<CheckCircleOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={8}>
        <Card>
          <Statistic
            title="Absent"
            value={absentStudents}
            valueStyle={{ color: "#cf1322" }}
            prefix={<CloseCircleOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
}

export default DashboardStats;
