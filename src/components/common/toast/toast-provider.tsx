import { Toaster } from 'react-hot-toast';
import type { ToastProviderProps, ToastPosition } from './types';

// Position mapping for react-hot-toast
const positionMap: Record<
  ToastPosition,
  'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
> = {
  'top-left': 'top-left',
  'top-center': 'top-center',
  'top-right': 'top-right',
  'bottom-left': 'bottom-left',
  'bottom-center': 'bottom-center',
  'bottom-right': 'bottom-right',
};

export function ToastProvider({
  position = 'top-center',
  // maxToasts = 5,
  gap = 6,
  children,
}: ToastProviderProps) {
  return (
    <>
      {children}
      <Toaster
        position={positionMap[position]}
        toastOptions={{
          duration: 3000,
        }}
        containerStyle={{
          top: 12,
          right: 12,
          bottom: 12,
          left: 12,
        }}
        gutter={gap}
        containerClassName="toast-container"
      />
    </>
  );
}

export default ToastProvider;
