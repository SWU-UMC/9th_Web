import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getLpDetail } from "../../apis/lp";
import type { RequestLPDto } from "../../types/lp";

function useGetLpDetail({ lpid }: RequestLPDto) {

    return useQuery({
        queryKey: [QUERY_KEY.lps, lpid],
        queryFn: () => getLpDetail({lpid}),
        enabled: !!lpid,
        staleTime: 1000 * 60 * 5,
    });
}

export default useGetLpDetail;