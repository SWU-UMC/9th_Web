// 햄버거 영역

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside
      className={`bg-gray-100 border-r border-gray-300 transition-all duration-300 
        ${isOpen ? "w-60" : "w-0"} overflow-hidden z-40`}
    >
      <ul className="flex flex-col gap-3 p-4 text-gray-700 font-medium">
        <li>홈</li>
        <li>마이페이지</li>
      </ul>
    </aside>
  );
};