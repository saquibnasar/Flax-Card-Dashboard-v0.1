import { useQueryClient } from "@tanstack/react-query";
import UserCardDetails from "../entities/UserCardDetails";

const useUserCardDetails = (employeeId: string) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<UserCardDetails>(["card", employeeId]);
  return data ? data : ({} as UserCardDetails);
};

export default useUserCardDetails;
