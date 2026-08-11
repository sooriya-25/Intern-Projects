import { Button, Card, Col, Layout, Row, Space, Typography } from "antd";
import { ArrowRightOutlined, ThunderboltFilled, LineChartOutlined, DollarCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useInView } from "../../hooks/useInView";

const { Title, Paragraph, Text } = Typography;

const CHART_PATH =
  "M0,150 L40,138 L80,152 L120,110 L160,128 L200,95 L240,105 L280,68 L320,82 L360,48 L400,58 L440,25 L480,40 L520,15 L560,30 L600,8";

const HeroSection = () => {
  const navigate = useNavigate();
  const { ref, isInView } = useInView({ threshold: 0.25, once: false });

  return (
    <Layout.Content ref={ref} className="relative pt-40 pb-28 md:pt-48 md:pb-36 overflow-hidden bg-gradient-to-b from-ice-100 via-ice-50 to-ice-50">
      <div className="pointer-events-none absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-surge-500/20 blur-[110px] animate-blobSpin" />
      <div className="pointer-events-none absolute top-40 -right-20 w-[380px] h-[380px] rounded-full bg-surge-400/15 blur-[100px] animate-blobSpin [animation-delay:-6s]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.08),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={12}>
            <Space direction="vertical" size="large" className="w-full">
              <div
                className={`${isInView ? "opacity-100 animate-fadeInUp" : "opacity-0"} inline-flex items-center gap-2 rounded-full border border-surge-400/25 bg-surge-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-surge-600 uppercase`}
                style={{ animationDelay: "0.05s", animationDuration: "1.2s" }}
              >
                <ThunderboltFilled className="text-[10px]" />
                Live market intelligence
              </div>

              <Title
                level={1}
                className={`${isInView ? "opacity-100 animate-fadeInUp" : "opacity-0"} mt-6 font-display font-bold text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] text-ink-900 tracking-tight`}
                style={{ animationDelay: "0.15s", animationDuration: "1.3s" }}
              >
                Read the market
                <br />
                before it <span className="relative inline-block text-surge-500">moves.</span>
              </Title>

              <Paragraph
                className={`${isInView ? "opacity-100 animate-fadeInUp" : "opacity-0"} mt-6 text-base sm:text-lg text-[#4d6d92] max-w-lg leading-relaxed`}
                style={{ animationDelay: "0.25s", animationDuration: "1.4s" }}
              >
                StockPro streams real-time prices, curated watchlists, and clean portfolio tools into one ice-calm dashboard — built for traders who'd rather act on signal than noise.
              </Paragraph>

              <Space
                size="middle"
                wrap
                className={`${isInView ? "opacity-100 animate-fadeInUp" : "opacity-0"} mt-9`}
                style={{ animationDelay: "0.35s", animationDuration: "1.4s" }}
              >
                <Button
                  type="primary"
                  size="large"
                  onClick={() => navigate("/login")}
                  className="!h-[52px] !px-7 !rounded-full !bg-surge-500 !border-surge-500 hover:!bg-surge-600 !text-[15px] !font-semibold shadow-glow-blue"
                  icon={<ArrowRightOutlined />}
                  iconPosition="end"
                >
                  Start Trading Free
                </Button>
                <Button
                  size="large"
                  onClick={() => document.querySelector("#subscribe")?.scrollIntoView({ behavior: "smooth" })}
                  className="h-[52px] px-6 rounded-full border border-surge-500/25 text-ink-900/80 hover:text-ink-900 hover:border-surge-400/60 hover:bg-white/60 transition-all duration-200 text-[15px] font-medium"
                >
                  Get market insights
                </Button>
              </Space>

              <Row gutter={[24, 24]} className={`${isInView ? "opacity-100 animate-fadeInUp" : "opacity-0"} mt-12`} style={{ animationDelay: "0.45s", animationDuration: "1.4s" }}>
                <Col xs={24} sm={8}>
                  <div>
                    <Text className="font-display font-bold text-2xl text-ink-900">12K+</Text>
                    <p className="text-xs mt-0.5">Tracked instruments</p>
                  </div>
                </Col>
                <Col xs={24} sm={8}>
                  <div className="sm:border-l sm:border-surge-500/15 sm:pl-4">
                    <Text className="font-display font-bold text-2xl text-ink-900">40ms</Text>
                    <p className="text-xs mt-0.5">Avg. data refresh</p>
                  </div>
                </Col>
                <Col xs={24} sm={8}>
                  <div className="sm:border-l sm:border-surge-500/15 sm:pl-4">
                    <Text className="font-display font-bold text-2xl text-ink-900">99.98%</Text>
                    <p className="text-xs mt-0.5">Platform uptime</p>
                  </div>
                </Col>
              </Row>
            </Space>
          </Col>

          <Col xs={24} lg={12}>
            <div
              className={`${isInView ? "relative opacity-100 animate-fadeInUp" : "relative opacity-0"}`}
              style={{ animationDelay: "0.3s", animationDuration: "1.5s" }}
            >
              <Card bordered={false} className="relative mx-auto max-w-md rounded-[2rem] border border-surge-500/15 bg-white/70 backdrop-blur-xl p-6 shadow-glow-soft">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <Text className="text-[#5b7b9d] text-xs font-medium">StockPro Index</Text>
                    <Title level={3} className="font-display font-bold text-2xl text-ink-900 mt-0.5">
                      $4,812.60
                    </Title>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-bull/15 text-bull text-xs font-semibold px-3 py-1.5">
                    <LineChartOutlined /> +6.42%
                  </span>
                </div>

                <svg viewBox="0 0 600 170" className="w-full h-40" fill="none">
                  <defs>
                    <linearGradient id="heroFade" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`${CHART_PATH} L600,170 L0,170 Z`}
                    fill="url(#heroFade)"
                    className={isInView ? "opacity-100 animate-fadeIn" : "opacity-0"}
                    style={{ animationDelay: "1.6s", animationDuration: "1.5s" }}
                  />
                  <path
                    d={CHART_PATH}
                    stroke="#2563EB"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    strokeDasharray="1400"
                    strokeDashoffset={1400}
                    className={isInView ? "animate-drawLine" : ""}
                    style={{ animationDelay: "0.6s", animationDuration: "1.7s" }}
                  />
                  <circle
                    cx="560"
                    cy="30"
                    r="5"
                    fill="#2563EB"
                    className={isInView ? "opacity-100 animate-fadeIn" : "opacity-0"}
                    style={{ animationDelay: "2.4s", animationDuration: "1.5s" }}
                  />
                </svg>

                <Row gutter={[12, 12]} className="mt-4 pt-4 border-t border-surge-500/10">
                  {[
                    { label: "Open", value: "4,510" },
                    { label: "High", value: "4,835" },
                    { label: "Low", value: "4,498" },
                  ].map((s) => (
                    <Col span={8} key={s.label}>
                      <Text className="block text-[11px] text-[#7392b3]">{s.label}</Text>
                      <Text className="block font-mono text-sm text-ink-900/85 mt-0.5">{s.value}</Text>
                    </Col>
                  ))}
                </Row>
              </Card>

              <Card bordered={false} className="hidden sm:flex absolute -left-10 lg:-left-16 top-10 items-center gap-2 rounded-2xl border border-surge-500/15 bg-white/90 backdrop-blur-md px-4 py-3 shadow-glow-soft animate-floatY">
                <Space size="small" align="start">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-bull/15 text-bull">
                    <DollarCircleFilled />
                  </span>
                  <div>
                    <Text className="text-[11px] text-[#7392b3]">Portfolio</Text>
                    <Text className="block font-mono text-sm font-semibold text-ink-900">+18.6%</Text>
                  </div>
                </Space>
              </Card>

              <Card bordered={false} className="hidden sm:flex absolute -right-8 lg:-right-16 bottom-16 items-center gap-2 rounded-2xl border border-surge-500/15 bg-white/90 backdrop-blur-md px-4 py-3 shadow-glow-soft animate-floatSlow" style={{ animationDelay: "1s" }}>
                <Space size="small" align="start">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-surge-500/15 text-surge-500">
                    <ThunderboltFilled />
                  </span>
                  <div>
                    <Text className="text-[11px] text-[#7392b3]">Alert triggered</Text>
                    <Text className="block font-mono text-sm font-semibold text-ink-900">TSLA @ 412.87</Text>
                  </div>
                </Space>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </Layout.Content>
  );
};

export default HeroSection;
