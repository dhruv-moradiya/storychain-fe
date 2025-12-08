interface IBaseType {
  success: boolean;
  message: string;
}

// types/api.types.ts
export interface IApiError {
  message: string;
  statusCode?: number;
}

type LayoutDirection = 'TB' | 'LR';

interface GroupButton {
  icon: React.ReactNode;
  tooltip: string;
  onClick?: (id: string) => void;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  id: string;
}

export type { GroupButton, LayoutDirection, IBaseType };
