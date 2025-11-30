// 댓글 목록 컴포넌트로 분리
export const Comment = ({ comments }: { comments: any[] }) => {
  return (
    <ul className="flex flex-col gap-4">
      {comments.map((c: any) => (
        <li key={c.id} className="flex items-start gap-3 pb-3 border-b">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-600 text-white font-semibold">
            {c.author?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            <div className="flex justify-between">
              <p className="font-semibold text-gray-800">{c.author?.name}</p>
              <p className="text-xs text-gray-500">
                {new Date(c.createdAt).toLocaleString("ko-KR", {
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">
              {c.content}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};
