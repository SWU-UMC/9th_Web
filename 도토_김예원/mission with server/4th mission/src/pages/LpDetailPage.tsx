import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getLpDetail } from "../apis/lps";
import { getLpComments } from "../apis/comments";

import { useCreateComment } from "../hooks/useCreateComment";
import { LikeButton } from "../components/LikeButton";

import { getMyProfile } from "../apis/user";
import { useMyProfile } from "../hooks/useMyProfile";
import { useLpDetail } from "../hooks/useLpDetail";

interface Author {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
}

interface CommentItem {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

export default function LpDetailPage() {
  // const { lpid } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [userName, setUserName] = useState<string | null>(null);
  const [order, setOrder] = useState<"latest" | "oldest">("latest");
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const commentTopRef = useRef<HTMLDivElement | null>(null);
  const [commentContent, setCommentContent] = useState("");


  // 
  // 코드 새로 작성하고 있숴요
  // 
  const { lpid } = useParams();

  // 유저 정보 훅에서 불러오기
  const { user, isLoading } = useMyProfile();

  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setUserId(user.id);
    }
  }, [user]);

  // LP 상세조회 훅에서 부르기
  const {
    data: lpDetail,
    isLoading: isLpLoading,
    isError: isLpError,
  } = useLpDetail(lpid);


  // ✅ userId 상태 추가
  const [userId, setUserId] = useState<number | null>(null);

  // ✅ 댓글 목록 무한스크롤
  const {
    data: commentPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isCommentLoading,
  } = useInfiniteQuery({
    queryKey: ["lpComments", lpid, order],
    queryFn: ({ pageParam = 1 }) =>
      getLpComments({ pageParam, lpId: lpid!, order }),
    getNextPageParam: (lastPage) =>
      lastPage?.data?.hasNext ? lastPage.data.nextCursor : undefined,
    initialPageParam: 1,
    enabled: !!lpid,
  });

  // ✅ 댓글 작성 Mutation
  const { mutate: createComment, isPending } = useCreateComment(lpid!);

  // ✅ 무한스크롤 감시
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // ✅ 댓글 로딩 시 스켈레톤
  const CommentSkeleton = () => (
    <div className="flex items-start gap-3 border-b border-gray-200 pb-3 animate-pulse">
      <div className="w-9 h-9 bg-gray-300 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
        <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
        <div className="w-2/3 h-3 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  if (isLpLoading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500">
        불러오는 중...
      </div>
    );
  if (isLpError || !lpDetail)
    return (
      <div className="text-center text-gray-500 py-20">
        데이터를 불러올 수 없습니다.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 mt-8">
      {/* ===================== LP 상세 정보 ===================== */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-700 font-semibold">
          {userName ?? "로그인 필요"}
        </span>
        <span className="text-gray-400 text-sm">
          {lpDetail.createdAt?.slice(0, 10)}
        </span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {lpDetail.title}
      </h1>

      {lpDetail.thumbnail && (
        <img
          src={lpDetail.thumbnail}
          alt={lpDetail.title}
          className="w-full rounded-lg shadow-md mb-6 object-contain max-h-[600px]"
        />
      )}

      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {lpDetail.content}
      </p>
      {/* ✅ 좋아요 버튼 */}
      {lpDetail.likes && (
        <div className="flex justify-end mb-4">
          <LikeButton
            lpId={Number(lpid)}
            isLiked={lpDetail.likes.some((like: any) => like.userId === userId)}
            likeCount={lpDetail.likes.length}
            userId={userId!} // ✅ 로그인 유저 id 전달
          />
        </div>
      )}


      {/* ===================== 댓글 영역 ===================== */}
      <div className="border-t border-gray-300 pt-6 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-800">댓글</h2>
          <div className="space-x-2">
            <button
              onClick={() => setOrder("oldest")}
              className={`px-3 py-1 rounded ${order === "oldest"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
                }`}
            >
              오래된순
            </button>
            <button
              onClick={() => setOrder("latest")}
              className={`px-3 py-1 rounded ${order === "latest"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
                }`}
            >
              최신순
            </button>
          </div>
        </div>

        {/* ✅ 댓글 입력창 */}
        <div ref={commentTopRef} className="mb-5 flex items-center gap-2">
          <input
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="댓글을 입력하세요"
            className="flex-1 border rounded-md px-3 py-2 text-sm text-gray-800"
          />
          <button
            onClick={() => {
              if (!commentContent.trim()) return;
              createComment(commentContent, {
                onSuccess: (newComment) => {
                  console.log("🟢 댓글 등록 성공:", newComment);

                  // ✅ 서버 응답에서 받은 댓글 데이터
                  const newItem = newComment?.data ?? newComment;

                  // ✅ author 객체가 없으면 기본 작성자 정보 추가
                  const fixedComment = {
                    ...newItem,
                    author: {
                      id: newItem.authorId,
                      name: userName ?? "익명", // 현재 로그인한 사용자 이름
                      email: "", // 이메일 필요 없으면 빈 문자열
                    },
                  };

                  // ✅ 캐시에 바로 반영
                  queryClient.setQueryData(["lpComments", lpid, order], (oldData: any) => {
                    if (!oldData) return oldData;

                    return {
                      ...oldData,
                      pages: [
                        {
                          ...oldData.pages[0],
                          data: {
                            ...oldData.pages[0].data,
                            data: [fixedComment, ...(oldData.pages[0].data.data ?? [])],
                          },
                        },
                        ...oldData.pages.slice(1),
                      ],
                    };
                  });

                  setCommentContent("");

                  // ✅ 서버 새로고침 (안전하게 최신화)
                  queryClient.invalidateQueries({
                    queryKey: ["lpComments", lpid],
                    exact: false,
                  });
                },
              });
            }}
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-semibold disabled:opacity-50"
          >
            {isPending ? "등록 중..." : "등록"}
          </button>
        </div>

        {/* ✅ 댓글 목록 */}
        {isCommentLoading ? (
          <>
            {Array.from({ length: 5 }).map((_, idx) => (
              <CommentSkeleton key={idx} />
            ))}
          </>
        ) : (
          <ul className="flex flex-col gap-4">
            {commentPages?.pages?.map((page, pageIndex) =>
              page?.data?.data?.map((c: CommentItem) => (
                <li
                  key={`${pageIndex}-${c.id}`}
                  className="flex items-start gap-3 border-b border-gray-200 pb-3"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-600 text-white font-semibold">
                    {c.author?.name?.charAt(0).toUpperCase() ?? "?"}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-gray-900">
                        {c.author?.name ?? "익명"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(c.createdAt).toLocaleString("ko-KR", {
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">
                      {c.content}
                    </p>
                  </div>
                </li>
              ))
            )}
            {isFetchingNextPage &&
              Array.from({ length: 3 }).map((_, idx) => (
                <CommentSkeleton key={`loading-${idx}`} />
              ))}
          </ul>
        )}

        <div ref={loadMoreRef} className="h-8" />
      </div>
    </div>
  );
}
