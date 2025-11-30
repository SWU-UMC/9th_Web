import type { Movie } from "../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-[90%] max-w-3xl rounded-lg bg-white p-10 shadow-lg">
        <button
          className="absolute right-8 top-6 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          X
        </button>

        <div className="flex gap-6">
          <img
            src={`${imageBaseUrl}${movie.poster_path}`}
            alt={movie.title}
            className="w-48 rounded-md"
          />

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            <p className="text-sm text-gray-600 italic">{movie.original_title}</p>
            <p>📅 개봉일: {movie.release_date}</p>
            <p>⭐ 평점: {movie.vote_average.toFixed(1)} ({movie.vote_count}명)</p>
            <p className="mt-2 text-gray-700 text-sm whitespace-pre-line">{movie.overview}</p>
            <div className="mt-4 flex gap-2">
              <a
                href={`https://www.imdb.com/find?q=${movie.title}`}
                target="_blank"
                // 보안을 위함
                rel="noopener noreferrer"
                className="rounded bg-blue-600 px-3 py-1 text-white"
              >
                IMDb에서 검색
              </a>
              <button onClick={onClose} className="rounded border px-3 py-1">
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;