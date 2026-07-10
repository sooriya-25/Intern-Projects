import { Avatar, Card, Descriptions, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title } = Typography;
console.log("console.log from Profile component")

const Profile = () => {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <Avatar
          size={80}
          icon={<UserOutlined />}
        />

        <Title level={3} style={{ margin: 0 }}>
          Admin User
        </Title>
      </div>

      <Descriptions bordered column={1}>
        <Descriptions.Item label="Name">
          Admin User
        </Descriptions.Item>

        <Descriptions.Item label="Email">
          admin@gmail.com
        </Descriptions.Item>

        <Descriptions.Item label="Department">
          Frontend
        </Descriptions.Item>

        <Descriptions.Item label="Role">
          Software Developer
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default Profile;