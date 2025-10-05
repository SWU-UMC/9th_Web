// movie details 참고
export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  runtime: number;
  backdrop_path: string;
}

// movie credits 참고
export interface Credits {
  id: number;
  cast: {
    id: number;
    name: string;
    character: string;
    // 프로필의 없는 경우도 고려하여 null 추가.
    profile_path: string | null;
  }[];
  crew: {
    id: number;
    name: string;
    job: string;
    profile_path: string | null;
  }[];
}