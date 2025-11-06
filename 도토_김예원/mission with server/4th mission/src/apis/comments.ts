export const getLpComments = async ({
  pageParam = 1,
  lpId,
  order,
}: {
  pageParam?: number;
  lpId: string;
  order: "latest" | "oldest";
}) => {
  const baseUrl = import.meta.env.VITE_SERVER_API_URL;

  // ✅ 토큰 가져오기 (다양한 키 호환)
  const rawToken =
    localStorage.getItem("accessToken") ||
    localStorage.getItem("ACCESS_TOKEN") ||
    localStorage.getItem("access_token");

  // ✅ 따옴표 제거 (ex: "eyJ..." → eyJ...)
  const token = rawToken ? rawToken.replace(/^"|"$/g, "") : null;

  if (!token) {
    alert("로그인이 필요합니다.");
    window.location.href = "/login";
    throw new Error("No token");
  }

  // ✅ 댓글 GET 요청
  const res = await fetch(
    `${baseUrl}/v1/lps/${lpId}/comments?page=${pageParam}&order=${order}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // ✅ 세션/쿠키 기반 인증 대응
    }
  );

  // ✅ 세션 만료 처리
  if (res.status === 401) {
    alert("세션이 만료되었습니다. 다시 로그인해주세요.");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("access_token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error(`댓글 불러오기 실패 (${res.status})`);
  }

  return res.json();
};

// ✅ 댓글 작성 함수
export const postLpComment = async ({
  lpId,
  content,
}: {
  lpId: string;
  content: string;
}) => {
  const baseUrl = import.meta.env.VITE_SERVER_API_URL;

  const rawToken =
    localStorage.getItem("accessToken") ||
    localStorage.getItem("ACCESS_TOKEN") ||
    localStorage.getItem("access_token");

  const token = rawToken ? rawToken.replace(/^"|"$/g, "") : null;

  if (!token) {
    alert("로그인이 필요합니다.");
    window.location.href = "/login";
    throw new Error("No token");
  }

  // ✅ POST 요청
  const res = await fetch(`${baseUrl}/v1/lps/${lpId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
    credentials: "include",
  });

  if (res.status === 401) {
    alert("세션이 만료되었습니다. 다시 로그인해주세요.");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("access_token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error(`댓글 작성 실패 (${res.status})`);
  }

  return res.json();
};

// ✅ (선택) 댓글 삭제 함수 — 필요 시 추가
export const deleteLpComment = async ({
  lpId,
  commentId,
}: {
  lpId: string;
  commentId: string;
}) => {
  const baseUrl = import.meta.env.VITE_SERVER_API_URL;

  const rawToken =
    localStorage.getItem("accessToken") ||
    localStorage.getItem("ACCESS_TOKEN") ||
    localStorage.getItem("access_token");

  const token = rawToken ? rawToken.replace(/^"|"$/g, "") : null;

  if (!token) {
    alert("로그인이 필요합니다.");
    window.location.href = "/login";
    throw new Error("No token");
  }

  const res = await fetch(
    `${baseUrl}/v1/lps/${lpId}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    }
  );

  if (res.status === 401) {
    alert("세션이 만료되었습니다. 다시 로그인해주세요.");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("access_token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error(`댓글 삭제 실패 (${res.status})`);
  }

  return res.json();
};