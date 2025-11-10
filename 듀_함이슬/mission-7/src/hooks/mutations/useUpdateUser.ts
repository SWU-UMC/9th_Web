import { useMutation } from "@tanstack/react-query";
import { updateMyInfo } from "../../apis/auth";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseMyInfoDto, UpdateUserDto } from "../../types/auth";

function useUpdateUser() {
    return useMutation({
        mutationFn: updateMyInfo,

        onMutate: async (newUserData: UpdateUserDto) => {
            await queryClient.cancelQueries({
                queryKey: [QUERY_KEY.myInfo],
            });

            const previousMyInfo = queryClient.getQueryData<ResponseMyInfoDto>([
                QUERY_KEY.myInfo
            ]);

            if (previousMyInfo) {
                const newMyInfo = {
                    ...previousMyInfo, data: {
                        ...previousMyInfo.data, // 기존 user info
                        ...newUserData, // 새로 변경된 { name, bio } 등
                    },
                };

                queryClient.setQueryData([QUERY_KEY.myInfo], newMyInfo);
            }

            return { previousMyInfo };

        },
        onError: (err, variables, context) => {
            console.log("업데이트 실패", err);
            if (context?.previousMyInfo) {
                queryClient.setQueryData([QUERY_KEY.myInfo],
                    context?.previousMyInfo,
                );
            }
        },

        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.myInfo],
            });
        },
    });
}

export default useUpdateUser;