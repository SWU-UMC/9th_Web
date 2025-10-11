import { NavLink } from "react-router-dom";

//  객체 배열 상태
//  to, label 속성을 가지고 있는 객체들을 모아둔 배열.
const LINKS = [
    { to: '/', label: '홈' },
    { to: '/movies/popular', label: '인기 영화' },
    { to: '/movies/now_playing', label: '상영 중' },
    { to: '/movies/top_rated', label: '평점 높은' },
    { to: '/movies/upcoming', label: '개봉 예정' },
]

export const Navbar = () => {
    return <div className="flex justify-center gap-3 p-4">
        {LINKS.map(({ to, label }) => (
            <NavLink
                key={to}
                to={to}
                className={({ isActive }) => {
                    return isActive ? 'text-[#b2dab1] font-bold' : 'text-gray-500';
                }
                }>
                {label}
            </NavLink>
        ))}
    </div>;
};