import { ConfigProvider, Checkbox, Table, Tooltip } from "antd";
import { LockOutlined } from "@ant-design/icons";

import { MODULES, ACTIONS } from "../../constants/modules";

const isActionDisabled = (module, actionKey) =>
  Boolean(module.disabledActions?.includes(actionKey));

// Actions that actually count towards a module's "All" state — locked
// actions are excluded entirely rather than treated as always-false.
const relevantActions = (module) =>
  ACTIONS.filter((action) => !isActionDisabled(module, action.key));

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

  const handleToggle = (module, actionKey, checked) => {
    if (isActionDisabled(module, actionKey)) {
      return;
    }

    const row = getRow(module.key);

    if (actionKey === "view" && !checked) {
      setRow(module.key, {
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

    setRow(module.key, nextRow);
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
        const disabled = isActionDisabled(module, action.key);

        if (disabled) {
          return (
            <Tooltip title={`${action.label} isn't assignable for ${module.label}`}>
              <div className="w-full h-full flex items-center justify-center py-1">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 border border-dashed border-slate-300 text-slate-400 cursor-not-allowed">
                  <LockOutlined style={{ fontSize: 11 }} />
                </span>
              </div>
            </Tooltip>
          );
        }

        return (
          <Checkbox
            checked={Boolean(row[action.key])}
            onChange={(e) =>
              handleToggle(module, action.key, e.target.checked)
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
        const actions = relevantActions(module);

        const checked = actions.every((action) => row[action.key]);
        const indeterminate =
          !checked && actions.some((action) => row[action.key]);

        return (
          <Checkbox
            checked={checked}
            indeterminate={indeterminate}
            onChange={(e) => {
              const checked = e.target.checked;

              const nextRow = { ...row };

              actions.forEach((action) => {
                nextRow[action.key] = checked;
              });

              setRow(module.key, nextRow);
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