import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App";
import type { ResponseMyInfoDto } from "../../types/auth";
import type { Likes, RequestLPDto, ResponseLPDto } from "../../types/lp";

function usePostLike() {
    return useMutation({
        mutationFn: postLike,
        onMutate: async (lp: RequestLPDto) => {
            // 1. 이 게시글에 관련된 쿼리 취소 (캐시된 데이터 새로 불러오는 요청)
            await queryClient.cancelQueries({
                queryKey: [QUERY_KEY.lps, lp.lpid],
            });

            // 2. 현재 게시글의 데이터를 캐시에서 가져와야
            const previousLpPost = queryClient.getQueryData<ResponseLPDto>([
                QUERY_KEY.lps, lp.lpid
            ]);

            // 3. 게시글 데이터 복사해서 newLpPost라는 새로운 객체 생성
            // 복사 이유: 나중에 오류 발생했을 때 이전 상태로 되돌리기 위해서
            const newLpPost = { ...previousLpPost };

            // 4. 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요 위치 찾기
            const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
            const userId = Number(me?.data.id);

            const likedIndex = previousLpPost?.data.likes.findIndex(
                (like) => like.userId === userId,
            ) ?? -1;

            if (likedIndex >= 0) {
                previousLpPost?.data.likes.splice(likedIndex, 1);
            } else {
                const newLike = { userId, lpId: lp.lpid } as Likes;
                previousLpPost?.data.likes.push(newLike);
            }

            // 5. 업데이트된 게시글 캐시에 저장
            // 이렇게하면 UI 바로 업데이트됨. 사용자가 바로 확인 가능
            queryClient.setQueryData([QUERY_KEY.lps, lp.lpid], newLpPost)

            return { previousLpPost, newLpPost };
        },

        onError: (err, newLp, context) => {
            console.log(err, newLp);
            queryClient.setQueryData([QUERY_KEY.lps, newLp.lpid],
                context?.previousLpPost?.data.id,
            );
        },

        // onSettled는 API 요청이 끝난 후 실행
        onSettled: async (data, error, variables) => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps, variables.lpid],
            });
        },
    });
}

export default usePostLike;