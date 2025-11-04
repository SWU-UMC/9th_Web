import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { QUERY_KEY } from "../../constants/key";
import { getLpDetail } from "../../apis/lp";

function useGetLpDetail() {
    const {lpid} = useParams<{lpid: string}>();

    return useQuery({
        queryKey: [QUERY_KEY.lp, lpid],
        queryFn: () => getLpDetail(lpid!),  
        enabled: !!lpid,
        staleTime: 1000 * 60 * 5, 
    });
}

export default useGetLpDetail