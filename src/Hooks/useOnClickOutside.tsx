import { RefObject, useEffect } from 'react';

const useOnClickOutside = (
  refs: (RefObject<HTMLElement> | HTMLElement)[], 
  handler: () => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const isOutside = refs.every(ref => {
        if (ref instanceof HTMLElement) {
          return !ref.contains(event.target as Node);
        } else {
          return ref.current && !ref.current.contains(event.target as Node);
        }
      });
      if (isOutside) {
        handler();
      }
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [refs, handler]);
};

export default useOnClickOutside;
