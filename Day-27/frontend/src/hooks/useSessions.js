import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getSessions,
  revokeOtherSessions,
  revokeSession,
} from "../api/profile.api";

export const useSessions = () => {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: getSessions,
  });
};

export const useRevokeSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: revokeSession,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};

export const useRevokeOtherSessions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: revokeOtherSessions,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};
