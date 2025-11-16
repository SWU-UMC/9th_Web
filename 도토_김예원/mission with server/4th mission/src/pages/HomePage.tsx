import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { getLpsList } from "../apis/lps";
import type { LpItem } from "../types/lps";
import LpWriteModal from "../components/LpWriteModal";
import useGetLpList from "../hooks/queries/useGetLpList";
import { useNavigate } from "react-router-dom";



// export const HomePage = () => {
//   const navigate = useNavigate();
//   const observerRef = useRef<HTMLDivElement | null>(null);
//   const sort: "latest" | "oldest" = "latest";

//   // 모달
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // ✅ LP 목록 무한스크롤
//   const {
//   data,
//   fetchNextPage,
//   hasNextPage,
//   isFetchingNextPage,
//   isLoading,
// } = useInfiniteQuery({
//   queryKey: ["lps", sort],
//   queryFn: ({ pageParam = 1 }) => getLpsList({ pageParam: pageParam as number, sort }),
//   getNextPageParam: (lastPage) =>
//     lastPage?.data?.hasNext
//       ? (lastPage.data.nextCursor as number | undefined)
//       : undefined,
//   initialPageParam: 1,
//   staleTime: 1000 * 60 * 5,
//   gcTime: 1000 * 60 * 30,
// });

//   // ✅ 무한 스크롤 IntersectionObserver
//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting && hasNextPage) {
//         fetchNextPage();
//       }
//     });

//     const currentRef = observerRef.current;
//     if (currentRef) observer.observe(currentRef);

//     return () => {
//       if (currentRef) observer.unobserve(currentRef);
//     };
//   }, [hasNextPage, fetchNextPage]);

//   // ✅ 스켈레톤 카드
//   const SkeletonCard = () => (
//     <div className="w-full h-48 bg-gray-200 animate-pulse rounded-md" />
//   );

//   return (
//     <div className="p-8">
//       {/* ✅ LP 목록 */}
//       <ul className="grid grid-cols-4 gap-4">
//         {isLoading ? (
//           Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />)
//         ) : (
//           data?.pages.map((page, pageIndex) =>
//             page.data.data.map((item: LpItem) => (
//               <li
//                 key={`${pageIndex}-${item.id}`}
//                 onClick={() => navigate(`/lp/${item.id}`)}
//                 className="relative rounded-md overflow-hidden group cursor-pointer hover:shadow-lg transition"
//               >
//                 {/* ✅ 썸네일 */}
//                 {item.thumbnail ? (
//                   <img
//                     src={item.thumbnail}
//                     alt={item.title}
//                     className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
//                   />
//                 ) : (
//                   <div className="flex items-center justify-center h-48 bg-gray-200 text-gray-400 text-sm">
//                     No Image
//                   </div>
//                 )}

//                 {/* ✅ hover 시 표시 */}
//                 <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white bg-gradient-to-t from-black/70 via-transparent to-transparent">
//                   <p className="font-semibold text-base truncate">
//                     {item.title}
//                   </p>
//                   <div className="flex items-center justify-between text-sm text-gray-200 mt-1">
//                     <p>
//                       {new Date(item.createdAt).toLocaleDateString("ko-KR", {
//                         year: "numeric",
//                         month: "2-digit",
//                         day: "2-digit",
//                       })}
//                     </p>
//                     <div className="flex items-center gap-1">
//                       ❤️ <span>{item.likeCount ?? 0}</span>
//                     </div>
//                   </div>
//                 </div>
//               </li>
//             ))
//           )
//         )}
//       </ul>

//       {/* ✅ 추가 로딩 */}
//       {isFetchingNextPage && (
//         <div className="grid grid-cols-4 gap-4 mt-4">
//           {Array.from({ length: 8 }).map((_, idx) => (
//             <SkeletonCard key={`next-${idx}`} />
//           ))}
//         </div>
//       )}

//       {/* ✅ 스크롤 트리거 */}
//       <div ref={observerRef} className="h-10" />

//       {/* ✅ + 버튼 */}
//       <button
//         onClick={() => setIsModalOpen(true)}
//         className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-800 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl font-bold shadow-lg transition-all"
//       >
//         +
//       </button>

//       {/* ✅ 모달 */}
//       {isModalOpen && <LpWriteModal onClose={() => setIsModalOpen(false)} />}
//     </div>
//   );
// };

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  // 페이지 이동
  const navigate = useNavigate();

  const { data } = useGetLpList({
    search,      // 검색어 전달
    order,
  });

  return (
    <div className="mt-10 mr-5 ml-5">
      <div className="flex justify-between items-center mb-5">
        {/* 검색창 */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색어 입력"
          className="border px-3 py-2 rounded-md w-64"
        />

        {/* 정렬 옵션 */}
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
          className="border px-3 py-2 rounded-md"
        >
          <option value="desc">최신순</option>
          <option value="asc">오래된순</option>
        </select>
      </div>

      {/* 목록 */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        {data?.map((lp) => (
          <div
            key={lp.id}
            onClick={() => navigate(`/lp/${lp.id}`)}
            className="relative group rounded-md overflow-hidden cursor-pointer transition"
          >
            {/* 썸네일 */}
            {lp.thumbnail ? (
              <img
                src={lp.thumbnail}
                alt={lp.title}
                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            {/* hover 시 나타나는 정보*/}
            <div
              className="absolute inset-0 flex flex-col justify-end p-4
      opacity-0 group-hover:opacity-100
      transition-opacity duration-300 text-white
      bg-gradient-to-t from-black/70 via-transparent to-transparent
      pointer-events-none"
            >
              {/* 제목 */}
              <p className="font-semibold text-base truncate">{lp.title}</p>

              <div className="flex items-center justify-between text-sm text-gray-200 mt-1">
                {/* 날짜 */}
                <p>
                  {new Date(lp.createdAt).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>

                <div className="flex items-center gap-1">
                  {/* 좋아요 */}
                  ❤️ <span>{lp.likes?.length ?? 0}</span>
                </div>
              </div>
            </div>
          </div>

        ))}
      </div>
      {/* ✅ + 버튼 */}
       <button
        //  onClick={() => setIsModalOpen(true)}
         className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-800 
             text-white rounded-full w-12 h-12 flex items-center justify-center 
             text-2xl leading-[0] font-bold shadow-lg transition-all"
       >
         +
       </button>
    </div>
  );
};

export default HomePage;
