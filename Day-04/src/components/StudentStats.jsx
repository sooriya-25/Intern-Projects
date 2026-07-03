import { Row, Col, Card, Statistic } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import CalculateOutlinedIcon from "@mui/icons-material/Calculate";

function StudentStats({ totalStudents, averageAge }) {
  return (
    <Row gutter={24} style={{ marginBottom: 25 }}>
      <Col xs={24} md={12}>
        <Card>
          <Statistic
            title="Total Students"
            value={totalStudents}
            prefix={<TeamOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} md={12}>
        <Card>
          <Statistic
            title="Average Age"
            value={averageAge}
            prefix={<CalculateOutlinedIcon />}
            precision={1}
          />
        </Card>
      </Col>
    </Row>
  );
}

export default StudentStats;