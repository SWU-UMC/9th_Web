import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";

interface UseGetInfiniteLpListProps {
  search?: string;
  order?: "asc" | "desc";
  enabled?: boolean;
}

export default function useGetInfiniteLpList({
  search,
  order = "desc",
  enabled = true,
}: UseGetInfiniteLpListProps) {
  return useInfiniteQuery({
    queryKey: ["lps", search, order],
    queryFn: ({ pageParam = 0 }) =>
      getLpList({
        cursor: pageParam,
        search,
        order,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    enabled,
  });
}