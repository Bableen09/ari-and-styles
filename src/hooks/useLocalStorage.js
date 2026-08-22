import { useState, useEffect } from 'react';

/**
 * Robust localStorage hook with error boundary and JSON corruption recovery
 * @param {string} key - localStorage key
 * @param {*} initialValue - fallback value
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === 'undefined') return initialValue;
      const item = window.localStorage.getItem(key);
      if (item === null) return initialValue;
      return JSON.parse(item);
    } catch (error) {
      console.warn(`[useLocalStorage] Error parsing key "${key}", resetting to fallback:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(`[useLocalStorage] Error saving key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
