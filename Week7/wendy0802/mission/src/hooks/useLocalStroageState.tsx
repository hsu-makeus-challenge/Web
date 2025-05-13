import { useState } from "react";

// 쿠키 관련 유틸리티 함수
const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

const setCookie = (name: string, value: string, days = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Strict; Secure`;
};

const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export function useLocalStorageState<T>(key: string, initialValue: T | null = null) {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      // 먼저 쿠키에서 값을 찾음
      const cookieValue = getCookie(key);
      if (cookieValue) {
        return JSON.parse(cookieValue);
      }

      // 쿠키에 없으면 localStorage에서 찾음
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading stored value:', error);
      return initialValue;
    }
  });

  const setValue = (value: T | null) => {
    try {
      setStoredValue(value);
      
      if (value === null) {
        // 값이 null이면 저장소에서 제거
        window.localStorage.removeItem(key);
        removeCookie(key);
      } else {
        // 값이 있으면 저장
        const stringValue = JSON.stringify(value);
        window.localStorage.setItem(key, stringValue);
        
        // refreshToken은 쿠키에만 저장
        if (key === 'refreshToken') {
          setCookie(key, stringValue);
          window.localStorage.removeItem(key); // localStorage에서는 제거
        }
      }
    } catch (error) {
      console.error('Error saving value:', error);
    }
  };

  return [storedValue, setValue] as const;
}