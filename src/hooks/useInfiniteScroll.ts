import { useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useInfiniteScroll(
  callback: () => void,
  { threshold = 1.0, rootMargin = '20px' }: UseInfiniteScrollOptions = {}
): (node: Element | null) => void {
  const [node, setNode] = useState<Element | null>(null);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    const { current: currentObserver } = observer;

    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [callback, node, rootMargin, threshold]);

  return setNode;
}