import type { Movie } from "../types/movie";

interface MovieModalProps {
    movie: Movie;
    onCancel: () => void;
}

export const MovieModal = ({ onCancel, movie }: MovieModalProps) => {
    const handleIMDbSearch = () => {
        const url = `https://www.imdb.com/find?q=${movie.title}`;
        window.open(url, "_blank");
    };

    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    const fallbackImage = "https://placehold.co/600x400";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={onCancel}
        >
            <div
                className="relative bg-white rounded-md w-200 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 배경 이미지 */}
                <div className="relative">
                    <img
                        src={
                            movie.backdrop_path
                                ? `${imageBaseUrl}${movie.backdrop_path}`
                                : fallbackImage
                        }
                        className="h-60 w-full object-cover rounded-t-md"
                    />
                    <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                        <h2 className="text-2xl text-white font-bold">{movie.title}</h2>
                        <h3 className="text-gray-200">
                            {movie.original_title}
                        </h3>
                    </div>
                    <button
                        onClick={onCancel}
                        className="cursor-pointer absolute top-4 right-4 font-bold text-xl text-white"
                    >
                        x
                    </button>
                </div>

                {/* 영화 포스터, 제목 등 설명 */}
                <div className="flex justify-center gap-5 p-6">
                    <img
                        src={
                            movie.poster_path
                                ? `${imageBaseUrl}${movie.poster_path}`
                                : fallbackImage
                        }
                        alt={`${movie.title} 포스터`}
                        className="w-auto h-100 rounded-sm"
                    />
                    <div>
                        <p className="font-bold text-lg text-blue-500">
                            {movie.vote_average.toFixed(1)}
                        </p>
                        <div className="text-center p-2 flex flex-col gap-3">
                            <div>
                                <p className="text-lg font-bold">개봉일</p>
                                <p>{movie.release_date}</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold">인기도</p>
                                <div className="h-2.5 w-full rounded-md bg-gray-200">
                                    <div
                                        className="h-2.5 rounded-full bg-blue-600 transition-all duration-500"
                                        style={{
                                            width: `${
                                                (movie.vote_average / 10) * 100
                                            }%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <p className="text-lg font-bold">줄거리</p>
                                <p className="text-sm">{movie.overview}</p>
                            </div>
                        </div>

                        <div className="mt-3 flex gap-2">
                            <button
                                onClick={handleIMDbSearch}
                                className="rounded-md bg-blue-500 text-white p-2 cursor-pointer"
                            >
                                IMDb에서 검색
                            </button>
                            <button
                                onClick={onCancel}
                                className="border border-blue-500 text-blue-500 rounded-md p-2 cursor-pointer"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
