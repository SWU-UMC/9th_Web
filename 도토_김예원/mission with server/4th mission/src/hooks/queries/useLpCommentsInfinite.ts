import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpComments } from "../../apis/comments";

// 댓글 목록 무한 스크롤링
export function useLpCommentsInfinite(
  lpid: string,
  order: "asc" | "desc" = "desc"
) {
  return useInfiniteQuery({
    queryKey: ["lpCommentsInfinite", lpid, order],

    queryFn: ({ pageParam = 1 }) =>
      getLpComments({
        lpId: lpid,
        pageParam,
        order,
      }),

    getNextPageParam: (lastPage) => {
      const pageInfo = lastPage.data;   

      if (!pageInfo.hasNext) return undefined;

      return pageInfo.nextCursor;      
    },

    initialPageParam: 1,
  });
}