import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import MovieInfo from "../components/MovieInfo";
import CreditList from "../components/CreditList";
import useMovieDetail from "../hooks/useMovieDetail";

const MovieDetailPage = () => {

    const { movieId } = useParams<{
        movieId: string;
    }>();

    const { movie, credits, isPending, isError } = useMovieDetail(movieId!);

    if (isError) {
        return (
            <div>
                <span className="text-red-500 text-2xl">에러가 발생했습니다</span>
            </div>
        );
    }

    return (
        <>
            {isPending && (
                <div className="flex items-center justify-center h-dvh">
                    <LoadingSpinner />
                </div>)}

            {!isPending && movie && credits && (
                <>
                    {/* 전체 배경 검정*/}
                    <div className="relative rounded-lg overflow-hidden bg-black min-h-screen">
                        <MovieInfo movie={movie} />
                        <CreditList credits={credits} />
                    </div>
                </>

            )}
        </>
    )
};

export default MovieDetailPage;