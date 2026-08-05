import { Card, Table } from "antd";

const columns = [
  {
    title: <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">Company</span>,
    dataIndex: "company",
    render: (value) => <span className="font-semibold text-slate-900">{value}</span>,
  },
  {
    title: <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">Symbol</span>,
    dataIndex: "symbol",
    render: (value) => <span className="text-indigo-600 font-medium">{value}</span>,
  },
  {
    title: <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">Sector</span>,
    dataIndex: "sector",
    render: (value) => <span className="text-emerald-600">{value}</span>,
  },
  {
    title: <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">Price</span>,
    dataIndex: "currentPrice",
    render: (value) => (
      <span className="font-semibold text-amber-600">${value.toLocaleString()}</span>
    ),
  },
];

const RecentStocksTable = ({ data }) => {
  return (
    <Card
      title="Recent Stocks"
      className="rounded-[1.5rem] border border-slate-200 bg-slate-50 shadow-sm"
      headStyle={{ borderBottom: "none", paddingBottom: 0, color: "#1e3a8a" }}
    >
      <div className="mb-4 flex items-center justify-between gap-2 text-sm text-slate-500">
        <div>Latest stocks added to the system.</div>
        <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600">
          Updated
        </div>
      </div>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={data}
        pagination={false}
        size="middle"
        rowClassName={() => "hover:bg-slate-50 transition-colors duration-200"}
        className="bg-transparent"
      />
    </Card>
  );
};

export default RecentStocksTable;