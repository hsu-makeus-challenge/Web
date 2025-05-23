import { useRef } from "react";

function useThrottle<T extends (...args: unknown[]) => void>(callback: T, delay: number = 500): T {
  // 아무 인자(unknown[])를 받아서 아무것도 반환하지 않는(void) 함수 타입
  
  const lastCalled = useRef(0);
  // 마지막으로 콜백이 실행된 시각을 저장하는 ref (컴포넌트가 리렌더되어도 값이 유지됨)

  function throttle(...args: Parameters<T>) {
    const now = Date.now();
    // 마지막 실행 시점과 현재 시점의 차이가 delay 이상일 때만 콜백 실행
    if (now - lastCalled.current >= delay) {
      console.log("throttle 실행 시점: ", new Date().toISOString());
      lastCalled.current = now;
      callback(...args);
    }
    // delay가 지나지 않았다면 콜백 실행하지 않음
  }

  // 타입 단언: 반환 타입을 원래 콜백과 동일하게 맞춤
  return throttle as T;
}

export default useThrottle;