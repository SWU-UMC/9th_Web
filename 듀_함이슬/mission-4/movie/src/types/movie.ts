export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export type MovieResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

export type MovieDetail = {
    backdrop_path: string;
    id: number;
    overview: string;
    release_date: string;
    runtime: number;
    tagline: string | null;
    title: string;
    vote_average: number;


};

export type creditMember = {
    id: number;
    known_for_department: string;
    name: string;
    profile_path: string | null;
};

export type credits = {
    id: number;
    cast: creditMember[];
    crew: creditMember[];

};