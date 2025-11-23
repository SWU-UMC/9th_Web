import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../../apis/user";
import { LOCAL_STORAGE_KEY } from "../../constants/key";

// useQuery를 이용하여 회원 정보를 불러옴
export const useMyProfile = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

  const query = useQuery({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!token) return null;
      const res = await getMyProfile();
      return res.data;   
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 3,
  });

  return {
    user: query.data, 
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};