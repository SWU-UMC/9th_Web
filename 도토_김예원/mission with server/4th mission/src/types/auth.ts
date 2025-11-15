import type { CommonResponse } from "./common";

// 회원가입
// 클라이언트에서 서버로 보내는 회원가입 데이터
export type RequestSignupDto = {
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
    password: string;
};
// 서버에서 클라이언트로 응답해주는 회원가입 데이터
export type ResponseSignupDto = CommonResponse<{
    id: number,
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;


// 로그인 관련
// 클라이언트에서 서버로 보내는 로그인 데이터
export type RequestSigninDto = {
    email: string;
    password: string;
};
// 서버에서 클라이언트로 보내는 로그인 데이터
export type ResponseSigninDto = CommonResponse<{
    id: number,
    name: string;
    accessToken: string;
    refreshToken: string;
}>;



// 내 정보 조회
export type ResponseMyInfoDto = CommonResponse<{
    id: number,
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;