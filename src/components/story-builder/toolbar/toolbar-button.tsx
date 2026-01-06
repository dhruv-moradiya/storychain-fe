import { Button } from '@/components/ui/button';

type ToolbarButtonProps = {
  children: React.ReactNode;
};

export const ToolbarButton = ({ children }: ToolbarButtonProps) => {
  return (
    <Button variant="ghost" className="rounded-2xl">
      {children}
    </Button>
  );
};
