import { useEffect } from 'react';
import gsap from 'gsap';

export function useMenuAnimation(isOpen, menuRef) {
  useEffect(() => {
    if (!menuRef.current) return;

    const items = menuRef.current.querySelectorAll('.menu-animate-item');

    if (isOpen) {
      // Staggered entrance animation when drawer opens
      gsap.fromTo(
        items,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
          delay: 0.1,
        }
      );
    } else {
      // Reset state on close
      gsap.set(items, { opacity: 0, x: 40 });
    }
  }, [isOpen, menuRef]);
}