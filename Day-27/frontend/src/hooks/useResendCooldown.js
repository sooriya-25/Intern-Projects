import { useRef, useState } from "react";

// Generic "resend in Ns" countdown. Not tied to OTP/signup specifically -
// anything with a resend/retry cooldown can reuse this.
export const useResendCooldown = (seconds) => {
  const [resendCooldown, setResendCooldown] = useState(0);
  const cooldownTimer = useRef(null);

  const startCooldown = () => {
    setResendCooldown(seconds);

    clearInterval(cooldownTimer.current);

    cooldownTimer.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownTimer.current);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  };

  return { resendCooldown, startCooldown };
};
