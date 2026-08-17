import { useState } from "react";

import { Card, Form, Steps, Typography, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";

import { useSendOtp } from "../../hooks/useSendOtp";
import { useVerifyOtp } from "../../hooks/useVerifyOtp";
import { useRegister } from "../../hooks/useRegister";
import { useResendCooldown } from "../../hooks/useResendCooldown";

import { RESEND_COOLDOWN_SECONDS, STEP_COPY } from "../../constants/signup";

import DetailsStep from "../../components/signup/DetailsStep";
import OtpStep from "../../components/signup/OtpStep";
import PasswordStep from "../../components/signup/PasswordStep";

const { Title, Text } = Typography;

const Signup = () => {
  const navigate = useNavigate();

  const [detailsForm] = Form.useForm();
  const [otpForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const [currentStep, setCurrentStep] = useState(0);
  const [signupValues, setSignupValues] = useState({});

  const { resendCooldown, startCooldown } = useResendCooldown(
    RESEND_COOLDOWN_SECONDS,
  );

  const { mutate: sendOtp, isPending: isSendingOtp } = useSendOtp();
  const { mutate: verifyOtp, isPending: isVerifyingOtp } = useVerifyOtp();
  const { mutate: registerUser, isPending: isRegistering } = useRegister();

  const requestOtp = (email) => {
    sendOtp(
      { email },
      {
        onSuccess: (response) => {
          message.success(response.message || "OTP sent to your email");

          setCurrentStep(1);
          startCooldown();
        },
        onError: (error) => {
          message.error(
            error.response?.data?.message || "Failed to send OTP",
          );
        },
      },
    );
  };

  // Step 1 — collect name, email, phone, then fire off the OTP email.
  const handleDetailsSubmit = (values) => {
    console.log("Details submitted:", values);
    setSignupValues((prev) => ({ ...prev, ...values }));
    //console.log("Signup values after details submit:", signupValues);
    requestOtp(values.email);
  };

  const handleResendOtp = () => {
    if (resendCooldown > 0 || !signupValues.email) return;

    requestOtp(signupValues.email);
  };

  // Step 2 — verify the OTP, then move on to the password step.
  const handleVerifyOtp = ({ otp }) => {
    console.log("Verifying OTP:", otp, "for email:", signupValues);
    verifyOtp(
      { email: signupValues.email, otp },
      {
        onSuccess: () => {
          message.success("Email verified");

          setCurrentStep(2);
        },
        onError: (error) => {
          message.error(error.response?.data?.message || "Invalid OTP");
        },
      },
    );
  };

  // Step 3 — collect password (+ optional company/address) and register.
  const handleCreateAccount = (values) => {
    const { confirmPassword, ...rest } = values;
    const payload = { ...signupValues, ...rest };

    registerUser(payload, {
      onSuccess: (response) => {
        message.success(
          response.message || "Account created successfully. Please login.",
        );

        navigate("/login");
      },
      onError: (error) => {
        message.error(error.response?.data?.message || "Registration failed");
      },
    });
  };

  const goToDetails = () => {
    otpForm.resetFields();

    setCurrentStep(0);
  };

  const goToOtp = () => {
    setCurrentStep(1);
  };

  const { subtitle } = STEP_COPY[currentStep];

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4 py-10">
      <Card className="w-full max-w-md shadow-2xl rounded-[1.5rem] border border-slate-200">
        <div className="flex flex-col items-center mb-2">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
            <UserAddOutlined className="text-xl text-blue-600" />
          </div>

          <Title level={3} className="!mb-1 text-slate-900">
            Create your StockPro account
          </Title>

          <Text type="secondary" className="text-center">
            {subtitle}
          </Text>
        </div>

        <Steps
          size="small"
          current={currentStep}
          className="my-6"
          items={STEP_COPY.map((step) => ({ title: step.title }))}
        />

        {currentStep === 0 && (
          <DetailsStep
            form={detailsForm}
            initialValues={signupValues}
            loading={isSendingOtp}
            onFinish={handleDetailsSubmit}
          />
        )}

        {currentStep === 1 && (
          <OtpStep
            form={otpForm}
            email={signupValues.email}
            loading={isVerifyingOtp}
            onFinish={handleVerifyOtp}
            resendCooldown={resendCooldown}
            resendLoading={isSendingOtp}
            onResend={handleResendOtp}
            onBack={goToDetails}
          />
        )}

        {currentStep === 2 && (
          <PasswordStep
            form={passwordForm}
            loading={isRegistering}
            onFinish={handleCreateAccount}
            onBack={goToOtp}
          />
        )}

        <Text className="block text-center mt-6 text-slate-600">
          Already have an account? <Link to="/login">Login</Link>
        </Text>
      </Card>
    </div>
  );
};

export default Signup;
