import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type credits, type MovieDetail } from "../types/movie";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";
import MovieInfo from "../components/MovieInfo";
import CreditList from "../components/CreditList";

const MovieDetailPage = () => {

    const [movie, setMovie] = useState<MovieDetail>();

    const [credits, setCredits] = useState<credits>();

    const [isPending, setIsPending] = useState(false);

    const [isError, setIsError] = useState(false);

    const { movieId } = useParams<{
        movieId: string;
    }>();

    useEffect(() => {
        const fetchMovieAndCredits = async () => {
            setIsPending(true);

            try {
                const { data: movieData } = await axios.get<MovieDetail>(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
                    {
                        headers: {
                            "Authorization": `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );
                setMovie(movieData);

                const { data: creditsData } = await axios.get<credits>(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
                    {
                        headers: {
                            "Authorization": `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );
                setCredits(creditsData);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };
        fetchMovieAndCredits();
    }, [movieId]);

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
                        <MovieInfo movie={movie} />ㄴ
                        <CreditList credits={credits} />
                    </div>
                </>

            )}
        </>
    )
};

export default MovieDetailPage;