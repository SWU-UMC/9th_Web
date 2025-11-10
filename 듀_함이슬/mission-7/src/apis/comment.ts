import { type DeleteCommentResponse, type CommentListResponseDto, type CommentResponse, type CommentResponseDto, type CreateCommentDto, type UpdateCommentDto } from "../types/comment";
import type { PAGINATION_ORDER } from "../types/common";
import { axiosInstance } from "./axios";

export const getLpComments = async ({
    lpid, order, cursor, limit = 10
}: {
    lpid: number;
    order: PAGINATION_ORDER;
    cursor: number | string;
    limit?: number;
}): Promise<CommentListResponseDto> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpid}/comments`, {
        params: {
            order,
            cursor,
            limit,
        },
    });
    return data;
}

export const postComment =
    async ({ lpid, newComment }: { lpid: number; newComment: CreateCommentDto; }): Promise<CommentResponseDto> => {
        const { data } = await axiosInstance.post(`/v1/lps/${lpid}/comments`, newComment);
        return data.data;
    }

export const updateComment =
    async ({ lpid, commentId, updatedContent }: { lpid: number; commentId: number; updatedContent: UpdateCommentDto; }): Promise<CommentResponseDto> => {
        const { data } = await axiosInstance.patch<CommentResponse>(`/v1/lps/${lpid}/comments/${commentId}`, updatedContent);
        return data.data;
    }

export const deleteComment =
    async ({ lpid, commentId }: { lpid: number; commentId: number; }): Promise<{ message: string }> => {
        const { data } = await axiosInstance.delete<DeleteCommentResponse>(`/v1/lps/${lpid}/comments/${commentId}`);
        return data.data;
    } 
