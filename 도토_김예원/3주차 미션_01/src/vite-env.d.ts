/// <reference types="vite/client" />
// 환경변수 세팅
interface ImportMetaEnv{
    readonly VITE_TMDB_KEY:string;
}

interface ImportMeta{
    readonly env: ImportMetaEnv;
}
