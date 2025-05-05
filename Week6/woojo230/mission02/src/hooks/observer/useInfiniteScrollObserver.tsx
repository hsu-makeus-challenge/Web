import { useEffect, useRef } from 'react';

function useInfiniteScrollObserver(
  hasNextPage: boolean | undefined,
  isFetching: boolean,
  fetchNextPage: () => Promise<any>
): React.RefObject<HTMLDivElement> {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const scrollPosition = useRef<number>(0);

  useEffect(() => {
    const handleScroll = (): void => {
      scrollPosition.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    if (!isFetching && scrollPosition.current > 0) {
      window.scrollTo(0, scrollPosition.current);
    }

    if (observerRef.current) {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        ([entry]: IntersectionObserverEntry[]) => {
          if (entry.isIntersecting && hasNextPage && !isFetching) {
            scrollPosition.current = window.scrollY;
            fetchNextPage();
          }
        },
        { threshold: 1 }
      );

      observer.current.observe(observerRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observer.current && observerRef.current) {
        observer.current.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetching, fetchNextPage]);

  return observerRef;
}

export default useInfiniteScrollObserver;
