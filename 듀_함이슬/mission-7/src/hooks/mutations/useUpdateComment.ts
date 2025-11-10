import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import type { CommentResponseDto } from "../../types/comment";
import { QUERY_KEY } from "../../constants/key";
import { updateComment } from "../../apis/comment";

function useUpdateComment() {
    return useMutation({
        mutationFn: updateComment,
        onSuccess: (data: CommentResponseDto) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lpComment, data.lpId]
            });
        },
    });
}

export default useUpdateComment;