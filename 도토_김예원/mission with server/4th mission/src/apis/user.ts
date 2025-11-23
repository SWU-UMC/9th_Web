import { axiosInstance } from "./axios";

// 회원 정보 조회 api
export const getMyProfile = async () => {
  const res = await axiosInstance.get("/v1/users/me");
  return res.data;
};
