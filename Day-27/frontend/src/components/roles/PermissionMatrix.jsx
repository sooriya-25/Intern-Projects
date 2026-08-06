import { Checkbox, Table } from "antd";

import { MODULES, ACTIONS } from "../../constants/modules";

// value: array of { module, view, add, edit, delete }
// onChange: (nextValue) => void
//
// Dependency rule enforced here (mirrored defensively on the backend in
// role.service.js's normalizePermissions): checking Add/Edit/Delete
// auto-checks View. Unchecking View clears Add/Edit/Delete, since none
// of those make sense without view access.
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
      module.key === moduleKey ? nextRow : getRow(module.key)
    );

    onChange(next);
  };

  const handleToggle = (moduleKey, actionKey, checked) => {
    const row = getRow(moduleKey);

    if (actionKey === "view" && !checked) {
      // Unchecking view clears everything else on this row
      setRow(moduleKey, {
        ...row,
        view: false,
        add: false,
        edit: false,
        delete: false,
      });
      return;
    }

    const nextRow = { ...row, [actionKey]: checked };

    // Add/Edit/Delete implies View
    if (actionKey !== "view" && checked) {
      nextRow.view = true;
    }

    setRow(moduleKey, nextRow);
  };

  const columns = [
    {
      title: "Module",
      dataIndex: "label",
      width: 160,
      render: (label) => <span className="font-medium text-slate-700">{label}</span>,
    },
    ...ACTIONS.map((action) => ({
      title: action.label,
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
  ];

  return (
    <Table
      rowKey="key"
      pagination={false}
      columns={columns}
      dataSource={MODULES}
      size="middle"
      className="permission-matrix"
    />
  );
};

export default PermissionMatrix;
