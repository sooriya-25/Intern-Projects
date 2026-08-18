import { useMutation } from "@tanstack/react-query";

import { verifyResetOtp } from "../api/auth.api";

export const useVerifyResetOtp = () => {
  return useMutation({
    mutationFn: verifyResetOtp,
  });
};
