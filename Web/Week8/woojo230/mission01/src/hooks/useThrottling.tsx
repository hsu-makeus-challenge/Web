import { useCallback, useRef } from 'react';

interface ThrottleFunction {
  (...args: any[]): any;
}

const useThrottling = <T extends ThrottleFunction>(
  callback: T,
  delay: number
) => {
  const lastCall = useRef<number>(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        callback(...args);
        lastCall.current = now;
      }
    },
    [callback, delay]
  );
};

export default useThrottling;
