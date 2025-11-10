import type { CommentListResponseDto } from "../types/comment";
import type { PAGINATION_ORDER } from "../types/common";
import { axiosInstance } from "./axios";

export const getLpComments = async ({
    lpid,
    order,
    cursor,
    limit=10
}: {
    lpid: string;
    order: PAGINATION_ORDER;
    cursor: number | string;
    limit?: number;
}): Promise<CommentListResponseDto> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpid}/comments`,{
        params: {
            order,
            cursor,
            limit,
        },
    });

    return data;
};