import { useState } from "react";

import { Form, Steps, Typography } from "antd";

import { Link, useNavigate } from "react-router-dom";

import { useSendOtp } from "../../hooks/useSendOtp";
import { useVerifyOtp } from "../../hooks/useVerifyOtp";
import { useRegister } from "../../hooks/useRegister";
import { useResendCooldown } from "../../hooks/useResendCooldown";
import { useCountdown } from "../../hooks/useCountdown";
import { useToast } from "../../components/Toast/ToastProvider";

import {
  DEFAULT_OTP_TTL_MINUTES,
  RESEND_COOLDOWN_SECONDS,
  STEP_COPY,
} from "../../constants/signup";

import AccountDetailsStep from "../../components/signup/AccountDetailsStep";
import OtpStep from "../../components/signup/OtpStep";
import AuthLayout from "../../components/auth/AuthLayout";

const { Text } = Typography;

const Signup = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [detailsForm] = Form.useForm();
  const [otpForm] = Form.useForm();

  const [currentStep, setCurrentStep] = useState(0);
  const [signupValues, setSignupValues] = useState({});

  const { resendCooldown, startCooldown } = useResendCooldown(
    RESEND_COOLDOWN_SECONDS,
  );
  const otpExpiry = useCountdown();

  const { mutate: sendOtp, isPending: isSendingOtp } = useSendOtp();
  const { mutate: verifyOtp, isPending: isVerifyingOtp } = useVerifyOtp();
  const { mutate: registerUser, isPending: isRegistering } = useRegister();

  const requestOtp = (email) => {
    sendOtp(
      { email },
      {
        onSuccess: (response) => {
          toast.success(response.message || "OTP sent to your email");

          const ttlMinutes =
            response?.data?.expiresInMinutes ?? DEFAULT_OTP_TTL_MINUTES;

          otpExpiry.restart(Date.now() + ttlMinutes * 60 * 1000);

          setCurrentStep(1);
          startCooldown();
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Failed to send OTP");
        },
      },
    );
  };

  // Step 1 — collect every account field (identity, contact, company,
  // address, and password) in one go, then fire off the OTP email.
  const handleDetailsSubmit = (values) => {
    // NOTE on the console.log question below:
    // setSignupValues(...) only *schedules* a state update — React batches
    // it and re-renders on the next tick. `signupValues` in this closure
    // still points at the value from the render that created this function,
    // so logging it right after calling the setter prints the *old* value,
    // not the merged one. To see the merged object immediately, log the
    // object we're about to store (`merged` below) instead of the state
    // variable, or move the log into a `useEffect(() => {...}, [signupValues])`
    // that runs after the re-render has happened.
    const merged = { ...signupValues, ...values };
    console.log("Details submitted (merged, immediately correct):", merged);

    setSignupValues(merged);

    requestOtp(values.email);
  };

  const handleResendOtp = () => {
    if (resendCooldown > 0 || !signupValues.email) return;

    requestOtp(signupValues.email);
  };

  // Step 2 — verify the OTP, then register with everything collected above.
  const handleVerifyOtp = ({ otp }) => {
    verifyOtp(
      { email: signupValues.email, otp },
      {
        onSuccess: () => {
          toast.success("Email verified");

          const { confirmPassword, ...payload } = signupValues;

          registerUser(payload, {
            onSuccess: (response) => {
              toast.success(
                response.message ||
                  "Account created successfully. Please login.",
              );

              navigate("/login");
            },
            onError: (error) => {
              toast.error(
                error.response?.data?.message || "Registration failed",
              );
            },
          });
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Invalid OTP");
        },
      },
    );
  };

  const goToDetails = () => {
    otpForm.resetFields();
    otpExpiry.clear();

    setCurrentStep(0);
  };

  const { subtitle } = STEP_COPY[currentStep];

  return (
    <AuthLayout
      eyebrow="Get started"
      title="Create your StockPro account"
      subtitle={subtitle}
      panelWidthClassName={currentStep === 0 ? "max-w-xl" : "max-w-md"}
    >
      <div className="max-w-sm mx-auto mb-10 mt-8">
        <Steps
          size="small"
          current={currentStep}
          items={STEP_COPY.map((step) => ({ title: step.title }))}
        />
      </div>

      {currentStep === 0 && (
        <AccountDetailsStep
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
          loading={isVerifyingOtp || isRegistering}
          onFinish={handleVerifyOtp}
          resendCooldown={resendCooldown}
          resendLoading={isSendingOtp}
          onResend={handleResendOtp}
          onBack={goToDetails}
          expiryLabel={otpExpiry.label}
          isExpired={otpExpiry.isExpired}
        />
      )}
    </AuthLayout>
  );
};

export default Signup;