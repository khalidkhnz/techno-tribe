import { useEffect, useRef, RefObject } from 'react';

interface UseDetectOutsideClickOptions {
  callback: () => void;
  enabled?: boolean;
}

export function useDetectOutsideClick<T extends HTMLElement = HTMLElement>(
  options: UseDetectOutsideClickOptions
): RefObject<T | null> {
  const { callback, enabled = true } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, enabled]);

  return ref;
} 