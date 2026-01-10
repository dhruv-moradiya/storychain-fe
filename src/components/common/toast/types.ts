import type { LucideIcon } from 'lucide-react';

// Toast variant types
export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'default' | 'loading';

// Toast position types
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

// Toast options interface
export interface ToastOptions {
  id?: string;
  duration?: number;
  icon?: LucideIcon | React.ReactNode;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
  className?: string;
}

// Toast data interface
export interface ToastData {
  title: string;
  variant: ToastVariant;
  options?: ToastOptions;
}

// Toast style config
export interface ToastStyleConfig {
  bg: string;
  border: string;
  text: string;
  icon: string;
  iconBg: string;
}

// Toast provider props
export interface ToastProviderProps {
  position?: ToastPosition;
  maxToasts?: number;
  gap?: number;
  children?: React.ReactNode;
}
