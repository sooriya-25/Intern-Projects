import { Checkbox, ConfigProvider, Table } from "antd";

import { MODULES, ACTIONS } from "../../constants/modules";

const PermissionMatrix = ({ value = [], onChange }) => {
  const getRow = (moduleKey) =>
    value.find((permission) => permission.module === moduleKey) || {
      module: moduleKey,
      view: false,
      add: false,
      edit: false,
      delete: false,
    };

  const setRow = (moduleKey, nextRow) => {
    const next = MODULES.map((module) =>
      module.key === moduleKey ? nextRow : getRow(module.key),
    );

    onChange(next);
  };

  const handleToggle = (moduleKey, actionKey, checked) => {
    const row = getRow(moduleKey);

    if (actionKey === "view" && !checked) {
      setRow(moduleKey, {
        ...row,
        view: false,
        add: false,
        edit: false,
        delete: false,
      });

      return;
    }

    const nextRow = {
      ...row,
      [actionKey]: checked,
    };

    if (actionKey !== "view" && checked) {
      nextRow.view = true;
    }

    setRow(moduleKey, nextRow);
  };

  const columns = [
    {
      title: <span className="font-semibold text-slate-700">Module</span>,
      dataIndex: "label",
      width: 180,
      render: (label) => (
        <span className="font-medium text-slate-800">{label}</span>
      ),
    },

    ...ACTIONS.map((action) => ({
      title: (
        <span className="font-semibold text-slate-700">{action.label}</span>
      ),
      key: action.key,
      align: "center",

      render: (_, module) => {
        const row = getRow(module.key);

        return (
          <Checkbox
            checked={Boolean(row[action.key])}
            onChange={(e) =>
              handleToggle(module.key, action.key, e.target.checked)
            }
          />
        );
      },
    })),

    {
      title: <span className="font-semibold text-blue-700">All</span>,
      key: "all",
      align: "center",

      render: (_, module) => {
        const row = getRow(module.key);

        const checked = row.view && row.add && row.edit && row.delete;

        const indeterminate = row.view || row.add || row.edit || row.delete;

        return (
          <Checkbox
            checked={checked}
            indeterminate={indeterminate && !checked}
            onChange={(e) => {
              const checked = e.target.checked;

              setRow(module.key, {
                ...row,
                view: checked,
                add: checked,
                edit: checked,
                delete: checked,
              });
            }}
          />
        );
      },
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Checkbox: {
            colorPrimary: "#2563EB",
            colorPrimaryHover: "#1D4ED8",
            colorBorder: "#64748B",
            colorPrimaryBorder: "#475569",
          },
        },
      }}
    >
      <Table
        rowKey="key"
        columns={columns}
        dataSource={MODULES}
        pagination={false}
        bordered
        size="middle"
        rowClassName={(_, index) =>
          index % 2 === 0 ? "bg-white" : "bg-slate-50"
        }
      />
    </ConfigProvider>
  );
};

export default PermissionMatrix;
