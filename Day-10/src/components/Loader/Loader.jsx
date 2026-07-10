import { Flex, Spin } from "antd";

const Loader = () => {
  return (
    <Flex
      justify="center"
      align="center"
      style={{
        minHeight: "100vh",
      }}
    >
      <Spin size="large" />
    </Flex>
  );
};

export default Loader;