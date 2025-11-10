import LoadingError from "../components/LoadingError";
import { LoadingSpinner } from "../components/LoadingSpinner";
import LpComment from "../components/LpCard/LpComment";
import useGetLpDetail from "../hooks/queries/useGetLpDetail"

const LpDetailPage = () => {
    const { data: lp, isPending, isError, refetch, isFetching } = useGetLpDetail();

    const likesCount = lp?.data.likes?.length ?? 0;

    return (
        <LoadingError
            isPending={isPending}
            isError={isError}
            isFetching={isFetching}
            refetch={refetch}
            skeleton={<LoadingSpinner/>}>
            {lp &&
                <div className="min-h-screen bg-gray-700 text-white max-w-3xl mx-auto p-6 sm:p-10 md:p-12 rounded-lg my-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-start gap-2">
                            <img src={lp.data.author.avatar} alt={lp.data.author.name}
                            className="w-4 h-4 rounded-full" />
                            <p className="text-lg">{lp.data.author.name}</p>
                        </div>
                        <div>
                        </div>
                        <p className="text-sm">{new Date(lp.data.createdAt).toLocaleDateString('ko-KR')}</p>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-lg max-w-[70%]">{lp.data.title}</p>
                        <div className="flex gap-2 flex-shrink-0">
                            <button className="cursor-pointer">수정</button>
                            <button className="cursor-pointer">삭제</button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="relative flex justify-center items-center w-80 h-80 bg-gray-700 rounded-md mb-6 overflow-hidden shadow-lg shadow-black">
                            <img src={lp.data.thumbnail}
                                alt={`${lp.data.title} LP 이미지`}
                                className="w-64 h-64 object-cover rounded-full border-2 border-black" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-white rounded-full border-1 border-black"></div>
                            </div>
                        </div>
                    </div>
                    <p className="whitespace-pre-wrap">{lp.data.content}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {lp.data.tags.map((tag) =>
                        (<span key={tag.id} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                            # {tag.name}</span>))}
                    </div>
                    <button className="flex flex-col items-center gap-2 cursor-pointer mb-4 mx-auto">
                        {likesCount}❤️
                    </button>
                    <div className="pt-20">
                        <LpComment lpid={lp.data.id.toString()} />
                    </div>
                </div>
            }

        </LoadingError>
    )
}

export default LpDetailPage;
