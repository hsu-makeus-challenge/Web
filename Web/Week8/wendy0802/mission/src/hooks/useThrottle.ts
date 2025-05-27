import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, delay: number = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const now = Date.now();
    if (now - lastExecuted.current >= delay) {
      lastExecuted.current = now;
      setThrottledValue(value);
    } else {
      if (timerId.current) clearTimeout(timerId.current);
      timerId.current = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, delay - (now - lastExecuted.current));
    }
    return () => {
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, [value, delay]);

  return throttledValue;
}

export default useThrottle;