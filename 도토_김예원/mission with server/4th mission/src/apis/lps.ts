
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


export const getLpsList = async ({ pageParam = 1, sort = "latest" }) => {
  const baseUrl = import.meta.env.VITE_SERVER_API_URL;
  const token = localStorage.getItem("accessToken");

  const res = await fetch(`${baseUrl}/v1/lps?page=${pageParam}&sort=${sort}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const result = await res.json();
  console.log("📦 getLpsList result:", result); 
  return result;
};
