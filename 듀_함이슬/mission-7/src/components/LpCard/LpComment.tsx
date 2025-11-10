import { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../../types/common";
import useGetInfiniteComment from "../../hooks/queries/useGetInfiniteComment";
import { useInView } from "react-intersection-observer";
import LoadingError from "../LoadingError";
import LpCommentSkeletonList from "./LpCommentSkeletonList";
import usePostComment from "../../hooks/mutations/usePostComment";
import type { CommentResponseDto } from "../../types/comment";
import useGetMyInfo from "../../hooks/queries/useGetMyInfo";
import useUpdateComment from "../../hooks/mutations/useUpdateComment";
import useDeleteComment from "../../hooks/mutations/useDeleteComment";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";


interface LpCommentProps {
  lpid: number;
}

const LpComment = ({ lpid }: LpCommentProps) => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc);
  const [text, setText] = useState(""); // 댓글 생성 state

  // 댓글 수정을 위한 state
  const [editingComment, setEditingComment] = useState<CommentResponseDto | null>(null);

  // 댓글 메뉴 버튼 state
  const [openMenuCommentId, setOpenMenuCommentId] = useState<number | null>(null);

  // 쿼리 훅
  const { data: comment, isFetching, hasNextPage, isPending, fetchNextPage, isError, refetch }
    = useGetInfiniteComment(lpid, order);

  // 내 정보 가져오기
  const { data: me } = useGetMyInfo();

  // 뮤테이션 훅
  const { mutate: createComment, isPending: isCreating } = usePostComment();
  const { mutate: updateComment, isPending: isUpdating } = useUpdateComment();
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();

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

  const handleSubmitUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingComment || editingComment.content.trim().length === 0 || isUpdating) return;

    updateComment({
      lpid: lpid,
      commentId: editingComment.id,
      updatedContent: { content: editingComment.content }
    }, {
      onSuccess: () => {
        setEditingComment(null);
        setOpenMenuCommentId(null);
      }
    });
  };

  const handleDelete = (commentId: number) => {
    deleteComment({ lpid: lpid, commentId: commentId },
      {
        onSuccess: () => {
          setOpenMenuCommentId(null);
        }
      }
    );
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

        {/* 댓글 작성자인지, 수정 중인 댓글인지 여부 */}
        {comment?.pages?.map((page) => page.data.data)?.flat()?.map((comment) => {
          const isAuthor = me?.data.id === comment.author.id;
          const isEditing = editingComment?.id === comment.id;

          return (
            // 댓글 작성자 아바타와 이름
            <div key={comment.id} className="flex items-start gap-3 p-4 pt-5 relative">
              <img src={comment.author.avatar} alt={comment.author.name}
                className="w-10 h-10 rounded-full flex-shrink-0" />
              <div className="flex-grow">
                <p className="font-bold text-white text-md">{comment.author.name}</p>

                {/* 댓글 보여주거나 수정  */}
                {isEditing ? (
                  // 수정 
                  <form onSubmit={handleSubmitUpdate}>
                    <textarea
                      className="w-full rounded-sm bg-gray-600 border border-white 
                      text-white placeholder-gray-500 h-9 resize-none mt-1"
                      value={editingComment?.content || ""}
                      onChange={(e) => editingComment && setEditingComment({ ...editingComment, content: e.target.value })} />

                    <div className="flex gap-2 mt-2">
                      <button
                        type="submit"
                        className="text-sm text-green-400 cursor-pointer"
                        disabled={isUpdating} >저장</button>
                      <button
                        type="button"
                        onClick={() => setEditingComment(null)}
                        className="text-sm text-gray-400 cursor-pointer">취소</button>
                    </div>
                  </form>
                ) : (
                  // 일반
                  <p className="text-white text-sm mt-1 whitespace-pre-wrap">{comment.content}</p>
                )}
              </div>

              {/* "..." 메뉴 */}
              {isAuthor && !isEditing && (
                <div className="absolute top-4 right-4">
                  <button onClick={() => setOpenMenuCommentId(openMenuCommentId === comment.id ? null : comment.id)}>
                    <MoreVertical size={16} className="text-gray-400 cursor-pointer" />
                  </button>

                  {/* 팝업 메뉴 */}
                  {openMenuCommentId === comment.id && (
                    <div className="absolute top-6 right-0 bg-gray-800 rounded-md shadow-lg z-10 w-20 border border-gray-700 p-1 flex gap-1">
                      <button
                        onClick={() => {
                          setEditingComment(comment);
                          setOpenMenuCommentId(null);
                        }}
                        className="p-2 text-sm cursor-pointer">
                        <Pencil size={14} />
                      </button>

                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="p-2 text-sm cursor-pointer"
                        disabled={isDeleting}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
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
