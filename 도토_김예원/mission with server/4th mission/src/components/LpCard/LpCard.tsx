import { useNavigate } from "react-router-dom";
import type { LpItem } from "../../types/lp";

interface LpCardProps {
  lp: LpItem;
}

// Homepage에서 보여지는 카드 목록
export default function LpCard({ lp }: LpCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/lp/${lp.id}`)}
      className="relative group rounded-md overflow-hidden cursor-pointer transition"
    >
      {/* 썸네일 */}
      {lp.thumbnail ? (
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      {/* hover 정보 */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-4
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
        text-white bg-gradient-to-t from-black/70 via-transparent to-transparent
        pointer-events-none"
      >
        <p className="font-semibold text-base truncate">{lp.title}</p>

        <div className="flex items-center justify-between text-sm text-gray-200 mt-1">
          <p>
            {new Date(lp.createdAt).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </p>

          <div className="flex items-center gap-1">
            ❤️ <span>{lp.likes?.length ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}