'use client'

import { useEffect, useState } from 'react';

interface UseScrollspyOptions {
  sectionIds: string[];
  offset?: number;
}

export const useScrollspy = ({ sectionIds, offset = 100 }: UseScrollspyOptions) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Find the current section
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
};
