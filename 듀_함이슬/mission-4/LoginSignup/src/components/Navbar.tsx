import { NavLink } from "react-router-dom";

const LINKS = [
    { to: '/', label: '홈' },
    { to: '/login', label: '로그인' },
    { to: '/signup', label: '회원가입' },
    { to: '/my', label: '내 페이지' },
];

export const Navbar = () => {
    return (
        <div className="flex gap-5 p-4 bg-gray-100">
            {LINKS.map(({ to, label }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) => {
                        return isActive ? "text-[green] font-bold" : "text-gray-500";
                    }}>
                    {label}
                </NavLink>
            ))}
        </div>
    );
};