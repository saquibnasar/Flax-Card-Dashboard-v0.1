import http from "@/app/services/api-client";
import { useQuery } from "@tanstack/react-query";
import UserCardDetails from "../entities/UserCardDetails";

const useCard = (id: string) => {
  const { data, error, isLoading, status } = useQuery<UserCardDetails, Error>({
    queryKey: ["card", id],
    queryFn: async () =>
      await http
        .get<UserCardDetails>(`/members/${id}`)
        .then((response) => response.data),
  });

  return {
    data: data as UserCardDetails,
    status,
    isLoading,
    error,
  };
};

export default useCard;
