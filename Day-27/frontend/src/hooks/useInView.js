import { useEffect, useRef, useState } from "react";

// Lightweight IntersectionObserver hook used to trigger scroll reveal
// animations (Tailwind classes) and count-up numbers whenever a section
// enters or exits the viewport. Replays on each view by default.
export const useInView = ({ threshold = 0.2, once = false } = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);

          if (once) {
            observer.unobserve(node);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, isInView };
};
