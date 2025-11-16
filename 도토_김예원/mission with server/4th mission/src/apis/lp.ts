import type { PaginationDto } from "../types/common";
import { axiosInstance } from "./axios";
import type { ResponseLpListDto } from "../types/lp";

// lp 상세 조회 api호출 
export const getLpList= async(
    paginationDto: PaginationDto,
):Promise<ResponseLpListDto> =>{
    const{data}= await axiosInstance.get("/v1/lps",{
        params:paginationDto,
    });

    return data;
};


export const getLpDetail = async (lpid: string) => {
  const baseUrl = import.meta.env.VITE_SERVER_API_URL;
  const token = localStorage.getItem("accessToken");

  const res = await fetch(`${baseUrl}/v1/lps/${lpid}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) {
    throw new Error("LP 상세 불러오기 실패");
  }

  return res.json();
};