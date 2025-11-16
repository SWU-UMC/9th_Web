import { axiosInstance } from "../apis/axios";

// 좋아요 등록
export const postLike = (lpId: number) => axiosInstance.post(`/v1/lps/${lpId}/likes`);

// 좋아요 취소
export const deleteLike = (lpId: number) => axiosInstance.delete(`/v1/lps/${lpId}/likes`);