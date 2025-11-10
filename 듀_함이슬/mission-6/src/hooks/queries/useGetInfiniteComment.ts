import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpComments } from "../../apis/comment";
import type { PAGINATION_ORDER } from "../../types/common";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteComment(
    lpid: string,
    order: PAGINATION_ORDER,
    limit?: number,
) {
    return useInfiniteQuery({
        queryKey: [QUERY_KEY.lpComment, lpid, order],

        queryFn: ({ pageParam = 0 }) =>
            getLpComments({ lpid, order, cursor: pageParam, limit }),

        initialPageParam: 0,

        getNextPageParam: (lastPage) => {
            return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
        },
    });
}

export default useGetInfiniteComment;