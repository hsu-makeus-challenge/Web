import { useEffect, useRef } from 'react';
import useThrottling from '../useThrottling';

function useInfiniteScrollObserver(
  hasNextPage: boolean | undefined,
  isFetching: boolean,
  fetchNextPage: () => Promise<any>,
  externalRef?: React.RefObject<HTMLDivElement>
): React.RefObject<HTMLDivElement> {
  const internalRef = useRef<HTMLDivElement | null>(null);
  const observerRef = externalRef ?? internalRef;

  const observer = useRef<IntersectionObserver | null>(null);
  const scrollPosition = useRef<number>(0);

  const throttledHandleScroll = useThrottling(() => {
    scrollPosition.current = window.scrollY;
    console.log('스로틀링 발생', window.scrollY);
  }, 5000);

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll);

    if (!isFetching && scrollPosition.current > 0) {
      window.scrollTo(0, scrollPosition.current);
    }

    if (observerRef.current) {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        ([entry]: IntersectionObserverEntry[]) => {
          if (entry.isIntersecting && hasNextPage && !isFetching) {
            scrollPosition.current = window.scrollY;
            console.log('다음 페이지 로딩', window.scrollY);
            fetchNextPage();
          }
        },
        { threshold: 1 }
      );

      observer.current.observe(observerRef.current);
    }

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (observer.current && observerRef.current) {
        observer.current.unobserve(observerRef.current);
      }
    };
  }, [
    hasNextPage,
    isFetching,
    fetchNextPage,
    observerRef,
    throttledHandleScroll,
  ]);

  return observerRef;
}

export default useInfiniteScrollObserver;
