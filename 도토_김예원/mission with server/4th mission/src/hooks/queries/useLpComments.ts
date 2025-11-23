import { useQuery } from "@tanstack/react-query";
import { getLpComments } from "../../apis/comments";

export function useLpComments(lpid?: string, order: "asc" | "desc" = "desc") {
  return useQuery({
    queryKey: ["lpComments", lpid, order],
    queryFn: () =>
      getLpComments({
        lpId: lpid!,
        pageParam: 1,
        order,
      }),
    enabled: !!lpid,
    select: (res) => res?.data?.data ?? [],
    staleTime: 1000 * 30, // 30초 캐싱 
  });
}