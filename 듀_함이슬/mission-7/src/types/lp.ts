import type { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
    id: number;
    name: string;

};

export type Likes = {
    id: number;
    userId: number;
    lpId: number;
}

export type Author = {
    id: number;
    name: string;
    email: string;
    bio: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
}

export type Lp = {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
    likes: Likes[];
};

export type RequestLPDto = {
    lpid: number;
};

// 6주차 수정
export type LpDetail = Lp & {
    author: Author;
};

export type ResponseLPListDto = CursorBasedResponse<Lp[]>;

// 6주차 수정
export type ResponseLPDto = CommonResponse<LpDetail>;

export type ResponseLikeLpDto = CommonResponse<{
    id: number;
    userId: number;
    lpId: number;
}>;

export type CreateLpsDto = {
    title: string;
    content: string;
    thumbnail: string | null;
    tags: string[];
    published: boolean;

};

export type LpCreateResponseDto = CommonResponse<{
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
}>;

export type UpdateLpsDto = {
    title: string;
    content: string;
    thumbnail: string | null;
    tags: string[];
    published: boolean;
};

export type LpUpdateResponseDto = CommonResponse<{
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
}>;

export type LpDeleteResoponseDto = CommonResponse<boolean>;