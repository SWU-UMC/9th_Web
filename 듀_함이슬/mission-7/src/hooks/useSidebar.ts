import { useCallback, useEffect, useState } from 'react'

const MOBILE_BREAKPOINT = 768;

export const useSidebar = () => {
    const [isOpen, setIsOpen] = useState(window.innerWidth >= MOBILE_BREAKPOINT);

    const open = () => setIsOpen(true);
    // useCallback: 함수 재생성 방지
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < MOBILE_BREAKPOINT) {
                setIsOpen(false)
            }
            else { setIsOpen(true) }
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return { isOpen, open, close, toggle };
};

export default useSidebar;
