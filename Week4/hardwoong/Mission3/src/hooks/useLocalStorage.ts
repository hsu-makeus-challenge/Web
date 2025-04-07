import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // 로컬 스토리지에서 기존 값을 가져오고 없으면 초기값 사용
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      console.warn('Error reading localStorage key:', key);
      return initialValue;
    }
  });

  // 다른 탭에서 로컬 스토리지 값이 바뀌었을 때 상태를 동기화
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          const newValue = event.newValue ? JSON.parse(event.newValue) : initialValue;
          setStoredValue(newValue);
        } catch {
          setStoredValue(initialValue);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  // 상태와 로컬 스토리지 값을 동시에 업데이트
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.warn('Error setting localStorage key:', key);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;