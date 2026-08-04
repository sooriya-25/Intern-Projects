import { Card, Table } from "antd";

const columns = [
  {
    title: "Company",
    dataIndex: "company",
  },
  {
    title: "Symbol",
    dataIndex: "symbol",
  },
  {
    title: "Sector",
    dataIndex: "sector",
  },
  {
    title: "Price",
    dataIndex: "currentPrice",
  },
];

const RecentStocksTable = ({ data }) => {
  return (
    <Card title="Recent Stocks">
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </Card>
  );
};

export default RecentStocksTable;