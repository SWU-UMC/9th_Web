import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";
import type { MovieDetails, Credits } from "../types/movieDetail";

const MovieDetailPage = () => {
// 영화 id 가져오기.
  const { movieId } = useParams<{ movieId: string }>();
// 영화 상세 정보
  const [details, setDetails] = useState<MovieDetails | null>(null);
// 영화 출연진 정보
  const [credits, setCredits] = useState<Credits | null>(null);
// 로딩
  const [isPending, setIsPending] = useState(false);
// 에러
  const [isError, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);

    //   영화 상세 정보 api
      try {
        const detailsRes = await axios.get<MovieDetails>(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        }
      );
      setDetails(detailsRes.data);

    // 영화 출연진 정보 api
      const creditsRes = await axios.get<Credits>(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        }
      );
      setCredits(creditsRes.data);

    } catch (err) {
        setError(true);
    } finally {
        setIsPending(false);
    }
    };

    fetchData();
  }, [movieId]);

  // 로딩 중
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  // 에러 중
  if (isError) {
    return (
      <div className="text-red-500 text-xl text-center">데이터를 불러오지 못했습니다.</div>
    );
  }

  // 데이터가 없을 경우 처리
  if (!details) return null;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* 영화 세부 정보 */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w300${details.poster_path}`}
          alt={details.title}
          className="rounded-lg shadow-md"
        />
        <div>
          <h1 className="text-4xl font-bold">{details.title}</h1>
          <p className="text-gray-500 mt-4">{details.release_date}</p>
          <p className="mt-10 font-bold text-2xl text-gray-700">영화 상세 정보</p>
          <p className="mt-4">평점: {details.vote_average}</p>
          <p className="mt-4">상영 시간: {details.runtime}분</p>
          <p className="mt-6">개요:<br/> "{details.overview}"</p>

        </div>
      </div>

      {/* 영화 출연진 정보 */}
      {credits && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">출연진</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {/* 최대 12명만 출력 */}
            {credits.cast.slice(0, 12).map((actor) => (
              <div key={actor.id} className="text-center">
                <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="rounded-lg"
                  />
                <p className="mt-2 text-sm font-bold">{actor.name}</p>
                <p className="text-xs text-gray-500">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailPage;