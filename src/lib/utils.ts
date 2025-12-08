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
