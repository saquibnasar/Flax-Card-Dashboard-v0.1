import { updateMember } from "@/app/services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserCardDetails from "../entities/UserCardDetails";

interface UpdateUserProp {
  data: FormData;
  token: string;
}

const useUpdateUser = (userId: string) => {
  const queryClient = useQueryClient();
  const { mutate, status, data } = useMutation({
    mutationKey: ["updateUser", userId],
    mutationFn: async (data: FormData | any) =>
      await updateMember<UserCardDetails>(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card", userId] });
    },
  });
  const isLoading = status === "pending";

  return { mutate, isLoading, data };
};

export default useUpdateUser;
