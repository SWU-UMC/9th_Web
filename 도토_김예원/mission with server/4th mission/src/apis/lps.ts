import { axiosInstance } from "./axios";

// export const getLpsList = async (sort: "latest" | "oldest") => {
//   const response = await axiosInstance.get(`/v1/lps?sort=${sort}`);
//   // ✅ 서버 응답 구조 확인 후 배열만 반환
//    console.log("📦 /v1/lps response:", response.data);
//   return response.data.data.data;
// };

// export const getLpsList = async ({
//   pageParam = 1,
//   sort,
// }: {
//   pageParam?: number;
//   sort: "latest" | "oldest";
// }) => {
//   const baseUrl = import.meta.env.VITE_SERVER_API_URL;

//   const response = await fetch(`${baseUrl}/v1/lps?page=${pageParam}&sort=${sort}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error("LP 목록을 불러오지 못했습니다.");
//   }

//   // ✅ response.json()으로 데이터 반환
//   return response.json();
// };

// src/apis/lps.ts
export const getLpDetail = async (lpid: string) => {
  const baseUrl = import.meta.env.VITE_SERVER_API_URL;
  const token =
  localStorage.getItem("accessToken") ||
  localStorage.getItem("ACCESS_TOKEN") ||
  localStorage.getItem("access_token");

 const res = await fetch(`${baseUrl}/v1/lps/${lpid}`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // ✅ 반드시 Bearer 포함
  },
});

  // ❗401일 때 무조건 alert 금지 — 페이지에서 처리
  if (res.status === 401) {
    console.warn("인증이 필요합니다 (401).");
    return null;
  }

  if (!res.ok) throw new Error("LP 상세 불러오기 실패");
  return res.json();
};

export const getLpsList = async ({
  pageParam = 1,
  sort = "latest",
}: {
  pageParam?: number;
  sort?: "latest" | "oldest";
}) => {
  const baseUrl = import.meta.env.VITE_SERVER_API_URL;
  const token = localStorage.getItem("accessToken");

  const res = await fetch(`${baseUrl}/v1/lps?page=${pageParam}&sort=${sort}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) throw new Error("LP 목록 불러오기 실패");
  return res.json();
};