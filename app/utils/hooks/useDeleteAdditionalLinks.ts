import { deleteAdditionalLinks } from "@/app/services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteAdditionalLinks = (userId: string) => {
  const queryClient = useQueryClient();
  const { mutate, status, data } = useMutation({
    mutationKey: ["deleteUser", userId],
    mutationFn: async (data: { employeeId: string; type: string }) =>
      await deleteAdditionalLinks(data.employeeId, data.type),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card", userId] });
    },
  });
  const isLoading = status === "pending";

  return { mutate, isLoading, data };
};

export default useDeleteAdditionalLinks;
