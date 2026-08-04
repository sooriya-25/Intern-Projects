import { Card } from "antd";

const StatCard = ({ title, value, color }) => {
  return (
    <Card className="shadow-sm rounded-lg">
      <p className="text-gray-500">{title}</p>

      <h2
        className="text-3xl font-bold mt-2"
        style={{ color }}
      >
        {value}
      </h2>
    </Card>
  );
};

export default StatCard;