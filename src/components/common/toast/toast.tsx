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
        'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border p-4 shadow-lg backdrop-blur-sm transition-all',
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
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: style.iconBg }}
      >
        {customIcon ? (
          <span style={{ color: style.icon }}>{customIcon}</span>
        ) : (
          <IconComponent
            size={18}
            className={cn(isLoading && 'animate-spin')}
            style={{ color: style.icon }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-sm font-semibold" style={{ color: style.text }}>
          {title}
        </p>
        {description && (
          <p className="text-xs opacity-80" style={{ color: style.text }}>
            {description}
          </p>
        )}
        {action && (
          <button
            onClick={() => {
              action.onClick();
              hotToast.dismiss(t.id);
            }}
            className="mt-2 self-start rounded-md px-3 py-1.5 text-xs font-medium transition-colors hover:opacity-80"
            style={{
              backgroundColor: style.icon,
              color: style.bg,
            }}
          >
            {action.label}
          </button>
        )}
      </div>

      {/* Dismiss button */}
      {dismissible && !isLoading && (
        <button
          onClick={() => hotToast.dismiss(t.id)}
          className="shrink-0 rounded-md p-1 opacity-60 transition-opacity hover:opacity-100"
          style={{ color: style.text }}
        >
          <X size={16} />
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
