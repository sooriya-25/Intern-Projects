import { useMutation } from "@tanstack/react-query";

import { subscribeEmail } from "../api/subscribe.api";

export const useSubscribe = () => {
  return useMutation({
    mutationFn: subscribeEmail,
  });
};
