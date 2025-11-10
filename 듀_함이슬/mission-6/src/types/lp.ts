import type { CursorBasedResponse } from "./common";

export type Tag = {
    id: number;
    name: string;

};

export type Likes = {
    id: number;
    userId: number;
    lpId: number;
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

export type LpDetail = {
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
    author: {
        id: number;
        name: string;
        email: string;
        bio: string;
        avatar: string;
        createdAt: string;
        updatedAt: string;
    };
};


export type ResponseLPListDto = CursorBasedResponse<Lp[]>;

export type ResponseLPDto = {
    status: string;
    statusCode: number;
    message: string;
    data: LpDetail;
};