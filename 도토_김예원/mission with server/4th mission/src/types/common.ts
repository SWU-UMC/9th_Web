export type CommonResponse<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    data: T;
};

// lp조회를 위한 전역 타입 정의
// 현재는 다 작성했는데 위의 타입에서 확장하는 방식으로 정의해도 됨
export type CursorBasedResponse<T>={
    status: boolean;
    statusCode: number;
    message: string;
    data: T;
    nextCursor: number;
    hasNext: boolean;
}

export type PaginationDto={
    cursor?: number;
    limit?:number;
    search?: string;
    order?: "asc"|"desc";
    enabled?: boolean;
}