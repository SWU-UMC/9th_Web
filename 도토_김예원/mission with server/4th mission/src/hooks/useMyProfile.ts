import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../apis/user";
import { LOCAL_STORAGE_KEY } from "../constants/key";

// 회원 정보를 불러오는걸 훅으로 처리
export const useMyProfile = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

  const query = useQuery({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!token) return null;
      const res = await getMyProfile();
      return res.data;
    },
    enabled: !!token,  // 토큰 있을 때만 실행
    staleTime: 1000 * 60 * 3, // 3분 캐싱
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};