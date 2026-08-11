import { Card, Col, Row, Typography } from "antd";
import { UserAddOutlined, AimOutlined, RiseOutlined } from "@ant-design/icons";

import { useInView } from "../../hooks/useInView";

const { Title, Paragraph, Text } = Typography;

const STEPS = [
  {
    icon: <UserAddOutlined />,
    title: "Create your account",
    desc: "Sign up in seconds — no card required to start exploring live markets.",
  },
  {
    icon: <AimOutlined />,
    title: "Build your watchlist",
    desc: "Pin the tickers you actually care about and set price alerts on each one.",
  },
  {
    icon: <RiseOutlined />,
    title: "Trade with clarity",
    desc: "Act on real-time signal instead of noise, from one calm, focused screen.",
  },
];

const StepCard = ({ step, index }) => {
  const { ref, isInView } = useInView({ threshold: 0.2, once: false });

  return (
    <Col xs={24} md={8} ref={ref}>
      <Card
        bordered={false}
        className={`relative h-full rounded-[1.75rem] border border-surge-500/15 bg-white/90 backdrop-blur-sm p-8 shadow-glow-soft transition-all duration-700 hover:-translate-y-1.5 hover:border-surge-400/30 hover:shadow-[0_28px_68px_rgba(37,99,235,0.16)] ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: isInView ? `${index * 120}ms` : "0ms" }}
      >
        <Text className="font-display font-bold text-4xl text-surge-500/15">0{index + 1}</Text>
        <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-surge-500/10 to-surge-400/10 text-surge-600 text-xl mt-2 mb-5">
          {step.icon}
        </span>
        <Title level={4} className="font-display font-semibold text-lg text-ink-900">{step.title}</Title>
        <Paragraph className="mt-2 text-sm text-[#5b7b9d] leading-relaxed">{step.desc}</Paragraph>
      </Card>
    </Col>
  );
};

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="relative bg-ice-50 py-24 md:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-lg mx-auto mb-14">
          <Text className="text-xs font-semibold tracking-widest uppercase text-surge-500">Getting started</Text>
          <Title level={2} className="mt-3 font-display font-bold text-3xl sm:text-4xl text-ink-900 tracking-tight">
            From sign-up to signal in three steps
          </Title>
        </div>

        <Row gutter={[20, 20]}>
          {STEPS.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} />
          ))}
        </Row>
      </div>
    </section>
  );
};

export default HowItWorksSection;
