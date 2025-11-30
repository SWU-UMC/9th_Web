import { useCallback, useMemo, useState } from 'react';
import MovieFilter from '../components/MovieFilter';
import MovieList from '../components/MovieList';
import { useFetch } from '../hooks/useFetch';
import type { MovieFilters, MovieResponse } from '../types/movie';

export default function HomePage() {
    const [filters, setFilters] = useState<MovieFilters>({
        query: "어벤져스",
        include_adult: false,
        language: "ko-KR",
    });

    // 최적화
    const axiosRequestConfig = useMemo(
        (): { params: MovieFilters } => ({
            params: filters,
        }), [filters],
    );

    const handleMovieFilters = useCallback(
        (filters:MovieFilters)=>{
            setFilters(filters);
        },
        [setFilters],
    );

    const { data, error, isLoading } =
        useFetch<MovieResponse>(
            "/search/movie",
            axiosRequestConfig,
        );

    // 데이터 fetch 중 오류
    if (error) {
        return <div>{error}</div>;
    }


    return (
        <div className='container'>
            <MovieFilter onchange={ handleMovieFilters} />
            {isLoading
                ? <div>로딩 중 입니다...</div>
                : (
                    // 리스트로 불러온 데이터 전달 그러면 컴포넌트에서 리스트 형식으로 보여줌
                    <MovieList movies={data?.results || []} />
                )}
        </div>
    );
}