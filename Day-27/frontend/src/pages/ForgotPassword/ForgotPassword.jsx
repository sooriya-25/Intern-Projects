import { useState } from "react";

import { Form, Typography } from "antd";

import { Link, useNavigate } from "react-router-dom";

import { useForgotPassword } from "../../hooks/useForgotPassword";
import { useResetPassword } from "../../hooks/useResetPassword";
import { useResendCooldown } from "../../hooks/useResendCooldown";
import { useCountdown } from "../../hooks/useCountdown";
import { useToast } from "../../components/Toast/ToastProvider";

import {
  DEFAULT_OTP_TTL_MINUTES,
  RESEND_COOLDOWN_SECONDS,
} from "../../constants/otp";

import RequestResetStep from "../../components/forgot-password/RequestResetStep";
import ResetPasswordStep from "../../components/forgot-password/ResetPasswordStep";
import AuthLayout from "../../components/auth/AuthLayout";

const { Text } = Typography;

const STEP_COPY = [
  {
    title: "Reset your password",
    subtitle: "Enter the email on your account and we'll send you a code.",
  },
  {
    title: "Enter the code",
    subtitle: "Verify the code and choose a new password.",
  },
];

const ForgotPassword = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [requestForm] = Form.useForm();
  const [resetForm] = Form.useForm();

  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");

  const { resendCooldown, startCooldown } = useResendCooldown(
    RESEND_COOLDOWN_SECONDS,
  );
  const resetExpiry = useCountdown();

  const { mutate: sendResetOtp, isPending: isSendingOtp } =
    useForgotPassword();
  const { mutate: submitReset, isPending: isResetting } = useResetPassword();

  const requestReset = (targetEmail) => {
    sendResetOtp(
      { email: targetEmail },
      {
        onSuccess: (response) => {
          toast.success(
            response.message || "If that email exists, a code was sent",
          );

          const ttlMinutes =
            response?.data?.expiresInMinutes ?? DEFAULT_OTP_TTL_MINUTES;

          resetExpiry.restart(Date.now() + ttlMinutes * 60 * 1000);

          setEmail(targetEmail);
          setCurrentStep(1);
          startCooldown();
        },
        onError: (error) => {
          toast.error(
            error.response?.data?.message || "Failed to send reset code",
          );
        },
      },
    );
  };

  const handleRequestSubmit = ({ email: submittedEmail }) => {
    requestReset(submittedEmail);
  };

  const handleResend = () => {
    if (resendCooldown > 0 || !email) return;

    requestReset(email);
  };

  const handleResetSubmit = ({ otp, password }) => {
    submitReset(
      { email, otp, password },
      {
        onSuccess: (response) => {
          toast.success(
            response.message ||
              "Password reset successfully. Please log in.",
          );

          navigate("/login");
        },
        onError: (error) => {
          toast.error(
            error.response?.data?.message || "Failed to reset password",
          );
        },
      },
    );
  };

  const goBack = () => {
    resetForm.resetFields();
    resetExpiry.clear();

    setCurrentStep(0);
  };

  const { subtitle } = STEP_COPY[currentStep];

  return (
    <AuthLayout
      eyebrow="Account recovery"
      title={STEP_COPY[currentStep].title}
      subtitle={subtitle}
      footer={
        <Text className="text-slate-600">
          Remembered it after all?{" "}
          <Link to="/login" className="font-semibold text-surge-500">
            Back to login
          </Link>
        </Text>
      }
    >
      {currentStep === 0 && (
        <RequestResetStep
          form={requestForm}
          initialValues={{ email }}
          loading={isSendingOtp}
          onFinish={handleRequestSubmit}
        />
      )}

      {currentStep === 1 && (
        <ResetPasswordStep
          form={resetForm}
          email={email}
          loading={isResetting}
          onFinish={handleResetSubmit}
          resendCooldown={resendCooldown}
          resendLoading={isSendingOtp}
          onResend={handleResend}
          onBack={goBack}
          expiryLabel={resetExpiry.label}
          isExpired={resetExpiry.isExpired}
        />
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
