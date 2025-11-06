import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLpDetail } from "../apis/lps";
import { getLpComments, postLpComment } from "../apis/comments";

export default function LpDetailPage() {
  const { lpid } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [lp, setLp] = useState<any>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [order, setOrder] = useState<"latest" | "oldest">("latest");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const fetchData = async () => {
  try {
    const res = await getLpDetail(lpid!);

    // ✅ null 반환 시 (401 등) — 직접 안내
    if (!res) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    setLp(res.data);
    setUserName(res.data.userName || "익명");
  } catch (err) {
    console.error(err);
  }
};
    fetchData();
  }, [lpid, navigate]);

  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["lpComments", lpid, order],
    queryFn: ({ pageParam = 1 }) => getLpComments({ pageParam, lpId: lpid!, order }),
    getNextPageParam: (lastPage) => lastPage?.data?.nextCursor ?? undefined,
    initialPageParam: 1,
  });

  const { mutate: addComment } = useMutation({
    mutationFn: (newComment: string) => postLpComment({ lpId: lpid!, content: newComment }),
    onSuccess: () => {
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpid] });
    },
  });

  if (!lp) {
    return <div className="flex justify-center items-center h-[60vh] text-gray-500">불러오는 중...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 mt-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-700 font-semibold">{userName}</span>
        <span className="text-gray-400 text-sm">{lp.createdAt?.slice(0, 10)}</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">{lp.title}</h1>

      {lp.thumbnail && (
        <img src={lp.thumbnail} alt={lp.title} className="w-full rounded-lg shadow-md mb-6 object-contain max-h-[700px]" />
      )}

      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{lp.content}</p>

      <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-8">
        <button className="text-pink-500 hover:scale-110 transition">❤️</button>
        <div className="flex gap-4 text-gray-500">
          <button className="hover:text-blue-500">수정</button>
          <button className="hover:text-red-500">삭제</button>
        </div>
      </div>

      {/* 댓글 섹션 */}
      <div className="border-t border-gray-300 pt-6 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-800">댓글</h2>
          <div className="space-x-2">
            <button onClick={() => setOrder("oldest")} className={`px-3 py-1 rounded ${order === "oldest" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}>오래된순</button>
            <button onClick={() => setOrder("latest")} className={`px-3 py-1 rounded ${order === "latest" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}>최신순</button>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="댓글을 입력해주세요" className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-blue-500" />
          <button onClick={() => comment.trim() && addComment(comment)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">작성</button>
        </div>

        <ul className="space-y-4">
          {comments?.pages?.flatMap((page) =>
            page?.data?.comments?.map((c: any) => (
              <li key={c.id} className="border-b border-gray-200 pb-2">
                <div className="font-semibold text-gray-900">{c.author}</div>
                <div className="text-gray-600 text-sm">{c.content}</div>
              </li>
            ))
          )}
        </ul>

        {hasNextPage && (
          <div className="text-center mt-4">
            <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              {isFetchingNextPage ? "불러오는 중..." : "더보기"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}