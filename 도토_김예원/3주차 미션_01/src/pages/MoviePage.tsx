// 커스텀 훅을 활용하기 전 import.
// import { useEffect, useState } from "react";
// import axios from 'axios';
// import { type MovieResponse, type Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
//  커스텀 훅을 활용하기 위한 import.
import { useState } from "react";
import { type MovieResponse } from "../types/movie";
import { useCustomFetch } from "../hooks/useCustomFetch";
import NotFoundPage from "./NotFoundPage";


export default function MoviePage() {
  // 커스텀 hook으로 처리하기 이전 선언
  // const [movies, setMovies] = useState<Movie[]>([]);
  // const [isPending, setIsPending] = useState(false);
  // const [isError, setError] = useState(false);

  // 커스텀 hook으로 처리하기 이전 직접 데이터를 호출하는 함수.
  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     setIsPending(true);
  //     try {
  //       const { data } = await axios.get<MovieResponse>(
  //         `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
  //           },
  //         }
  //       );
  //       setMovies(data.results);
  //     } catch (err) {
  //       setError(true);
  //     } finally {
  //       setIsPending(false);
  //     }
  //   };

  //   fetchMovies();
  // }, [page, category]);

  // 로딩
  // if (!isPending){
  //     return<LoadingSpinner/>
  // }

  // 에러 
  // if (isError) {
  //   return (<div>
  //     <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
  //   </div>);
  // }

  // 페이지 처리
  const [page, setPage] = useState(1);
  const { category } = useParams<{
    category: string;
  }>();

  // 커스텀 hook로 처리
  const url = category
    ? `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`
    : null;
  // 커스텀 hook을 호출하여 값 받기.
  const { data, isPending, isError } = useCustomFetch<MovieResponse>(url);

  return (
    <>
      <div className="flex item-center justify-center gap-6 mt-5">
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shawdow-md
            hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
            cursor-pointer disabled:cursor-not-allowed"
          disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
          {`<`}
        </button>
        <span>{page} 페이지</span>
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shawdow-md
            hover:bg-[#b2dab1] transition-all duration-200
            cursor-pointer"
          onClick={() => setPage((prev) => prev + 1)}>
          {`>`}
        </button>
      </div>

      {/* 훅으로 관리 */}
      {isPending && (
        <div className="flex item-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}
      {isError && (
        <div className="flex item-center justify-center h-dvh">
          <NotFoundPage />
        </div>
      )}

      {!isPending && !isError && (<div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
         lg:grid-cols-5 xl:grid-cols-6">
        {data?.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      )}

      {/* hook로 관리하기 이전 */}
      {/* {!isPending && (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
        lg:grid-cols-5 xl:grid-cols-6">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )} */}
    </>
  );
}