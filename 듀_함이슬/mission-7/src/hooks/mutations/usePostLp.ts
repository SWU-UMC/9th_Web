import { useMutation } from "@tanstack/react-query";
import { postLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostLp() {
    return useMutation({
        mutationFn: postLp,
        onSuccess: (data) => {
            console.log("생성 성공", data);
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps],
            });
        },
    });
}

export default usePostLp;