import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.45 },
});

// Scroll-based reveal animations for viewport entry
// Using 'easeOut' instead of cubic-bezier for type compatibility
export const scrollReveal = {
  heading: {
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
  paragraph: {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
  image: {
    initial: { opacity: 0, scale: 0.98 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.65, ease: 'easeOut' as const },
  },
  card: (index: number) => ({
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-30px' },
    transition: { duration: 0.5, delay: index * 0.08, ease: 'easeOut' as const },
  }),
  list: (index: number) => ({
    initial: { opacity: 0, x: -8 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-20px' },
    transition: { duration: 0.4, delay: index * 0.06, ease: 'easeOut' as const },
  }),
};

// utils/handleApiError.ts
import { AxiosError } from 'axios';
import type { IApiError } from '@/type';

export function handleApiError(error: unknown): string {
  // Axios Error
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as IApiError | undefined;

    if (apiError?.message) return apiError.message;

    return error.message || 'Request failed';
  }

  // React Query / Zod / unknown errors
  if (error instanceof Error) return error.message;

  return 'Something went wrong';
}
