import { Card, Col, Row, Typography } from "antd";
import { useInView } from "../../hooks/useInView";

const { Title, Paragraph, Text } = Typography;

const TESTIMONIALS = [
  {
    quote:
      "StockPro replaced three tabs and a spreadsheet. My whole watchlist and alerts live in one calm screen now.",
    name: "Ariana Cole",
    role: "Swing trader, 6 years",
  },
  {
    quote:
      "The alert latency is the real differentiator. I've caught moves other tools showed me a full minute later.",
    name: "Marcus Ibe",
    role: "Prop desk analyst",
  },
  {
    quote:
      "Role-based access made it easy to bring my whole research team onto one shared dashboard without any risk.",
    name: "Priya Nandan",
    role: "Head of research, Vale Capital",
  },
];

const TestimonialCard = ({ quote, name, role, index }) => {
  const { ref, isInView } = useInView({ threshold: 0.2, once: false });

  return (
    <Col xs={24} md={8} ref={ref}>
      <Card
        bordered={false}
        className={`rounded-[1.75rem] border border-surge-500/15 bg-white/90 backdrop-blur-sm p-7 shadow-glow-soft transition-all duration-700 hover:-translate-y-1.5 hover:border-surge-400/30 hover:shadow-[0_28px_68px_rgba(37,99,235,0.16)] ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: isInView ? `${index * 100}ms` : "0ms" }}
      >
        <div className="flex gap-1 text-surge-400 text-sm mb-4">{"★★★★★"}</div>
        <blockquote className="text-sm text-ink-900/80 leading-relaxed">"{quote}"</blockquote>
        <figcaption className="mt-5 flex items-center gap-3">
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-surge-400 to-surge-600 text-white text-xs font-semibold">
            {name.split(" ").map((p) => p[0]).join("")}
          </span>
          <div>
            <Text className="block text-sm font-semibold text-ink-900">{name}</Text>
            <Text className="block text-xs text-[#5b7b9d]">{role}</Text>
          </div>
        </figcaption>
      </Card>
    </Col>
  );
};

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative bg-ice-100 py-20 md:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-lg mx-auto mb-14">
          <Text className="text-xs font-semibold tracking-widest uppercase text-surge-600">Trusted by traders</Text>
          <Title level={2} className="mt-3 font-display font-bold text-3xl sm:text-4xl text-ink-900 tracking-tight">
            Built for people watching real money move
          </Title>
        </div>

        <Row gutter={[20, 20]}>
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} {...t} index={i} />
          ))}
        </Row>
      </div>
    </section>
  );
};

export default TestimonialsSection;
