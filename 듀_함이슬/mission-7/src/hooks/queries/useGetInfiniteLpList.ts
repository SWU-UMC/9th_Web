import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../types/common";
import { QUERY_KEY } from "../../constants/key";

// 쿼리 실행 여부 외부에서 제어하기 위한 옵션
interface useGetInfiniteLpListOptions {
    enabled?: boolean;
}

function useGetInfiniteLpList(
    limit: number,
    search: string,
    order: PAGINATION_ORDER,
    options?: useGetInfiniteLpListOptions,
) {
    return useInfiniteQuery({
        queryFn: ({ pageParam }) =>
            getLpList({ cursor: pageParam, limit, search, order }),
        queryKey: [QUERY_KEY.lps, search, order],
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            // console.log(lastPage, allPages);
            return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
        },
        enabled: options?.enabled ?? true,
        staleTime: 1000 * 60 * 1,
        gcTime: 1000 * 60 * 5,
    });
};

export default useGetInfiniteLpList;