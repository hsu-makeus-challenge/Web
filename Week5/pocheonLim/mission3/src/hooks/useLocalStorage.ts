import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  // 초기값을 가져오는 함수
  const getStoredValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  };

  // 상태 초기화
  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  // localStorage에 값을 저장하는 함수
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(
        key,
        typeof valueToStore === 'string' ? valueToStore : JSON.stringify(valueToStore)
      );
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage; 