import { useState } from "react";
import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";

interface MovieListProps {
    movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
    // 선택된 영화 상태 추가 : 모달을 위함
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    // 영화 데이터 길이가 0 즉 데이터가 없는 경우
    if (movies.length === 0) {
        return (
            <div className="flex h-60 items-center justufy-center">
                <p className="font-bold text-gray-500">검색 결과가 없습니다.</p>
            </div>
        )
    }

    // 데이터가 있는 경우 카드 컴포넌트로 돌려서 나타나도록
    return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {movies.map((movie) => (
          <div key={movie.id} onClick={() => setSelectedMovie(movie)}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      {/* 모달 조건부 렌더링 */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </>
  );
   
};

export default MovieList;