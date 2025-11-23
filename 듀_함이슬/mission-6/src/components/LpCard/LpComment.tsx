import { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../../types/common";
import useGetInfiniteComment from "../../hooks/queries/useGetInfiniteComment";
import { useInView } from "react-intersection-observer";
import LoadingError from "../LoadingError";
import LpCommentSkeletonList from "./LpCommentSkeletonList";

interface LpCommentProps {
  lpid: string;
}

const LpComment = ({ lpid }: LpCommentProps) => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc)
  const { data: comment, isFetching, hasNextPage, isPending, fetchNextPage, isError, refetch }
    = useGetInfiniteComment(lpid, order)

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

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


      <form className="mb-6">
        <div className="flex items-start gap-2">
          <textarea
            className="flex-grow rounded-sm bg-gray-700 border border-white 
          text-white placeholder-gray-500 h-9 resize-none"
            placeholder="댓글을 입력해주세요."></textarea>
          <button className="bg-gray-500 text-white rounded-sm 
          w-15 h-9 cursor-pointer flex-shrink-0">작성</button>

        </div>
      </form>

      <LoadingError
        isPending={isPending}
        isError={isError}
        isFetching={isFetching}
        refetch={refetch}
        skeleton={<LpCommentSkeletonList count={3} />}>
        {comment?.pages?.map((page) => page.data.data)?.flat()?.map((comment) =>
          <div key={comment.id} className="flex items-start gap-3 p-4 pt-5">
            <img src={comment.author.avatar} alt={comment.author.name}
              className="w-10 h-10 rounded-full flex-shrink-0" />
            <div className="flex-grow">
              <p className="font-blold text-white text-md">{comment.author.name}</p>
              <p className="text-white text-sm mt-1">{comment.content}</p>
            </div>
          </div>)}
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
