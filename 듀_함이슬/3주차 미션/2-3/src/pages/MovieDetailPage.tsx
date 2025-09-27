import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type credits, type MovieDetail } from "../types/movie";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";

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

            {!isPending && (
                // 전체 배경 검정
                <div className="relative rounded-lg overflow-hidden bg-black min-h-screen">

                    {/* 영화 이미지  */}
                    <img src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`} alt={movie?.title}
                        className="w-full h-130 object-cover" />

                    {/* 영화 설명 뒷배경 오버레이 */}
                    <div className="absolute top-0 left-0 w-350 h-130 bg-gradient-to-r from-black/80 to-black/0 z-10"></div>

                    {/* 영화 설명 */}
                    <div className="absolute inset-0 flex flex-col justify-start p-8 text-white z-20">
                        <h1 className="text-3xl font-extrabold mb-5">{movie?.title}</h1>

                        <p className="text-lg mb-2">평점 {movie?.vote_average}</p>
                        <p className="text-lg mb-2">{movie?.release_date}</p>
                        <p className="text-lg mb-5">{movie?.runtime}분</p>
                        <p className="text-2xl mb-5 w-1/3">{movie?.tagline}</p>
                        <p className="text-sm w-1/3">{movie?.overview}</p>
                    </div>

                    {/* 감독, 출연 */}
                    <div className="p-8">
                        <h1 className="text-3xl font-extrabold text-white mb-12"></h1>

                        <div className="flex flex-wrap gap-10 justify-center">

                            {credits?.cast
                                .map((member, index) => (
                                    <div key={`cast-${member.id}-${index}`} className="flex flex-col items-center w-30">
                                        {/* 출연진 프로필 */}
                                        {member.profile_path ? (
                                            <img src={`https://image.tmdb.org/t/p/w200${member.profile_path}`} alt={member.name}
                                                className="w-20 h-20 object-cover rounded-full mb-2 mx-auto border-2 border-white" />
                                        ) : (
                                            <div className="w-20 h-20 bg-black rounded-full mb-2 mx-auto border-2 border-white" />
                                        )}
                                        {/* 출연진 이름, 역할 */}
                                        <p className="text-sm text-white text-center">{member.name}</p>
                                        <p className="text-sm text-white text-center">({member.known_for_department})</p>
                                    </div>
                                ))}

                            {credits?.crew
                                .map((member, index) => (
                                    <div key={`crew-${member.id}-${index}`} className="flex flex-col items-center w-30">
                                        {member.profile_path ? (
                                            <img src={`https://image.tmdb.org/t/p/w200${member.profile_path}`} alt={member.name}
                                                className="w-20 h-20 object-cover rounded-full mb-2 mx-auto border-2 border-white" />
                                        ) : (
                                            <div className="w-20 h-20 bg-black rounded-full mb-2 mx-auto border-2 border-white" />
                                        )}
                                        <p className="text-sm text-white text-center">{member.name}</p>
                                        <p className="text-sm text-white text-center">({member.known_for_department})</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};

export default MovieDetailPage;