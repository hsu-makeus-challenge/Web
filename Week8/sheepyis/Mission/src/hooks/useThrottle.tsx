import { useRef } from "react";

function useThrottle(callback: (...args: any[]) => void, delay: number) {
  const lastCalled = useRef(0);

  return (...args: any[]) => {
    const now = Date.now();
    if (now - lastCalled.current >= delay) {
      const time = new Date().toLocaleTimeString();
      console.log("throttled 발생: ", time);
      lastCalled.current = now;
      callback(...args);
    }
  };
}

export default useThrottle;
