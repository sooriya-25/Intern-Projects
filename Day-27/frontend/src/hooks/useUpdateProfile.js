import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeProfilePhoto, updateProfile, uploadProfilePhoto } from "../api/profile.api";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: (response) => {
      queryClient.setQueryData(["profile"], response.data || response);
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
};

export const useUploadProfilePhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadProfilePhoto,

    onSuccess: (response) => {
      queryClient.setQueryData(["profile"], response.data || response);
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
};

export const useRemoveProfilePhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeProfilePhoto,

    onSuccess: (response) => {
      queryClient.setQueryData(["profile"], response.data || response);
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
};