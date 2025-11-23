import { useMutation } from "@tanstack/react-query";
import { updateLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useUpdateLp() {
    return useMutation({
        mutationFn: updateLp,
        onSuccess: (data, variables) => {
            console.log("수정 성공", data);
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lp, variables.lpid]
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps]
            });
        },
    });
}

export default useUpdateLp;