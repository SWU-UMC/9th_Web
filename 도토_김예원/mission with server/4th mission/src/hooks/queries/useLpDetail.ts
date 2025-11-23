import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp";

// useQuery를 이용하여 lp 세부 조회를 불러옴
export const useLpDetail = (lpid?: string) => {
  return useQuery({
    queryKey: ["lpDetail", lpid],
    queryFn: async () => {
      const res = await getLpDetail(lpid!);
      return res.data;
    },
    enabled: !!lpid, // URL에서 lpid가 잘 넘어왔을 때만 실행
  });
};