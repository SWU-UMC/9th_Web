import { useEffect, useState } from "react";
import type { credits, MovieDetail } from "../types/movie";
import axios from "axios";

function useMovieDetail(movieId: string) {
    const [movie, setMovie] = useState<MovieDetail>();

    const [credits, setCredits] = useState<credits>();

    const [isPending, setIsPending] = useState(false);

    const [isError, setIsError] = useState(false);

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

    return { movie, credits, isPending, isError };

}
export default useMovieDetail;