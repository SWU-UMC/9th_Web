// 커스텀 훅을 활용하기 전 import.
// import { useEffect, useState } from "react";
// import axios from "axios";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import type { MovieDetails, Credits } from "../types/movieDetail";
//  커스텀 훅을 활용하기 위한 import.
import { useCustomFetch } from "../hooks/useCustomFetch";
import NotFoundPage from "./NotFoundPage";

const MovieDetailPage = () => {
  // 커스텀 hook으로 처리하기 이전 선언
  // 영화 상세 정보
  // const [details, setDetails] = useState<MovieDetails | null>(null);
  // 영화 출연진 정보
  // const [credits, setCredits] = useState<Credits | null>(null);
  // const [isPending, setIsPending] = useState(false);
  // const [isError, setError] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsPending(true);

  //     //   영화 상세 정보 api
  //     try {
  //       const detailsRes = await axios.get<MovieDetails>(
  //         `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
  //           },
  //         }
  //       );
  //       setDetails(detailsRes.data);

  //       // 영화 출연진 정보 api
  //       const creditsRes = await axios.get<Credits>(
  //         `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
  //           },
  //         }
  //       );
  //       setCredits(creditsRes.data);

  //     } catch (err) {
  //       setError(true);
  //     } finally {
  //       setIsPending(false);
  //     }
  //   };

  //   fetchData();
  // }, [movieId]);

  // if (isPending) {
  //   return (
  //     <div className="flex justify-center items-center h-dvh">
  //       <LoadingSpinner />
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <div className="text-red-500 text-xl text-center">데이터를 불러오지 못했습니다.</div>
  //   );
  // }


  // 영화 id 가져오기.
  const { movieId } = useParams<{ movieId: string }>();
  
   // 커스텀 hook로 처리
  const detailsUrl= movieId 
  ?`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
  : null; 
  const { 
    data: details,
    isPending: detailsPending,
    isError: detailsError } = useCustomFetch<MovieDetails>(detailsUrl);

  const creditsUrl= movieId
  ? `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`
  : null;
  const {
    data: credits,
    isPending: creditsPending,
    isError: creditsError,
  } = useCustomFetch<Credits>(creditsUrl);

  // 로딩
  if (detailsPending || creditsPending) {
     return (
       <div className="flex justify-center items-center h-dvh">
         <LoadingSpinner />
       </div>
     );
   }

   // 에러
  if (detailsError || creditsError) {
     return (
      <div className="text-red-500 text-xl text-center">
        <NotFoundPage/>
      </div>
     );
   }

  // 데이터가 없을 경우 처리
  if (!details || !credits) return null;

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
          <p className="mt-6">개요:<br /> "{details.overview}"</p>
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
                {/* 프로필이 없는 경우도 고려 */}
                {actor.profile_path ? (<img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className="rounded-lg" />
                ) : (
                  <div className="w-[150px] h-[225px] bg-gray-300 flex items-center justify-center rounded-lg">
                    No Image
                  </div>
                )}
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