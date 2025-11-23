export default function LpCardSkeleton() {
  return (
    <div className="rounded-md overflow-hidden bg-gray-200 animate-pulse">
      {/* 썸네일 영역 */}
      <div className="w-full h-40 bg-gray-300" />

      {/* 텍스트 정보 */}
      <div className="p-3 space-y-2">
        {/* 제목 */}
        <div className="h-4 bg-gray-300 rounded"></div>

        {/* 날짜 + 좋아요 */}
        <div className="flex justify-between">
          <div className="h-3 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}