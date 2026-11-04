import { useEffect, useRef, useState } from 'react';

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (motionReduced || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.16, rootMargin: '0px 0px -5% 0px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}
