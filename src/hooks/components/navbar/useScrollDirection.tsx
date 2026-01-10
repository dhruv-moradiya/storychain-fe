import { useEffect, useRef, useState } from 'react';

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;

      if (scrollY > lastScrollY.current + 10) {
        setScrollDirection('down');
      } else if (scrollY < lastScrollY.current - 10) {
        setScrollDirection('up');
      }

      lastScrollY.current = scrollY;
    };

    window.addEventListener('scroll', updateScrollDirection, { passive: true });

    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, []);

  return scrollDirection;
}

export { useScrollDirection };
