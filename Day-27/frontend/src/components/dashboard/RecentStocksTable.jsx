import { useState } from "react";

import { Card, Table, Tag } from "antd";
import { RightOutlined, DownOutlined } from "@ant-design/icons";

const RecentStocksTable = ({ data }) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const columns = [
    {
      title: (
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">
          Company
        </span>
      ),
      dataIndex: "company",
      render: (value, record) => {
        const expanded = expandedRowKeys.includes(record._id);

        return (
          <div
            className="flex items-center gap-2 cursor-pointer font-semibold text-blue-600 hover:text-blue-700"
            onClick={() => setExpandedRowKeys(expanded ? [] : [record._id])}
          >
            {expanded ? (
              <DownOutlined className="text-xs" />
            ) : (
              <RightOutlined className="text-xs" />
            )}

            {value}
          </div>
        );
      },
    },
    {
      title: (
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">
          Symbol
        </span>
      ),
      dataIndex: "symbol",
      render: (value) => (
        <span className="font-medium text-indigo-600">{value}</span>
      ),
    },
    {
      title: (
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">
          Sector
        </span>
      ),
      dataIndex: "sector",
      render: (value) => <Tag color="green">{value}</Tag>,
    },
    {
      title: (
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">
          Price
        </span>
      ),
      dataIndex: "currentPrice",
      render: (value) => (
        <span className="font-semibold text-amber-600">
          ${value.toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <Card
      title="Recent Stocks"
      className="rounded-[1.5rem] border border-[#d8e7f8] bg-[#eef6ff] shadow-sm"
      headStyle={{
        borderBottom: "none",
        paddingBottom: 0,
        color: "#1e3a8a",
      }}
    >
      <div className="mb-4 flex items-center justify-between gap-2 text-sm text-[#5b7b9d]">
        <div>Latest stocks added to the system.</div>

        <div className="rounded-full border border-[#d8e7f8] bg-[#eff8ff] px-3 py-1 text-[#386fc1]">
          Updated
        </div>
      </div>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
        }}
        scroll={{
          y: 360,
        }}
        size="middle"
        className="recent-stock-table bg-transparent"
        expandable={{
          showExpandColumn: false,

          expandedRowKeys,

          onExpandedRowsChange: (keys) => {
            setExpandedRowKeys(keys.slice(-1));
          },

          expandedRowRender: (record) => (
            <div className="px-6 py-3">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-4 text-sm">
                <div>
                  <span className="text-slate-500">Exchange</span>
                  <p className="font-medium text-slate-800">
                    {record.exchange}
                  </p>
                </div>

                <div>
                  <span className="text-slate-500">Currency</span>
                  <p className="font-medium text-slate-800">
                    {record.currency}
                  </p>
                </div>

                <div>
                  <span className="text-slate-500">Market Cap</span>
                  <p className="font-medium text-slate-800">
                    ${record.marketCap.toLocaleString()}
                  </p>
                </div>

                <div>
                  <span className="text-slate-500">Status</span>
                  <p
                    className={`font-medium ${
                      record.isActive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {record.isActive ? "Active" : "Inactive"}
                  </p>
                </div>

                <div className="col-span-2">
                  <span className="text-slate-500">Description</span>
                  <p className="font-medium text-slate-800">
                    {record.description || "-"}
                  </p>
                </div>
              </div>
            </div>
          ),
        }}
      />
    </Card>
  );
};

export default RecentStocksTable;
