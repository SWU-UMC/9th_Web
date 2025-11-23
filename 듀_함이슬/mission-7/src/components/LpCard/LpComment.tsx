import { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../../types/common";
import useGetInfiniteComment from "../../hooks/queries/useGetInfiniteComment";
import { useInView } from "react-intersection-observer";
import LoadingError from "../LoadingError";
import LpCommentSkeletonList from "./LpCommentSkeletonList";
import usePostComment from "../../hooks/mutations/usePostComment";
import useGetMyInfo from "../../hooks/queries/useGetMyInfo";
import useUpdateComment from "../../hooks/mutations/useUpdateComment";
import useDeleteComment from "../../hooks/mutations/useDeleteComment";
import LpCommentItem from "./LpCommentItem";


interface LpCommentProps {
  lpid: number;
}

const LpComment = ({ lpid }: LpCommentProps) => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc);
  const [text, setText] = useState(""); // 댓글 생성 state

  // 쿼리 훅
  const { data: comment, isFetching, hasNextPage, isPending, fetchNextPage, isError, refetch }
    = useGetInfiniteComment(lpid, order);

  // 내 정보 가져오기
  const { data: me } = useGetMyInfo();

  // 뮤테이션 훅
  const { mutate: createComment, isPending: isCreating } = usePostComment();
  const { mutate: updateComment } = useUpdateComment();
  const { mutate: deleteComment } = useDeleteComment();

  // 무한 스크롤
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const handleSubmitCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim().length === 0 || isCreating) return;

    createComment({
      lpid: lpid,
      newComment: { content: text }
    }, {
      onSuccess: () => {
        setText("");
      }
    });
  };

  const handleUpdate = (commentId: number, newContent: string) => {
    updateComment({
      lpid: lpid,
      commentId: commentId,
      updatedContent: { content: newContent }
    });
  };

  const handleDelete = (commentId: number) => {
    deleteComment({ lpid: lpid, commentId: commentId });
  };

  return (
    <>

      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">댓글</h2>

        <div className="flex gap-4">
          <button onClick={() => setOrder(PAGINATION_ORDER.asc)}
            className={`px-4 p-1 rounded-md cursor-pointer
                    ${order === PAGINATION_ORDER.asc ? 'bg-black text-white' : 'bg-white text-black'}`}>오래된순</button>
          <button onClick={() => setOrder(PAGINATION_ORDER.desc)}
            className={`px-4 p-1 rounded-md cursor-pointer
                    ${order === PAGINATION_ORDER.desc ? 'bg-black text-white' : 'bg-white text-black'}`}>최신순</button>
        </div>
      </div>


      <form className="mb-6" onSubmit={handleSubmitCreate}>
        <div className="flex items-start gap-2">
          <textarea
            className="flex-grow rounded-sm bg-gray-700 border border-white 
          text-white placeholder-gray-500 h-9 resize-none"
            placeholder="댓글을 입력해주세요."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isCreating} />
          <button type="submit"
            className="bg-gray-500 text-white rounded-sm 
          w-15 h-9 cursor-pointer flex-shrink-0"
            disabled={isCreating}>작성</button>

        </div>
      </form>

      <LoadingError
        isPending={isPending}
        isError={isError}
        isFetching={isFetching}
        refetch={refetch}
        skeleton={<LpCommentSkeletonList count={3} />}>

        {/* 컴포넌트 분리 */}
        {comment?.pages?.map((page) => page.data.data)?.flat()?.map((comment) => (
          <LpCommentItem
            key={comment.id}
            comment={comment}
            currentUserId={me?.data.id || 0}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </LoadingError>


      <div ref={ref} className="h-2">
        {isFetching && hasNextPage && (
          <LpCommentSkeletonList count={3} />
        )}
      </div>
    </>
  );
};

export default LpComment;
