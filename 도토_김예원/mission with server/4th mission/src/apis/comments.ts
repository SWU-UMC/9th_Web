import { axiosInstance } from "./axios";
import type { CommonResponse } from "../types/common";
import type {
  LpCommentListResponse,
  LpCommentItem
} from "../types/comment";


// 댓글 리스트 조회
export const getLpComments = async ({
  lpId,
  pageParam = 1,
  order,
}: {
  lpId: string;
  pageParam?: number;
  order: "asc" | "desc";
}): Promise<LpCommentListResponse> => {
  const { data } = await axiosInstance.get<LpCommentListResponse>(
    `/v1/lps/${lpId}/comments`,
    {
      params: { page: pageParam, order },
    }
  );

  return data;
};


// 댓글 작성
export const postLpComment = async ({
  lpId,
  content,
}: {
  lpId: string;
  content: string;
}): Promise<CommonResponse<LpCommentItem>> => {
  const { data } = await axiosInstance.post<
    CommonResponse<LpCommentItem>
  >(`/v1/lps/${lpId}/comments`, { content });

  return data;
};

// 👉 댓글 삭제 (필요 시)
export const deleteLpComment = async ({
  lpId,
  commentId,
}: {
  lpId: string;
  commentId: string;
}) => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );

  return data;
};