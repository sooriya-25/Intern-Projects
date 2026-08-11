import {
  Row,
  Col,
  Space,
  Typography,
  Button,
  Flex,
} from "antd";
import {
  RiseOutlined,
  GithubOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";

const { Text, Paragraph } = Typography;

const FOOTER_LINKS = {
  Product: ["Live markets", "Watchlists", "Alerts", "Pricing"],
  Company: ["About", "Careers", "Blog"],
  Legal: ["Privacy", "Terms", "Security"],
};

const SOCIAL_LINKS = [
  GithubOutlined,
  TwitterOutlined,
  LinkedinOutlined,
];

const Footer = () => {
  return (
    <footer className="relative bg-ice-100 pt-16 pb-8 border-t border-surge-500/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <Row gutter={[40, 40]}>
          {/* Brand Section */}
          <Col xs={24} sm={24} lg={9}>
            <Space direction="vertical" size="middle">

              <Space size="middle" align="center">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-surge-400 to-surge-600">
                  <RiseOutlined className="text-white text-sm" />
                </span>

                <Text className="font-display font-bold text-lg text-ink-900">
                  Stock
                  <span className="text-surge-500">Pro</span>
                </Text>
              </Space>

              <Paragraph className="!mb-0 text-[#5b7b9d] max-w-xs leading-relaxed">
                Real-time market intelligence for traders who move fast and stay
                calm doing it.
              </Paragraph>

              <Space size="middle">
                {SOCIAL_LINKS.map((Icon, index) => (
                  <a
                    key={index}
                    href="#top"
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-surge-500/15 text-[#5b7b9d] hover:text-surge-500 hover:border-surge-400/40 transition-colors duration-200"
                  >
                    <Icon />
                  </a>
                ))}
              </Space>

            </Space>
          </Col>

          {/* Footer Links */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <Col xs={8} sm={8} lg={5} key={heading}>
              <Text strong className="text-ink-900">
                {heading}
              </Text>

              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-sm text-surge-500 hover:text-surge-600 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
          ))}
        </Row>

        {/* Bottom Bar */}
        <Flex
          justify="space-between"
          align="center"
          wrap="wrap"
          gap={16}
          className="mt-14 pt-6 border-t border-surge-500/10"
        >
          <Text type="secondary">
            © {new Date().getFullYear()} StockPro. All rights reserved.
          </Text>

          <Button
            type="text"
            icon={<ArrowUpOutlined />}
            iconPosition="end"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="!text-surge-500 hover:!text-surge-600"
          >
            Back to top
          </Button>
        </Flex>

      </div>
    </footer>
  );
};

export default Footer;