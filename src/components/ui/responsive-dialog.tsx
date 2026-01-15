import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';

import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';

/* -------------------------------------------------------------------------------------------------
 * Context
 * -------------------------------------------------------------------------------------------------*/

interface ResponsiveDialogContextValue {
  isMobile: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ResponsiveDialogContext = React.createContext<ResponsiveDialogContextValue | null>(null);

function useResponsiveDialogContext(): ResponsiveDialogContextValue {
  const context = React.useContext(ResponsiveDialogContext);
  if (!context) {
    throw new Error('ResponsiveDialog components must be used within a ResponsiveDialog');
  }
  return context;
}

/* -------------------------------------------------------------------------------------------------
 * ResponsiveDialog (Root)
 * -------------------------------------------------------------------------------------------------*/

interface ResponsiveDialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

function ResponsiveDialog({
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  defaultOpen = false,
}: ResponsiveDialogProps) {
  const isMobile = useIsMobile();
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const onOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen);
      }
      controlledOnOpenChange?.(newOpen);
    },
    [isControlled, controlledOnOpenChange]
  );

  const contextValue = React.useMemo(
    () => ({ isMobile, open, onOpenChange }),
    [isMobile, open, onOpenChange]
  );

  return (
    <ResponsiveDialogContext.Provider value={contextValue}>
      <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
        {children}
      </DialogPrimitive.Root>
    </ResponsiveDialogContext.Provider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * ResponsiveDialogTrigger
 * -------------------------------------------------------------------------------------------------*/

interface ResponsiveDialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

function ResponsiveDialogTrigger({
  children,
  asChild = false,
  className,
}: ResponsiveDialogTriggerProps) {
  return (
    <DialogPrimitive.Trigger asChild={asChild} className={className}>
      {children}
    </DialogPrimitive.Trigger>
  );
}

/* -------------------------------------------------------------------------------------------------
 * ResponsiveDialogClose
 * -------------------------------------------------------------------------------------------------*/

interface ResponsiveDialogCloseProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

function ResponsiveDialogClose({
  children,
  asChild = false,
  className,
}: ResponsiveDialogCloseProps) {
  return (
    <DialogPrimitive.Close asChild={asChild} className={className}>
      {children}
    </DialogPrimitive.Close>
  );
}

/* -------------------------------------------------------------------------------------------------
 * ResponsiveDialogContent
 * -------------------------------------------------------------------------------------------------*/

interface ResponsiveDialogContentProps {
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  /** Additional class for the overlay */
  overlayClassName?: string;
  /** Height of the sheet on mobile - 'auto' | 'full' | percentage string like '80%' */
  sheetHeight?: 'auto' | 'full' | string;
  /** Whether the sheet can be dismissed by dragging down */
  dismissible?: boolean;
  /** Callback when sheet is dragged - provides drag progress (0-1) */
  onDrag?: (progress: number) => void;
}

function ResponsiveDialogContent({
  children,
  className,
  showCloseButton = true,
  overlayClassName,
  sheetHeight = 'auto',
  dismissible = true,
  onDrag,
}: ResponsiveDialogContentProps) {
  const { isMobile, open, onOpenChange } = useResponsiveDialogContext();

  if (isMobile) {
    return (
      <SheetContent
        open={open}
        onOpenChange={onOpenChange}
        className={className}
        overlayClassName={overlayClassName}
        showCloseButton={showCloseButton}
        sheetHeight={sheetHeight}
        dismissible={dismissible}
        onDrag={onDrag}
      >
        {children}
      </SheetContent>
    );
  }

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn(
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bg-background/50 fixed inset-0 z-50',
          overlayClassName
        )}
      />
      <DialogPrimitive.Content
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          className
        )}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

/* -------------------------------------------------------------------------------------------------
 * SheetContent (Mobile Bottom Sheet - Internal)
 * -------------------------------------------------------------------------------------------------*/

interface SheetContentProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  overlayClassName?: string;
  showCloseButton?: boolean;
  sheetHeight?: 'auto' | 'full' | string;
  dismissible?: boolean;
  onDrag?: (progress: number) => void;
}

const DRAG_CLOSE_THRESHOLD = 100;
const VELOCITY_THRESHOLD = 500;

function SheetContent({
  children,
  open,
  onOpenChange,
  className,
  overlayClassName,
  showCloseButton = true,
  sheetHeight = 'auto',
  dismissible = true,
  onDrag,
}: SheetContentProps) {
  const sheetRef = React.useRef<HTMLDivElement>(null);
  const [sheetHeightPx, setSheetHeightPx] = React.useState(0);

  // Measure sheet height for drag calculations
  React.useEffect(() => {
    if (open && sheetRef.current) {
      const height = sheetRef.current.getBoundingClientRect().height;
      setSheetHeightPx(height);
    }
  }, [open]);

  const handleDragEnd = React.useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (!dismissible) return;

      const shouldClose =
        info.offset.y > DRAG_CLOSE_THRESHOLD || info.velocity.y > VELOCITY_THRESHOLD;

      if (shouldClose) {
        onOpenChange(false);
      }
    },
    [dismissible, onOpenChange]
  );

  const handleDrag = React.useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (!onDrag || sheetHeightPx === 0) return;
      const progress = Math.max(0, Math.min(1, info.offset.y / sheetHeightPx));
      onDrag(progress);
    },
    [onDrag, sheetHeightPx]
  );

  const getSheetHeightStyle = (): string => {
    if (sheetHeight === 'auto') return 'auto';
    if (sheetHeight === 'full') return '100%';
    return sheetHeight;
  };

  return (
    <DialogPrimitive.Portal forceMount>
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={cn('bg-background/50 fixed inset-0 z-50', overlayClassName)}
              />
            </DialogPrimitive.Overlay>

            {/* Sheet Content */}
            <DialogPrimitive.Content asChild forceMount>
              <motion.div
                ref={sheetRef}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{
                  type: 'spring',
                  damping: 30,
                  stiffness: 300,
                }}
                drag={dismissible ? 'y' : false}
                dragConstraints={{ top: 0 }}
                dragElastic={{ top: 0, bottom: 0.5 }}
                onDragEnd={handleDragEnd}
                onDrag={handleDrag}
                style={{
                  height: getSheetHeightStyle(),
                  maxHeight: 'calc(100vh - 2rem)',
                }}
                className={cn(
                  'bg-background fixed right-0 bottom-0 left-0 z-50 flex flex-col rounded-t-2xl border-t shadow-xl outline-none',
                  className
                )}
              >
                {/* Drag Handle */}
                {dismissible && (
                  <div className="flex justify-center pt-3 pb-2">
                    <div className="bg-muted-foreground/30 h-1.5 w-12 rounded-full" />
                  </div>
                )}

                {/* Content Container */}
                <div className="flex-1 overflow-y-auto overscroll-contain p-4 pt-2">{children}</div>

                {/* Close Button */}
                {showCloseButton && (
                  <DialogPrimitive.Close className="ring-offset-background focus:ring-ring absolute top-3 right-3 rounded-full p-1 opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
                    <XIcon className="size-5" />
                    <span className="sr-only">Close</span>
                  </DialogPrimitive.Close>
                )}
              </motion.div>
            </DialogPrimitive.Content>
          </>
        )}
      </AnimatePresence>
    </DialogPrimitive.Portal>
  );
}

/* -------------------------------------------------------------------------------------------------
 * ResponsiveDialogHeader
 * -------------------------------------------------------------------------------------------------*/

interface ResponsiveDialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

function ResponsiveDialogHeader({ children, className }: ResponsiveDialogHeaderProps) {
  const { isMobile } = useResponsiveDialogContext();

  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        isMobile ? 'text-center' : 'text-center sm:text-left',
        className
      )}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * ResponsiveDialogFooter
 * -------------------------------------------------------------------------------------------------*/

interface ResponsiveDialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

function ResponsiveDialogFooter({ children, className }: ResponsiveDialogFooterProps) {
  const { isMobile } = useResponsiveDialogContext();

  return (
    <div
      className={cn(
        'flex gap-2',
        isMobile ? 'flex-col-reverse' : 'flex-col-reverse sm:flex-row sm:justify-end',
        className
      )}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * ResponsiveDialogTitle
 * -------------------------------------------------------------------------------------------------*/

interface ResponsiveDialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

function ResponsiveDialogTitle({ children, className }: ResponsiveDialogTitleProps) {
  return (
    <DialogPrimitive.Title className={cn('text-lg leading-none font-semibold', className)}>
      {children}
    </DialogPrimitive.Title>
  );
}

/* -------------------------------------------------------------------------------------------------
 * ResponsiveDialogDescription
 * -------------------------------------------------------------------------------------------------*/

interface ResponsiveDialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

function ResponsiveDialogDescription({ children, className }: ResponsiveDialogDescriptionProps) {
  return (
    <DialogPrimitive.Description className={cn('text-muted-foreground text-sm', className)}>
      {children}
    </DialogPrimitive.Description>
  );
}

/* -------------------------------------------------------------------------------------------------
 * ResponsiveDialogBody
 * -------------------------------------------------------------------------------------------------*/

interface ResponsiveDialogBodyProps {
  children: React.ReactNode;
  className?: string;
}

function ResponsiveDialogBody({ children, className }: ResponsiveDialogBodyProps) {
  return <div className={cn('py-4', className)}>{children}</div>;
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -------------------------------------------------------------------------------------------------*/

export {
  ResponsiveDialog,
  ResponsiveDialogTrigger,
  ResponsiveDialogContent,
  ResponsiveDialogClose,
  ResponsiveDialogHeader,
  ResponsiveDialogFooter,
  ResponsiveDialogTitle,
  ResponsiveDialogDescription,
  ResponsiveDialogBody,
  useResponsiveDialogContext,
};

export type {
  ResponsiveDialogProps,
  ResponsiveDialogTriggerProps,
  ResponsiveDialogContentProps,
  ResponsiveDialogCloseProps,
  ResponsiveDialogHeaderProps,
  ResponsiveDialogFooterProps,
  ResponsiveDialogTitleProps,
  ResponsiveDialogDescriptionProps,
  ResponsiveDialogBodyProps,
};
