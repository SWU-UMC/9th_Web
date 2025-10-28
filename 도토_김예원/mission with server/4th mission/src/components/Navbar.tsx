import { NavLink } from "react-router-dom";

const LINKS_LEFT = [
  { to: "/", label: "Home" },
];

const LINKS_RIGHT = [
  { to: "/login", label: "login" },
  { to: "/signup", label: "Signup" },
];

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-10 py-4">
      {/* 왼쪽 영역 */}
      <div className="flex gap-4">
        {LINKS_LEFT.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={'text-blue-600 font-bold'}
          >
            {label}
          </NavLink>
        ))}
      </div>

      {/* 오른쪽 영역 */}
      <div className="flex gap-4">
        {LINKS_RIGHT.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold" : "text-gray-500"
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};