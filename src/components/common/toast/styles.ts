import type { ToastVariant, ToastStyleConfig } from './types';

// Toast style configurations using CSS variables
export const toastStyles: Record<ToastVariant, ToastStyleConfig> = {
  success: {
    bg: 'var(--toast-success-bg)',
    border: 'var(--toast-success-border)',
    text: 'var(--toast-success-text)',
    icon: 'var(--toast-success-icon)',
    iconBg: 'var(--toast-success-icon-bg)',
  },
  error: {
    bg: 'var(--toast-error-bg)',
    border: 'var(--toast-error-border)',
    text: 'var(--toast-error-text)',
    icon: 'var(--toast-error-icon)',
    iconBg: 'var(--toast-error-icon-bg)',
  },
  warning: {
    bg: 'var(--toast-warning-bg)',
    border: 'var(--toast-warning-border)',
    text: 'var(--toast-warning-text)',
    icon: 'var(--toast-warning-icon)',
    iconBg: 'var(--toast-warning-icon-bg)',
  },
  info: {
    bg: 'var(--toast-info-bg)',
    border: 'var(--toast-info-border)',
    text: 'var(--toast-info-text)',
    icon: 'var(--toast-info-icon)',
    iconBg: 'var(--toast-info-icon-bg)',
  },
  default: {
    bg: 'var(--toast-default-bg)',
    border: 'var(--toast-default-border)',
    text: 'var(--toast-default-text)',
    icon: 'var(--toast-default-icon)',
    iconBg: 'var(--toast-default-icon-bg)',
  },
  loading: {
    bg: 'var(--toast-loading-bg)',
    border: 'var(--toast-loading-border)',
    text: 'var(--toast-loading-text)',
    icon: 'var(--toast-loading-icon)',
    iconBg: 'var(--toast-loading-icon-bg)',
  },
};

// Get style for a toast variant
export function getToastStyle(variant: ToastVariant): ToastStyleConfig {
  return toastStyles[variant];
}

// Default icons for each variant
export const defaultIcons = {
  success: 'CheckCircle',
  error: 'XCircle',
  warning: 'AlertTriangle',
  info: 'Info',
  default: 'Bell',
  loading: 'Loader2',
} as const;
