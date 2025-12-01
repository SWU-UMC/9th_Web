import { useEffect, useMemo, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../types/common";
import LoadingError from "../components/LoadingError";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import LpCard from "../components/LpCard/LpCard";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";
import { useInView } from "react-intersection-observer";
import useThrottle from "../hooks/useThrottle";


const SearchPage = () => {
    const [search, setSearch] = useState("");
    const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);
    const order = PAGINATION_ORDER.asc

    // 검색어 비어있는지 확인
    const isSearchEmpty = !debouncedValue.trim();

    const { data: lps, isFetching, isPending, isError, refetch, fetchNextPage, hasNextPage } =
        useGetInfiniteLpList(12, debouncedValue, order, {
            enabled: !isSearchEmpty,
        });

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const throttlesInView = useThrottle(inView, 500);

    useEffect(() => {
        if (throttlesInView && !isFetching && hasNextPage) {
            fetchNextPage();
        }
    }, [throttlesInView, isFetching, hasNextPage, fetchNextPage]);

    // 검색어 입력 최적화
    const flatLps = useMemo(() => {
        return lps?.pages?.map((page) => page.data.data)?.flat() || [];
    }, [lps]);
    
    return (
        <>
            <div>
                <input
                    className={"border p-2 rounded-sm mx-10"}
                    placeholder="검색어를 입력하시오"
                    value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            {!isSearchEmpty && (
                <div className="container mx-auto px-4 py-6 ">
                    <div className="p-5 gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        <LoadingError
                            isPending={isPending}
                            isError={isError}
                            isFetching={isFetching}
                            refetch={refetch}
                            skeleton={<LpCardSkeletonList count={12} />}>
                            {flatLps.map((lp) => <LpCard key={lp.id} lp={lp} />)}
                        </LoadingError>
                    </div>
                    <div ref={ref} className="h-2">
                        {!isPending && isFetching && (<div className="p-5 gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                            <LpCardSkeletonList count={12} />
                        </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default SearchPage;

