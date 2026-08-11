import { useQuery } from "@tanstack/react-query";

import { getCaptcha } from "../api/subscribe.api";

export const useCaptcha = (enabled = true) => {
  return useQuery({
    queryKey: ["captcha"],
    queryFn: getCaptcha,
    enabled,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};
