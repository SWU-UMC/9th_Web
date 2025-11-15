import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLike, deleteLike } from "../apis/likes";

interface LikeButtonProps {
  lpId: number;
  isLiked: boolean;
  likeCount: number;
  userId: number;
}

export function LikeButton({ lpId, isLiked, likeCount, userId }: LikeButtonProps) {
  const queryClient = useQueryClient();

  const toggleLike = useMutation({
    mutationFn: async (liked: boolean) => {
      if (liked) await deleteLike(lpId);
      else await postLike(lpId);
    },

    onSuccess: () => {
      // ✅ 서버 반영 후 새로고침
      window.location.reload();
    },

    onError: (err) => {
      console.error("좋아요 요청 실패:", err);
      alert("좋아요 요청 중 오류가 발생했습니다.");
    },
  });

  return (
    <button
      onClick={() => toggleLike.mutate(isLiked)}
      className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-all"
    >
      <span>{isLiked ? "❤️" : "🤍"}</span>
      <span>{likeCount}</span>
    </button>
  );
}
