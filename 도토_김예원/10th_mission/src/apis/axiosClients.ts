import axios from "axios";

// 영화 정보 가져오는 api
export const axiosClient = axios.create({
    baseURL:"https://api.themoviedb.org/3",
    headers:{
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
});