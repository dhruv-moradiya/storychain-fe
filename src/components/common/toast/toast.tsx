import * as React from 'react';
import { toast as hotToast, type Toast as HotToast } from 'react-hot-toast';
import { CheckCircle, XCircle, AlertTriangle, Info, Bell, Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ToastVariant, ToastOptions } from './types';
import { getToastStyle } from './styles';

// Icon mapping
const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
  default: Bell,
  loading: Loader2,
};

interface ToastContentProps {
  t: HotToast;
  title: string;
  variant: ToastVariant;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
  customIcon?: React.ReactNode;
}

function ToastContent({
  t,
  title,
  variant,
  description,
  action,
  dismissible = true,
  customIcon,
}: ToastContentProps) {
  const style = getToastStyle(variant);
  const IconComponent = iconMap[variant];
  const isLoading = variant === 'loading';

  return (
    <div
      className={cn(
        'pointer-events-auto flex w-full max-w-[calc(100vw-32px)] items-center gap-2.5 rounded-lg border px-3 py-2.5 shadow-md backdrop-blur-sm transition-all sm:max-w-xs',
        t.visible
          ? 'animate-in fade-in slide-in-from-top-2'
          : 'animate-out fade-out slide-out-to-right-2'
      )}
      style={{
        backgroundColor: style.bg,
        borderColor: style.border,
      }}
    >
      {/* Icon */}
      <div
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
        style={{ backgroundColor: style.iconBg }}
      >
        {customIcon ? (
          <span style={{ color: style.icon }}>{customIcon}</span>
        ) : (
          <IconComponent
            size={14}
            className={cn(isLoading && 'animate-spin')}
            style={{ color: style.icon }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="truncate text-xs font-medium" style={{ color: style.text }}>
          {title}
        </p>
        {description && (
          <p className="truncate text-[10px] opacity-75" style={{ color: style.text }}>
            {description}
          </p>
        )}
      </div>

      {/* Action button */}
      {action && (
        <button
          onClick={() => {
            action.onClick();
            hotToast.dismiss(t.id);
          }}
          className="shrink-0 rounded px-2 py-1 text-[10px] font-medium transition-colors hover:opacity-80"
          style={{
            backgroundColor: style.icon,
            color: style.bg,
          }}
        >
          {action.label}
        </button>
      )}

      {/* Dismiss button */}
      {dismissible && !isLoading && (
        <button
          onClick={() => hotToast.dismiss(t.id)}
          className="-mr-1 shrink-0 rounded p-0.5 opacity-50 transition-opacity hover:opacity-100"
          style={{ color: style.text }}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

// Generate unique ID for toast
let toastCounter = 0;
function generateToastId(prefix: string = 'toast') {
  return `${prefix}-${++toastCounter}-${Date.now()}`;
}

// Create toast function
function createToast(title: string, variant: ToastVariant, options?: ToastOptions) {
  const {
    id: providedId,
    duration = variant === 'loading' ? Infinity : 4000,
    icon,
    description,
    action,
    dismissible = true,
  } = options || {};

  // Use provided ID or generate a unique one to prevent duplicates
  const id = providedId || generateToastId(variant);

  // Dismiss any existing toast with the same ID first
  hotToast.dismiss(id);

  return hotToast.custom(
    (t) => (
      <ToastContent
        t={t}
        title={title}
        variant={variant}
        description={description}
        action={action}
        dismissible={dismissible}
        customIcon={icon as React.ReactNode}
      />
    ),
    {
      id,
      duration,
    }
  );
}

// Toast API
export const toast = {
  // Basic variants
  success: (title: string, options?: ToastOptions) => createToast(title, 'success', options),

  error: (title: string, options?: ToastOptions) => createToast(title, 'error', options),

  warning: (title: string, options?: ToastOptions) => createToast(title, 'warning', options),

  info: (title: string, options?: ToastOptions) => createToast(title, 'info', options),

  default: (title: string, options?: ToastOptions) => createToast(title, 'default', options),

  loading: (title: string, options?: ToastOptions) => createToast(title, 'loading', options),

  // Utility methods
  dismiss: (id?: string) => hotToast.dismiss(id),

  remove: (id?: string) => hotToast.remove(id),

  // Promise toast
  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((err: Error) => string);
    },
    options?: ToastOptions
  ) => {
    const id = createToast(messages.loading, 'loading', {
      ...options,
      dismissible: false,
    });

    promise
      .then((data) => {
        const successMessage =
          typeof messages.success === 'function' ? messages.success(data) : messages.success;
        hotToast.dismiss(id);
        createToast(successMessage, 'success', options);
      })
      .catch((err) => {
        const errorMessage =
          typeof messages.error === 'function' ? messages.error(err) : messages.error;
        hotToast.dismiss(id);
        createToast(errorMessage, 'error', options);
      });

    return promise;
  },

  // Custom toast
  custom: (content: React.ReactNode, options?: { id?: string; duration?: number }) =>
    hotToast.custom(() => <>{content}</>, options),
};

export default toast;
