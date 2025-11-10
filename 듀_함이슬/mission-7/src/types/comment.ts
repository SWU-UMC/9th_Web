import type { CommonResponse } from "./common";

export type CommentAuthor = {
    id: number;
    name: string;
    avatar: string;

}

export type CommentResponseDto = {
    id: number;
    content: string;
    lpId: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    author: CommentAuthor;

}

export type CommentListData = {
    data: CommentResponseDto[];
    nextCursor: number | null;
    hasNext: boolean;
}

export type CommentListResponseDto = {
    status: boolean;
    statusCode: number;
    message: string;
    data: CommentListData;
}

export type CreateCommentDto = {
    content: string;
}

export type UpdateCommentDto = {
    content: string;
}

export type CommentResponse = CommonResponse<CommentResponseDto>

export type DeleteCommentResponse = CommonResponse<{
    message: string;
}>
