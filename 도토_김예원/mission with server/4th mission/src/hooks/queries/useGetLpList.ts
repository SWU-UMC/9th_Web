import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { QUERY_KEY } from "../../constants/key.ts";
import { getLpList } from "../../apis/lp.ts";

// useQuery를 이용하여 lp목록을 불러오는 부분을 훅으로 처리
function useGetLpList({ cursor, search, order, limit, enabled }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order], // 옵션에 따라 key 변화
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 100 * 60 * 10, // 10분
    select: (data) => data.data.data,
    enabled,
  });
}

export default useGetLpList;