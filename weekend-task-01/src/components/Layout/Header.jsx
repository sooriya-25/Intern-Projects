import { Layout, Typography, Button, Dropdown, Grid, Switch } from "antd";
import {
  Add,
  MoreVert,
  Edit,
  Delete,
  MenuOutlined,
  LightModeOutlined,
  DarkModeOutlined,
} from "@mui/icons-material";

const { Header: AntHeader } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

function Header({
  boardName,
  onAddTask,
  onEditBoard,
  onDeleteBoard,
  onMenuClick,
  collapsed,
  darkMode,
  onThemeChange,
}) {
  const screens = useBreakpoint();

  const menuItems = [
    {
      key: "edit",
      icon: <Edit fontSize="small" />,
      label: "Edit Board",
    },
    {
      key: "delete",
      icon: <Delete fontSize="small" />,
      label: "Delete Board",
      danger: true,
    },
  ];

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case "edit":
        onEditBoard?.();
        break;

      case "delete":
        onDeleteBoard?.();
        break;

      default:
        break;
    }
  };

  return (
    <AntHeader
      style={{
        background: "#2B2C37",
        height: 96,
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #3E3F4E",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {collapsed && (
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: "#FFFFFF", fontSize: 22 }} />}
            onClick={onMenuClick}
            style={{ minWidth: 40, height: 40, borderRadius: 8 }}
          />
        )}

        <Title
          level={screens.md ? 2 : 3}
          style={{
            margin: 0,
            color: "#FFFFFF",
            fontWeight: 700,
          }}
        >
          {boardName || "No Board"}
        </Title>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {collapsed && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 10px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
            }}
          >
            <LightModeOutlined style={{ color: "#828FA3", fontSize: 16 }} />
            <Switch
              checked={darkMode}
              onChange={onThemeChange}
              size="small"
            />
            <DarkModeOutlined style={{ color: "#828FA3", fontSize: 16 }} />
          </div>
        )}

        <Button
          type="primary"
          icon={<Add />}
          size="large"
          disabled={!boardName}
          onClick={onAddTask}
          style={{
            background: "#635FC7",
            borderColor: "#635FC7",
            borderRadius: 24,
            height: 48,
            paddingInline: screens.md ? 24 : 14,
            fontWeight: 700,
          }}
        >
          {screens.md ? "Add New Task" : null}
        </Button>

        <Dropdown
          trigger={["click"]}
          placement="bottomRight"
          menu={{
            items: menuItems,
            onClick: handleMenuClick,
          }}
        >
          <span>
            <Button
              type="text"
              icon={
                <MoreVert
                  style={{
                    color: "#828FA3",
                    fontSize: 28,
                  }}
                />
              }
            />
          </span>
        </Dropdown>
      </div>
    </AntHeader>
  );
}

export default Header;