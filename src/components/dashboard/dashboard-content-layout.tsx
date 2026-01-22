import { cn } from '@/lib/utils';

type MaxWidthVariant =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | 'full';

interface DashboardContentLayoutProps {
  children: React.ReactNode;
  /**
   * Maximum width of the content area
   * @default '7xl'
   */
  maxWidth?: MaxWidthVariant;
  /**
   * Additional className for the container
   */
  className?: string;
  /**
   * Whether to add default vertical spacing between children
   * @default true
   */
  withSpacing?: boolean;
  /**
   * Spacing size between children
   * @default 'md'
   */
  spacingSize?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Padding size for the container
   * @default 'md'
   */
  paddingSize?: 'none' | 'sm' | 'md' | 'lg';
  /**
   * Whether content should be centered
   * @default true
   */
  centered?: boolean;
}

const MAX_WIDTH_CLASSES: Record<MaxWidthVariant, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};

const SPACING_CLASSES = {
  sm: 'space-y-4',
  md: 'space-y-6',
  lg: 'space-y-8',
  xl: 'space-y-10',
};

const PADDING_CLASSES = {
  none: '',
  sm: 'px-4 py-4 sm:px-6 sm:py-6',
  md: 'px-4 py-6 sm:px-6 sm:py-8 lg:px-8',
  lg: 'px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12',
};

/**
 * A common layout component for dashboard content areas.
 * Provides consistent responsive spacing, max-width constraints, and padding.
 *
 * Usage:
 * ```tsx
 * <DashboardContentLayout maxWidth="7xl" spacingSize="md">
 *   <SectionHeader />
 *   <ContentGrid />
 * </DashboardContentLayout>
 * ```
 */
export function DashboardContentLayout({
  children,
  maxWidth = '7xl',
  className,
  withSpacing = true,
  spacingSize = 'md',
  paddingSize = 'md',
  centered = true,
}: DashboardContentLayoutProps) {
  return (
    <div
      className={cn(
        'w-full',
        MAX_WIDTH_CLASSES[maxWidth],
        centered && 'mx-auto',
        withSpacing && SPACING_CLASSES[spacingSize],
        PADDING_CLASSES[paddingSize],
        className
      )}
    >
      {children}
    </div>
  );
}

// Section wrapper for grouping related content with a header
interface DashboardSectionProps {
  children: React.ReactNode;
  /**
   * Section title
   */
  title?: string;
  /**
   * Optional right-side element (e.g., count, action button)
   */
  headerAction?: React.ReactNode;
  /**
   * Additional className for the section
   */
  className?: string;
  /**
   * Spacing between header and content
   * @default 'md'
   */
  headerSpacing?: 'sm' | 'md' | 'lg';
}

const HEADER_SPACING_CLASSES = {
  sm: 'mb-3',
  md: 'mb-4',
  lg: 'mb-6',
};

export function DashboardSection({
  children,
  title,
  headerAction,
  className,
  headerSpacing = 'md',
}: DashboardSectionProps) {
  return (
    <section className={cn('w-full', className)}>
      {(title || headerAction) && (
        <div
          className={cn('flex items-center justify-between', HEADER_SPACING_CLASSES[headerSpacing])}
        >
          {title && <h2 className="text-foreground text-sm font-semibold">{title}</h2>}
          {headerAction && <div className="text-muted-foreground text-xs">{headerAction}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

// Responsive grid for cards
interface DashboardGridProps {
  children: React.ReactNode;
  /**
   * Minimum width of each grid item
   * @default 250
   */
  minItemWidth?: number;
  /**
   * Gap between grid items
   * @default 'md'
   */
  gap?: 'sm' | 'md' | 'lg';
  /**
   * Additional className
   */
  className?: string;
}

const GAP_CLASSES = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
};

export function DashboardGrid({
  children,
  minItemWidth = 250,
  gap = 'md',
  className,
}: DashboardGridProps) {
  return (
    <div
      className={cn('grid', GAP_CLASSES[gap], className)}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(min(${minItemWidth}px, 100%), 1fr))`,
      }}
    >
      {children}
    </div>
  );
}

// Empty state wrapper
interface DashboardEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function DashboardEmptyState({
  icon,
  title,
  description,
  action,
  className,
}: DashboardEmptyStateProps) {
  return (
    <div
      className={cn(
        'border-border/50 flex flex-col items-center justify-center rounded-xl border py-12 text-center',
        className
      )}
    >
      {icon && (
        <div className="bg-muted/50 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
          {icon}
        </div>
      )}
      <p className="text-muted-foreground text-sm">{title}</p>
      {description && <p className="text-muted-foreground/70 mt-1 text-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// Two-column layout for detail pages
interface DashboardDetailLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  /**
   * Sidebar width on large screens
   * @default 320
   */
  sidebarWidth?: number;
  /**
   * Max width of the main content area
   * @default '2xl'
   */
  contentMaxWidth?: MaxWidthVariant;
  /**
   * Gap between content and sidebar
   * @default 'lg'
   */
  gap?: 'md' | 'lg' | 'xl';
  /**
   * Additional className
   */
  className?: string;
}

const DETAIL_GAP_CLASSES = {
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-10',
};

export function DashboardDetailLayout({
  children,
  sidebar,
  sidebarWidth = 320,
  contentMaxWidth = '2xl',
  gap = 'lg',
  className,
}: DashboardDetailLayoutProps) {
  return (
    <div className={cn('flex flex-col lg:flex-row', DETAIL_GAP_CLASSES[gap], className)}>
      {/* Main Content */}
      <div className={cn('flex-1', MAX_WIDTH_CLASSES[contentMaxWidth])}>{children}</div>

      {/* Sidebar */}
      <aside
        className="w-full shrink-0 space-y-6 lg:sticky lg:top-20 lg:self-start"
        style={{ maxWidth: sidebarWidth }}
      >
        {sidebar}
      </aside>
    </div>
  );
}
