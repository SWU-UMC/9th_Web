import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMyProfile } from "../hooks/queries/useMyProfile";
import { useLpDetail } from "../hooks/queries/useLpDetail";
import { useLpComments } from "../hooks/queries/useLpComments";
import { useCreateComment } from "../hooks/useCreateComment";
import LoadingPage from "./LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import { Comment } from "../components/Comment/Comment";
import { CommentSkeleton } from "../components/Comment/CommentSkeleton";
import { useLpCommentsInfinite } from "../hooks/queries/useLpCommentsInfinite";
import { useInView } from "react-intersection-observer";

export default function NewLpDetailPage() {
  const { lpid } = useParams<{ lpid: string }>();

  // 사용자 정보 불러오기
  const { user } = useMyProfile();
  const userName = user?.name ?? "";

  // 최신, 오래된 순
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  // LP 상세 정보 가져오기
  const {
    data: lpDetail,
    isLoading: isLpLoading,
    isError: isLpError,
  } = useLpDetail(lpid);

  // 
  // useQuery를 이용한 부분 
  // 
  // 댓글들 불러오기
  // const {
  //   data: commentList,
  //   refetch: refetchComments,
  //   isLoading: isCommentLoading,
  //   isError: isCommentError,
  // } = useLpComments(lpid, order);

  // useInfitniteQuery를 이용한 부분
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isCommentLoading,
    isError: isCommentError,
  } = useLpCommentsInfinite(lpid!, order);

  // 무한 스크롤 트리거
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // 
  // 댓글 작성
  // 여기는 이따가
  // 
  const { mutate: createComment, isPending } = useCreateComment(lpid!);
  const [commentContent, setCommentContent] = useState("");

  const handleSubmitComment = () => {
    if (!userName) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!commentContent.trim()) return;

    createComment(commentContent, {
      onSuccess: () => {
        setCommentContent("");
        // refetchComments();
      },
    });
  };

  // 로딩 및 에러 처리 _ LP 상세만 고려
  if (isLpLoading) return <LoadingPage />;
  if (isLpError) return <ErrorPage />;



  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 mt-8">

      {/* LP 상세 정보  */}
      <div className="flex justify-between items-center mb-4">
        {/* 사용자 이름 */}
        <span className="text-gray-600 ">
          {userName || "로그인 필요"}
        </span>
        {/* 게시 날짜 */}
        <span className="text-gray-400 text-sm">
          {lpDetail.createdAt?.slice(0, 10)}
        </span>
      </div>

      {/* lp 제목 */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {lpDetail.title}
      </h1>

      {/* 썸네일 lp판처럼 보이도록 */}
      <div className="flex justify-center my-8 ">
        <div className="relative w-[300px] h-[300px] rounded-full bg-black shadow-lg overflow-hidden">

          {/* LP Thumbnail 이미지 */}
          <img
            src={lpDetail.thumbnail}
            alt="LP Thumbnail"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* 중앙 CD 구멍 */}
          <div className="absolute top-1/2 left-1/2 w-14 h-14 bg-white rounded-full shadow-inner -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-10 line-clamp-3">
        {lpDetail.content}
      </p>

      {/* ===================== 좋아요 버튼 ===================== */}
      <div className="flex justify-end mb-8">
        <button
          onClick={async () => {
            try {
              const res = await fetch(
                `${import.meta.env.VITE_SERVER_API_URL}/lps/${lpid}/like`,
                {
                  method: "POST",
                  credentials: "include", // 토큰 쿠키 기반이면 필요
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              const data = await res.json();
              if (!res.ok) {
                alert("좋아요 요청 실패");
                return;
              }

              // 성공 시 화면에서 즉시 반영
              // lpDetail likes를 직접 수정해야 함
              lpDetail.likes = data.data.likes;


            } catch (e) {
              console.error(e);
            }
          }}
          className="flex items-center gap-1 bg-white border border-gray-300 hover:bg-gray-100 px-3 py-1 rounded-md"
        >
          ❤️ {lpDetail.likes.length}
        </button>
      </div>

      {/* 댓글 영역 */}
      <div className="border-t border-gray-300 pt-6">
        <h2 className="font-semibold text-gray-800 mb-4">댓글</h2>

        {/* 최신, 오래된 순 선택 버튼  */}
        <div className="flex items-center gap-3 mb-4 text-sm">
          <button
            className={`px-3 py-1 rounded-md border ${order === "desc" ? "bg-blue-600 text-white border-blue-600" : "border-gray-300"
              }`}
            onClick={() => setOrder("desc")}
          >
            최신순
          </button>

          <button
            className={`px-3 py-1 rounded-md border ${order === "asc" ? "bg-blue-600 text-white border-blue-600" : "border-gray-300"
              }`}
            onClick={() => setOrder("asc")}
          >
            오래된순
          </button>
        </div>

        {/* 댓글 입력 */}
        <div className="flex items-center gap-4 mb-6">
          <input
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="댓글을 입력하세요"
            className="flex-1 border rounded-md px-3 py-2 text-sm"
          />

          <button
            onClick={handleSubmitComment}
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-semibold disabled:opacity-50"
          >
            등록
          </button>
        </div>

        {/* 댓글 목록 */}
        {isCommentLoading ? (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <CommentSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {/* useQuery를 이용한 부분 */}
            {/* <Comment comments={commentList ?? []} /> */}

            {/* useInfinitQuery를 이용한 부분 */}
            {data?.pages?.map((page, i) => (
              <Comment
                key={i}
                comments={page.data.data} // 댓글 리스트
              />
            ))}

            {/* 관찰용 div_이 div가 화면에 보이면 다음 부분 로드 */}
            <div ref={ref} className="h-10"></div>

            {/* 다음 페이지 불러오는 중_스켈레톤 UI */}
            {isFetchingNextPage && (
              <div className="flex flex-col gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <CommentSkeleton key={i} />
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
