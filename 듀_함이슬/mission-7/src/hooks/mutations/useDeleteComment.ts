import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { deleteComment } from "../../apis/comment";

function useDeleteComment() {
    return useMutation({
        mutationFn: deleteComment,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lpComment, variables.lpid]
            });
        },
    });
}

export default useDeleteComment;