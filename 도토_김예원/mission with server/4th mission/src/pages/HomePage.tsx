import { useState, useEffect } from "react";
import LpWriteModal from "../components/LpWriteModal";
import useGetLpList from "../hooks/queries/useGetLpList";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeleton from "../components/LpCard/LpCardSkeleton";

const HomePage = () => {
  const [search, setSearch] = useState("");

  // debounce 처리
  const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);
  const trimmed = debouncedValue.trim();

  const [order, setOrder] = useState<"asc" | "desc">("desc");

  // 페이지 이동
  // const navigate = useNavigate();

  // 
  // useQuery를 이용한 부분 ver1 - debounce고려 이전
  // 
  // 이렇게 작성하면 초기 화면에 데이터를 안 불러오는 오류 발생
  // const { data } = useGetLpList({
  //   //  검색어 전달
  //   // search,     
  //   // search: debouncedValue,
  //   search: trimmed,
  //   order,
  //   // 비어 있으면 실행 안함
  //   enabled: trimmed.length > 0,
  // });

  // 
  // useQuery를 이용한 부분 ver2 - debounce고려 이후
  // 
  // 검색어가 있을 때 없을 때 2가지 경우로 나누어서 진행하는 방식으로 수정
  // 검색어가 없을 때 >> 전체 목록 쿼리 실행
  // const {
  //   data: defaultList,
  //   isLoading: isDefaultLoading,
  //   isError: isDefaultError,
  //  } = useGetLpList({
  //     search: undefined,
  //     order,
  //     enabled: trimmed.length === 0,
  //   });

  //  검색어가 있을 때 >> 검색된 목록 쿼리 실행
  // const {
  //   data: searchList,
  //   isLoading: isSearchLoading,
  //   isError: isSearchError,
  // } = useGetLpList({
  //   search: trimmed,
  //   order,
  //   // 검색어가 있는데 공백인 경우 쿼리 실행 x
  //   enabled: trimmed.length > 0,
  // });

  // useInfitniteQuery를 이용한 부분
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteLpList({
    search: trimmed.length ? trimmed : undefined,
    order,
  });

  const lpList = data?.pages.flatMap((page) => page.data.data) ?? [];

  // 무한 스크롤 관찰
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px 0px 200px 0px",
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // 어떤 목록을 보여줄지 결정
  // useQuery를 이용한 부분 ver2 - debounce고려 이후
  // const list = trimmed.length > 0 ? searchList : defaultList;

  // 로딩 및 에러 처리
  // 
  // useQuery를 이용한 부분 ver2 - debounce고려 이후
  // const isLoading = trimmed.length > 0 ? isSearchLoading : isDefaultLoading;
  // const isError = trimmed.length > 0 ? isSearchError : isDefaultError;
  // 
  // useInfitniteQuery를 이용한 부분
  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;

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
        {lpList?.map((lp) => (
          <LpCard key={lp.id} lp={lp} />
        ))}

        {/* 스켈레톤 ui 추가 */}
        {isFetchingNextPage &&
          Array.from({ length: 8 }).map((_, i) => (
            <LpCardSkeleton key={`sk-${i}`} />
          ))}

        {/* 무한 스크롤 트리거 */}
        <div ref={ref} className="h-10" />

      </div>
      
      {/* 플로팅 버튼 */}
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
