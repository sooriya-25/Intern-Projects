import { Card, Col, Row, Typography } from "antd";
import { useInView } from "../../hooks/useInView";
import CountUp from "./CountUp";

const { Title, Paragraph, Text } = Typography;

const STATS = [
  { end: 12400, decimals: 0, suffix: "+", label: "Instruments tracked live" },
  { end: 99.98, decimals: 2, suffix: "%", label: "Platform uptime" },
  { end: 40, decimals: 0, suffix: "ms", label: "Average data refresh" },
  { end: 8.6, decimals: 1, suffix: "K", label: "Active traders onboard" },
];

const StatsSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.4, once: false });

  return (
    <section id="stats" className="relative bg-ice-50 py-24 md:py-28 overflow-hidden scroll-mt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(37,99,235,0.08),transparent_55%)]" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-lg mx-auto mb-14">
          <Text className="text-xs font-semibold tracking-widest uppercase text-surge-500">By the numbers</Text>
          <Title level={2} className="mt-3 font-display font-bold text-3xl sm:text-4xl text-ink-900 tracking-tight">
            Trusted for the moments that matter
          </Title>
        </div>

        <Row gutter={[16, 16]}>
          {STATS.map((s, i) => (
            <Col xs={24} sm={12} lg={6} key={s.label}>
              <Card
                bordered={false}
                className={`text-center rounded-2xl border border-surge-500/15 bg-white/90 backdrop-blur-sm py-8 px-4 shadow-glow-soft transition-all duration-700 hover:-translate-y-1 hover:border-surge-400/30 hover:shadow-[0_22px_50px_rgba(37,99,235,0.14)] ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: isInView ? `${i * 90}ms` : "0ms" }}
              >
                <Text className="font-display font-bold text-3xl sm:text-4xl text-surge-500">
                  <CountUp end={s.end} decimals={s.decimals} suffix={s.suffix} start={isInView} />
                </Text>
                <Paragraph className="mt-2 text-sm text-[#5b7b9d]">{s.label}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default StatsSection;
