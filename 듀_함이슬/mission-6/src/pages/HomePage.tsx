import { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../types/common";
// import LoadingError from "../components/LoadingError";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import LoadingError from "../components/LoadingError";


const HomePage = () => {
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc)
    const { data: lps, isFetching, hasNextPage, isPending, fetchNextPage, isError, refetch }
        = useGetInfiniteLpList(12, search, order)

    // ref -> 특정한 HTML 요소 감시 가능
    // inView -> 그 요소 화면에 보이면 true 아니면 false
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
            <div className="mb-4 flex flex-col sm:flex-row sm:justify-end sm:items-center items-end gap-4">
                <button onClick={() => setOrder(PAGINATION_ORDER.asc)}
                    className={`px-4 p-1 rounded-md cursor-pointer
                    ${order === PAGINATION_ORDER.asc ? 'bg-black text-white' : 'bg-white text-black'}`}>오래된순</button>
                <button onClick={() => setOrder(PAGINATION_ORDER.desc)}
                    className={`px-4 p-1 rounded-md cursor-pointer
                    ${order === PAGINATION_ORDER.desc ? 'bg-black text-white' : 'bg-white text-black'}`}>최신순</button>
            </div>
            <div className="container mx-auto px-4 py-6 ">
                <div className="p-5 gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    <LoadingError
                        isPending={isPending}
                        isError={isError}
                        isFetching={isFetching}
                        refetch={refetch}
                        skeleton={<LpCardSkeletonList count={20} />}>
                        {lps?.pages?.map((page) => page.data.data)?.flat()?.map((lp) => <LpCard key={lp.id} lp={lp} />)}
                    </LoadingError>
                </div>
            </div>
            <div ref={ref} className="h-2">
                {isFetching && (<div className="p-5 gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    <LpCardSkeletonList count={12} />
                </div>)}
            </div>
        </>
    );

};

export default HomePage;