import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to detect if a media query matches
 * @param query - CSS media query string (e.g., '(min-width: 768px)')
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = useCallback((): boolean => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia(query).matches;
  }, [query]);

  const [matches, setMatches] = useState<boolean>(getMatches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Set initial value
    setMatches(mediaQueryList.matches);

    // Listen for changes
    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

/**
 * Hook to detect if the viewport is mobile-sized
 * Uses 768px (md breakpoint) as the threshold
 * @returns boolean - true if viewport width < 768px
 */
export function useIsMobile(): boolean {
  return !useMediaQuery('(min-width: 768px)');
}

/**
 * Hook to detect if the viewport is tablet-sized or larger
 * Uses 768px (md breakpoint) as the threshold
 * @returns boolean - true if viewport width >= 768px
 */
export function useIsTabletOrLarger(): boolean {
  return useMediaQuery('(min-width: 768px)');
}

/**
 * Hook to detect if the viewport is desktop-sized
 * Uses 1024px (lg breakpoint) as the threshold
 * @returns boolean - true if viewport width >= 1024px
 */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}
