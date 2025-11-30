import type { PaginationDto } from "../types/common";
import { axiosInstance } from "./axios";
import type { ResponseLpListDto } from "../types/lp";

// lp 조회 api호출 
export const getLpList= async(
    paginationDto: PaginationDto,
):Promise<ResponseLpListDto> =>{
    const{data}= await axiosInstance.get("/v1/lps",{
        params:paginationDto,
    });

    return data;
};

// lp 상세 조회 api호출 
export const getLpDetail = async (lpid: string) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}`);
  return data;
};