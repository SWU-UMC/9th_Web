import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios";

export const useCreateComment = (lpId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      const res = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
        content,
      });
      return res.data;
    },
    onSuccess: () => {
      console.log("✅ 댓글 작성 성공");
      // ✅ 댓글 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpId], exact: false });
    },
    onError: (err) => {
      console.error("❌ 댓글 작성 실패:", err);
    },
  });
};