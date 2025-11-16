import { axiosInstance } from "./axios.ts";
import type {
    RequestSigninDto,
    RequestSignupDto,
    ResponseSigninDto,
    ResponseSignupDto,

    ResponseMyInfoDto,
} from "../types/auth";

// 회원가입 
export const postSignup = async (
    body: RequestSignupDto): 
    Promise<ResponseSignupDto> => {
        const { data } = await axiosInstance.post("/v1/auth/signup", body,);

    return data;
};

// 로그인 
export const postSignin = async (
    body: RequestSigninDto,): 
    Promise<ResponseSigninDto> => {
        const { data } = await axiosInstance.post("/v1/auth/signin", body,);

    return data;
};

// 로그아웃 
export const postLogout =async()=>{
    const{data}=await axiosInstance.post("v1/auth/signout");
    return data;
};




export const updateMyInfo = async (data: {
  name?: string;
  bio?: string;
  avatar?: string;
}) => {
  const res = await axiosInstance.patch("/v1/users", data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const deleteUser = async () => {
  const { data } = await axiosInstance.delete("/v1/users");
  return data;
};