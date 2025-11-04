import { useAuth } from "../../context/AuthContext";
import type { Lp } from "../../types/lp";
import { Link, useNavigate } from "react-router-dom";

interface LpCardProps {
    lp: Lp;
}

export default function LpCard({ lp }: LpCardProps) {

    const uploadDate = new Date(lp.createdAt).toLocaleDateString('ko-KR');
    const likesCount = lp.likes.length;
    const { accessToken } = useAuth();

    const navigate = useNavigate();
    const destinationPath = `/lp/${lp.id}`;

    const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!accessToken) {
            e.preventDefault();
            alert("로그인이 필요한 서비스입니다.");
            navigate("/login", { state: { from: destinationPath }, replace: true });
        }
    };

    return (

        <Link to={destinationPath}
            onClick={handleCardClick}
            className="relative shadow-lg overflow-hidden cursor-pointer
        w-44 hover:shadow-2xl transition-shadow duration-300 group">
            <img src={`${lp.thumbnail}`}
                alt={`${lp.title} LP의 이미지`}
                className="w-full aspect-square object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50
            to-transparent backdrop-blur-md flex flex-col justify-center
            items-center text-white p-4
            opacity-0 group-hover:opacity-100 transition-opacity">
                <h2 className="text-lg font-bold leading-snug w-full truncate">{lp.title}</h2>
                <p className="text-sm text-gray-300 leading-relaxed mt-2
                line-clamp-5">
                    {uploadDate}
                </p>
                <p className="text-sm text-gray-300 leading-relaxed mt-2
                line-clamp-5">
                    {likesCount}❤️
                </p>
            </div>
        </Link>
    );
}