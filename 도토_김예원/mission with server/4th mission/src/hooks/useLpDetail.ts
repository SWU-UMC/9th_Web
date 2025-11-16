import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../apis/lp";

export const useLpDetail = (lpid?: string) => {
  return useQuery({
    queryKey: ["lpDetail", lpid],
    queryFn: async () => {
      const res = await getLpDetail(lpid!);
      return res.data;
    },
    enabled: !!lpid, // lpid 있을 때만 실행
  });
};