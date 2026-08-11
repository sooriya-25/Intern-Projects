import { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { MailOutlined, SendOutlined, CloseOutlined } from "@ant-design/icons";
import { CheckCircleFilled } from "@ant-design/icons";

import { useInView } from "../../hooks/useInView";
import { useCaptcha } from "../../hooks/useCaptcha";
import { useSubscribe } from "../../hooks/useSubscribe";
import ImageCaptcha from "./ImageCaptcha";

const SubscribeSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.25, once: false });
  const [form] = Form.useForm();

  const { data: captchaData, isLoading: captchaLoading, isRefetching, refetch } = useCaptcha();
  const { mutate, isPending } = useSubscribe();

  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState("");

  const resetCaptcha = () => {
    setCaptchaAnswer("");
    refetch();
  };

  const onFinish = ({ email }) => {
    setCaptchaError("");

    if (!captchaAnswer) {
      setCaptchaError("Enter the captcha answer to continue");
      return;
    }

    if (!captchaData?.token) {
      setCaptchaError("Unable to load captcha. Refresh and try again.");
      return;
    }

    mutate(
      { email, captchaAnswer, captchaToken: captchaData.token },
      {
        onSuccess: () => {
          setSubscribedEmail(email);
          setSuccessOpen(true);
          form.resetFields();
          resetCaptcha();
        },
        onError: (error) => {
          const msg = error.response?.data?.message || "Something went wrong. Please try again.";
          setCaptchaError(msg);
          resetCaptcha();
        },
      }
    );
  };

  return (
    <section id="subscribe" className="relative bg-ice-50 py-24 md:py-32 scroll-mt-20">
      <div
        ref={ref}
        className={`relative max-w-4xl mx-auto px-5 sm:px-8 transition-all duration-1000 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-8 sm:p-12 md:p-14 shadow-[0_32px_96px_rgba(15,23,42,0.16)]">
          {/* animated blob accents */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/80 blur-[90px] animate-pulseGlow" />
          <div className="pointer-events-none absolute -bottom-28 -left-16 w-64 h-64 rounded-full bg-slate-200/50 blur-[90px] animate-pulseGlow [animation-delay:-1.5s]" />

          <div className="relative grid md:grid-cols-[1.1fr_1fr] gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-surge-200 bg-surge-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-surge-700 uppercase">
                <MailOutlined /> Weekly market brief
              </span>
              <h2 className="mt-5 font-display font-bold text-2xl sm:text-3xl text-ink-900 leading-tight">
                Get the moves that matter, before the bell rings.
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-sm">
                Join traders getting a concise, no-fluff digest of market
                movers, alerts, and StockPro product updates in their inbox.
              </p>
            </div>

            <Form form={form} layout="vertical" onFinish={onFinish} className="relative">
              <Form.Item
                name="email"
                label={<span className="!text-slate-700 !font-medium">Email address</span>}
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Enter a valid email address" },
                ]}
                className="mb-4"
              >
                <Input
                  size="large"
                  prefix={<MailOutlined className="text-surge-400" />}
                  placeholder="you@tradingdesk.com"
                  className="!rounded-2xl !bg-white"
                />
              </Form.Item>

              <Form.Item
                label={<span className="!text-slate-700 !font-medium">Quick check — type the letters shown</span>}
                className="mb-2"
                validateStatus={captchaError ? "error" : ""}
              >
                <ImageCaptcha
                  challenge={captchaData}
                  loading={captchaLoading}
                  refreshing={isRefetching}
                  answer={captchaAnswer}
                  onAnswerChange={setCaptchaAnswer}
                  onRefresh={resetCaptcha}
                  disabled={isPending}
                />
              </Form.Item>

              {captchaError && (
                <p className="text-red-600 text-xs font-semibold -mt-1 mb-3 animate-fadeIn">{captchaError}</p>
              )}

              <Button
                htmlType="submit"
                block
                size="large"
                loading={isPending}
                icon={<SendOutlined />}
                className="!h-[50px] !rounded-2xl !bg-surge-500 !border-surge-500 !text-white hover:!bg-surge-600 !font-semibold mt-2"
              >
                Subscribe for free
              </Button>

              <p className="text-[11px] text-slate-500 text-center mt-3">
                No spam. Unsubscribe anytime. We respect your inbox.
              </p>
            </Form>
          </div>
        </div>
      </div>

      {/* success popup */}
      <Modal
        open={successOpen}
        onCancel={() => setSuccessOpen(false)}
        footer={null}
        closeIcon={<CloseOutlined />}
        centered
        width={400}
      >
        <div className="flex flex-col items-center text-center py-4">
          <div className="relative w-20 h-20 flex items-center justify-center animate-popIn">
            <div className="absolute inset-0 rounded-full bg-bull/15 animate-pulseGlow" />
              <circle cx="26" cy="26" r="24" fill="none" stroke="#12B886" strokeWidth="2.5" opacity="0.25" />
              <CheckCircleFilled className="text-green-500 text-5xl" />
          </div>

          <h3 className="font-display font-bold text-xl text-ink-900 mt-4">
            You're on the list!
          </h3>
          <p className="text-sm text-[#5b7b9d] mt-2 max-w-xs">
            We'll send market insights to{" "}
            <span className="font-semibold text-ink-900">{subscribedEmail}</span>. Keep an eye
            on your inbox.
          </p>

          <Button
            type="primary"
            className="!rounded-full !bg-surge-500 !border-surge-500 !mt-6 !px-8"
            onClick={() => setSuccessOpen(false)}
          >
            Got it
          </Button>
        </div>
      </Modal>
    </section>
  );
};

export default SubscribeSection;
