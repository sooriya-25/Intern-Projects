import { Card, Col, Row, Typography } from "antd";
import {
  RiseOutlined,
  StarOutlined,
  BellOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import { useInView } from "../../hooks/useInView";

const { Title, Paragraph, Text } = Typography;

const FEATURES = [
  {
    icon: <RiseOutlined />,
    title: "Real-time price feeds",
    desc: "Sub-second quotes across equities, indices, and crypto — no stale ticks.",
    span: "lg:col-span-2",
  },
  {
    icon: <StarOutlined />,
    title: "Smart watchlists",
    desc: "Pin the instruments you're tracking and see them move at a glance.",
    span: "",
  },
  {
    icon: <BellOutlined />,
    title: "Custom alerts",
    desc: "Set a price target and StockPro pings you the moment it's hit.",
    span: "",
  },
  {
    icon: <SafetyCertificateOutlined />,
    title: "Role-based access",
    desc: "Fine-grained permissions so teams see exactly what they should.",
    span: "lg:col-span-2",
  },
  {
    icon: <TeamOutlined />,
    title: "Built for teams",
    desc: "Share dashboards and research across your whole desk.",
    span: "",
  },
  {
    icon: <ThunderboltOutlined />,
    title: "Blazing fast UI",
    desc: "An interface tuned for split-second decisions, not spinners.",
    span: "",
  },
];

const FeatureCard = ({ icon, title, desc, span, delay }) => {
  const { ref, isInView } = useInView({ threshold: 0.15, once: false });

  return (
    <Col ref={ref} xs={24} sm={12} lg={span ? 12 : 8} className={`${span} group relative`}> 
      <Card
        bordered={false}
        className={`overflow-hidden rounded-[1.75rem] border border-surge-500/15 bg-white/90 backdrop-blur-sm p-7 shadow-glow-soft transition-all duration-700 hover:-translate-y-1.5 hover:shadow-[0_28px_68px_rgba(37,99,235,0.18)] hover:border-surge-400/30 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: isInView ? `${delay}ms` : "0ms" }}
      >
        <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-surge-500/5 group-hover:bg-surge-500/10 transition-colors duration-500" />
        <span className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-surge-500/10 to-surge-400/10 text-surge-600 text-xl mb-5 group-hover:scale-110 group-hover:from-surge-500 group-hover:to-surge-400 group-hover:text-white transition-all duration-300">
          {icon}
        </span>
        <Title level={4} className="relative font-display font-semibold text-lg text-ink-900">{title}</Title>
        <Paragraph className="relative mt-2 text-sm text-[#5b7b9d] leading-relaxed">{desc}</Paragraph>
      </Card>
    </Col>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="relative bg-ice-100 py-24 md:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-xl">
          <Text className="text-xs font-semibold tracking-widest uppercase text-surge-600">Platform</Text>
          <Title level={2} className="mt-3 font-display font-bold text-3xl sm:text-4xl text-ink-900 tracking-tight">
            Everything a desk needs, nothing it doesn't
          </Title>
          <Paragraph className="mt-4 text-[#5b7b9d] leading-relaxed">
            StockPro pairs live market data with the workflow tools traders actually reach for — watchlists, alerts, and access control that just works.
          </Paragraph>
        </div>

        <Row gutter={[20, 20]} className="mt-12">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 80} />
          ))}
        </Row>
      </div>
    </section>
  );
};

export default FeaturesSection;
