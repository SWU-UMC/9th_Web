import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { getLpsList, getLpDetail } from "../apis/lps";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const sort = "latest"; // 정렬 상태 예시

  // ✅ 무한스크롤 쿼리
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["lps", sort],
    queryFn: ({ pageParam = 1 }) => getLpsList({ pageParam, sort }),
    getNextPageParam: (lastPage) =>
      lastPage?.data?.hasNext ? lastPage.data.nextCursor : undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  // ✅ 스크롤 감지
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasNextPage, fetchNextPage]);

  // ✅ 스켈레톤 UI
  const SkeletonCard = () => (
    <div className="w-full h-48 bg-gray-400 animate-pulse rounded-md" />
  );

  return (
    <div className="p-8">
      {/* ✅ 목록 */}
      <ul className="grid grid-cols-4 gap-4">
        {/* 첫 로딩 시 스켈레톤 */}
        {isLoading ? (
          Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />)
        ) : (
          data?.pages.map((page, pageIndex) =>
            page.data.data.map((item: any) => (
              <li
                key={`${pageIndex}-${item.id}`}
                onClick={() => navigate(`/lp/${item.id}`)}
                className="relative rounded-md overflow-hidden group cursor-pointer hover:shadow-lg transition"
              >
                {/* ✅ 썸네일 */}
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-48 bg-gray-200 text-gray-400 text-sm">
                    No Image
                  </div>
                )}

                {/* ✅ hover 정보 */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white bg-gradient-to-t from-black/70 via-transparent to-transparent">
                  <p className="font-semibold text-base truncate">
                    {item.title}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-200 mt-1">
                    <p>
                      {new Date(item.createdAt).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </p>
                    <div className="flex items-center gap-1">
                      ❤️ <span>{item.likeCount ?? 0}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )
        )}
      </ul>

      {/* ✅ 다음 페이지 로딩 시 스켈레톤 표시 */}
      {isFetchingNextPage && (
        <div className="grid grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <SkeletonCard key={`next-${idx}`} />
          ))}
        </div>
      )}

      {/* ✅ 스크롤 트리거 */}
      <div ref={observerRef} className="h-10"></div>
    </div>
  );
};

export default HomePage;