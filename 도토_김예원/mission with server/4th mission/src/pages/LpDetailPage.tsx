import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { getLpDetail } from "../apis/lps";
import { getLpComments } from "../apis/comments";
import { getMyInfo } from "../apis/auth";

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
  const { lpid } = useParams();
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string | null>(null);
  const [order, setOrder] = useState<"latest" | "oldest">("latest");
  const loadMoreRef = useRef<HTMLDivElement | null>(null); // ✅ 관찰 대상

  // ✅ 로그인 사용자 불러오기
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await getMyInfo();
        setUserName(res.data.name);
      } catch (err) {
        console.error("유저 정보 불러오기 실패:", err);
      }
    };
    fetchUser();
  }, []);

  // ✅ LP 상세정보
  const {
    data: lpDetail,
    isLoading: isLpLoading,
    isError: isLpError,
  } = useQuery({
    queryKey: ["lpDetail", lpid],
    queryFn: async () => {
      const res = await getLpDetail(lpid!);
      return res.data;
    },
    enabled: !!lpid,
  });

  // ✅ 댓글 목록 (무한 스크롤)
  const {
    data: commentPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading: isCommentLoading,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["lpComments", lpid, order],
    queryFn: ({ pageParam = 1 }) =>
      getLpComments({ pageParam, lpId: lpid!, order }),
    getNextPageParam: (lastPage) =>
      lastPage?.data?.hasNext ? lastPage.data.nextCursor : undefined,
    initialPageParam: 1,
    enabled: !!lpid,
  });

  // ✅ 스크롤 하단 감지 → 다음 페이지 로드
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

  // ✅ Skeleton 컴포넌트
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
      {/* LP 상세 정보 */}
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

      {/* 댓글 영역 */}
      <div className="border-t border-gray-300 pt-6 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-800">댓글</h2>
          <div className="space-x-2">
            <button
              onClick={() => setOrder("oldest")}
              className={`px-3 py-1 rounded ${
                order === "oldest"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              오래된순
            </button>
            <button
              onClick={() => setOrder("latest")}
              className={`px-3 py-1 rounded ${
                order === "latest"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              최신순
            </button>
          </div>
        </div>

        {/* 댓글 목록 or Skeleton */}
        {isCommentLoading ? (
          <>
            {Array.from({ length: 5 }).map((_, idx) => (
              <CommentSkeleton key={idx} />
            ))}
          </>
        ) : (
          <ul className="flex flex-col gap-4">
            {commentPages?.pages?.flatMap((page) =>
              page?.data?.data?.map((c: CommentItem) => (
                <li
                  key={c.id}
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
                    </div>
                    <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">
                      {c.content}
                    </p>
                  </div>
                </li>
              ))
            )}

            {/* 하단 로딩 Skeleton (추가 로드 시 표시) */}
            {isFetchingNextPage &&
              Array.from({ length: 3 }).map((_, idx) => (
                <CommentSkeleton key={`loading-${idx}`} />
              ))}
          </ul>
        )}

        {/* 관찰 트리거 (IntersectionObserver용) */}
        <div ref={loadMoreRef} className="h-8" />
      </div>
    </div>
  );
}