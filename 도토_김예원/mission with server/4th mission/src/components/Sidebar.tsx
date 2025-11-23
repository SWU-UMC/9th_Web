// 햄버거 영역
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside
      className={`bg-gray-100 border-r border-gray-300 transition-all duration-300 
        ${isOpen ? "w-60" : "w-0"} overflow-hidden z-40`}
    >
      <ul className="flex flex-col gap-1 p-4 text-gray-700 font-medium">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-gray-200 ${isActive ? "bg-blue-100 text-blue-600" : ""
              }`
            }
          >
            홈
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/my"
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-gray-200 ${isActive ? "bg-blue-100 text-blue-600" : ""
              }`
            }
          >
            마이페이지
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};