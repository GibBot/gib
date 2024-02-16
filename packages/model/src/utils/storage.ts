import { useState, useEffect } from 'react';

// 继承此接口，可自定义 storage
export type StorageLike = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

const localStorageEngine: StorageLike = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) =>
    Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key: string) =>
    Promise.resolve(localStorage.removeItem(key)),
};

/**
 * useStorage
 * @param key localStorage key
 * @param initialValue 初始值
 * @param storage 自定义 storage
 * @returns [value, setValue, removeValue]
 */
export function useStorage<T>(
  key: string,
  initialValue: T,
  storage: StorageLike = localStorageEngine,
): [T, (value: T) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    storage.getItem(key).then((item: string | null) => {
      setStoredValue(item ? JSON.parse(item) : initialValue);
    });
  }, [key, initialValue, storage]);

  const setValue = (value: T) => {
    setStoredValue(value);
    storage.setItem(key, JSON.stringify(value));
  };

  const removeValue = () => {
    setStoredValue(initialValue);
    storage.removeItem(key);
  };

  return [storedValue, setValue, removeValue];
}

/**
 * useLocalStorage
 * @param key localStorage key
 * @param initialValue 初始值
 * @returns [value, setValue, removeValue]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void, () => void] {
  const storage: StorageLike = {
    getItem: (key: string) =>
      Promise.resolve(
        typeof window !== 'undefined'
          ? window.localStorage.getItem(key)
          : null,
      ),
    setItem: (key: string, value: string) =>
      Promise.resolve(
        typeof window !== 'undefined'
          ? window.localStorage.setItem(key, value)
          : undefined,
      ),
    removeItem: (key: string) =>
      Promise.resolve(
        typeof window !== 'undefined'
          ? window.localStorage.removeItem(key)
          : undefined,
      ),
  };

  return useStorage(key, initialValue, storage);
}

/**
 * useSessionStorage
 * @param key SessionStorage key
 * @param initialValue 初始值
 * @returns [value, setValue, removeValue]
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void, () => void] {
  const storage: StorageLike = {
    getItem: (key: string) =>
      Promise.resolve(
        typeof window !== 'undefined'
          ? window.sessionStorage.getItem(key)
          : null,
      ),
    setItem: (key: string, value: string) =>
      Promise.resolve(
        typeof window !== 'undefined'
          ? window.sessionStorage.setItem(key, value)
          : undefined,
      ),
    removeItem: (key: string) =>
      Promise.resolve(
        typeof window !== 'undefined'
          ? window.sessionStorage.removeItem(key)
          : undefined,
      ),
  };

  return useStorage(key, initialValue, storage);
}
