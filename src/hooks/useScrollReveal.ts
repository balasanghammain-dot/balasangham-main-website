import { useEffect, useRef } from 'react';

/**
 * Adds 'visible' class to elements with 'reveal' class when they enter viewport.
 * Attach ref to the container element.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // ponytail: single IntersectionObserver per container. Upgrade to shared global observer if perf needed.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    const targets = el.querySelectorAll('.reveal');
    targets.forEach((t) => observer.observe(t));

    // Also observe the container itself if it has .reveal
    if (el.classList.contains('reveal')) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}
