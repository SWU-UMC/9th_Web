import type { MovieDetail } from "../types/movie"

type MovieInfoProps = {
    movie: MovieDetail;
};

export const MovieInfo = ({ movie }: MovieInfoProps) => {
    return (
        <div>
            {/* 영화 이미지 */}
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-130 object-cover" />

            {/* 영화 설명 뒷배경 오버레이 */}
            <div className="absolute top-0 left-0 w-350 h-130 bg-gradient-to-r from-black/80 to-black/0 z-10"></div>

            {/* 영화 설명 */}
            <div className="absolute inset-0 flex flex-col justify-start p-8 text-white z-20">
                <h1 className="text-3xl font-extrabold mb-5">{movie.title}</h1>

                <p className="text-lg mb-2">평점 {movie.vote_average}</p>
                <p className="text-lg mb-2">{movie.release_date}</p>
                <p className="text-lg mb-5">{movie.runtime}분</p>
                <p className="text-2xl mb-5 w-1/3">{movie.tagline}</p>
                <p className="text-sm w-1/3">{movie.overview}</p>
            </div>
        </div>
    );

};

export default MovieInfo;
