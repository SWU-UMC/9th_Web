import { useMutation } from "@tanstack/react-query";
import { postComment } from "../../apis/comment";
import { queryClient } from "../../App";
import type { CommentResponseDto } from "../../types/comment";
import { QUERY_KEY } from "../../constants/key";

function usePostComment() {
    return useMutation({
        mutationFn: postComment,
        onSuccess: (data: CommentResponseDto) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lpComment, data.lpId]
            });
        },
    });
}

export default usePostComment;