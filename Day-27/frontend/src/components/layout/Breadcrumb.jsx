import { Breadcrumb as AntBreadcrumb } from "antd";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";


const LABELS = {

};

const toLabel = (segment) =>
  decodeURIComponent(segment)
    .replace(/-/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());

const isOpaqueId = (segment) => /^[a-f0-9]{20,}$/i.test(segment);

const Breadcrumb = () => {
  const { pathname } = useLocation();

  // Drop the leading "/dashboard" segment - it's represented by the Home crumb.
  const segments = pathname.split("/").filter(Boolean).slice(1);

  const crumbs = [{ path: "/dashboard", label: "Dashboard" }];

  let cumulative = "/dashboard";
  segments.forEach((segment) => {
    cumulative += `/${segment}`;

    if (isOpaqueId(segment)) return;

    crumbs.push({
      path: cumulative,
      label: LABELS[cumulative] || toLabel(segment),
    });
  });

  const items = crumbs.map((crumb, index) => {
    const isLast = index === crumbs.length - 1;
    const isHome = index === 0;

    return {
      title: isLast ? (
        <span className="inline-flex items-center font-semibold text-blue-700">
          {isHome && <HomeOutlined style={{ marginRight: 8 }} />}
          {crumb.label}
        </span>
      ) : (
        <Link
          to={crumb.path}
          className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors"
        >
          {isHome && <HomeOutlined style={{ marginRight: 8 }} />}
          {crumb.label}
        </Link>
      ),
    };
  });

  return (
    <AntBreadcrumb
      items={items}
      separator={<RightOutlined style={{ fontSize: 10 }} className="text-slate-500" />}
      className="mb-2 inline-flex items-center gap-1 rounded-full border-slate-200 px-4 py-1 text-sm backdrop-blur-sm"
    />
  );
};

export default Breadcrumb;