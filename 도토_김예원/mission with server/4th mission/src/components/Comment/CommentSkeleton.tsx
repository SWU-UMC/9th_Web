// 댓글 목록 스켈레톤 UI
export const CommentSkeleton = () => {
  return (
    <div className="animate-pulse flex items-start gap-3 pb-3 border-b">
      {/* 프로필 원 */}
      <div className="w-9 h-9 rounded-full bg-gray-300" />

      {/* 텍스트 부분 */}
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/4" />
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-2/4" />
      </div>
    </div>
  );
};