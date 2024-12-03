import { CardDetails } from "@/app/dashboard/CardGrid";
import { getAllMembers } from "@/app/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useCards = () => {
  const { data, error, isLoading } = useQuery<CardDetails[], Error>({
    queryKey: ["users"],
    queryFn: async () => await getAllMembers().then((response) => response),
  });

  return { data: data as CardDetails[], error, isLoading };
};

export default useCards;
