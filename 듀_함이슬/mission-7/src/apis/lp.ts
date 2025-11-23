import type { PaginationDto } from "../types/common";
import type { RequestLPDto, ResponseLPListDto, ResponseLPDto, ResponseLikeLpDto, LpCreateResponseDto, CreateLpsDto, UpdateLpsDto, LpUpdateResponseDto, LpDeleteResoponseDto } from "../types/lp";
import { axiosInstance } from "./axios";


export const getLpList = async (
    paginationDto: PaginationDto,
): Promise<ResponseLPListDto> => {
    const { data } = await axiosInstance.get("/v1/lps", {
        params: paginationDto,
    });

    return data;
};

export const getLpDetail = async ({
    lpid, //lpid는 number로 넘어와야해서 수정
}: RequestLPDto): Promise<ResponseLPDto> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpid}`);

    return data;
};

export const postLike = async ({ lpid }: RequestLPDto): Promise<ResponseLikeLpDto> => {
    const { data } = await axiosInstance.post(`/v1/lps/${lpid}/likes`);

    return data;
};

export const deleteLike = async ({ lpid }: RequestLPDto): Promise<ResponseLikeLpDto> => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpid}/likes`);

    return data;
}

export const postLp = async (newLpData: CreateLpsDto): Promise<LpCreateResponseDto> => {
    const { data } = await axiosInstance.post(`/v1/lps`, newLpData);

    return data;
};

export const updateLp = async ({ lpid, updateDto }: { lpid: number; updateDto: UpdateLpsDto })
    : Promise<LpUpdateResponseDto> => {
    const { data } = await axiosInstance.patch<LpUpdateResponseDto>(
        `/v1/lps/${lpid}`, updateDto,
    );
    return data;
};

export const deleteLp = async (lpid: number,): Promise<LpDeleteResoponseDto> => {
    const { data } = await axiosInstance.delete<LpDeleteResoponseDto>(
        `/v1/lps/${lpid}`
    );
    return data;
};