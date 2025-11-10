import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useDeleteLP() {
    return useMutation ({
        mutationFn: deleteLp,
        onSuccess: (data, lpid) => {
            console.log("삭제 성공", data);
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lp, lpid],
            });
        },
    });
}

export default useDeleteLP;