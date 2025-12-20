import { useState } from 'react';
import { Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ReportDialog } from './report-dialog';
import { type ReportType, type CreateReportData } from '@/type/report.type';
import { toast } from 'sonner';

interface ReportButtonProps {
  reportType: ReportType;
  relatedId: string;
  relatedTitle?: string;
  variant?: 'default' | 'ghost' | 'outline' | 'secondary' | 'destructive' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  onReportSubmit?: (data: CreateReportData) => Promise<void>;
}

export function ReportButton({
  reportType,
  relatedId,
  relatedTitle,
  variant = 'ghost',
  size = 'icon',
  className,
  onReportSubmit,
}: ReportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CreateReportData) => {
    setIsLoading(true);
    try {
      if (onReportSubmit) {
        await onReportSubmit(data);
      } else {
        // TODO: Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      toast.success('Our team will review your report shortly.');
    } catch (error) {
      toast.error('Failed to submit report. Please try again later.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getLabel = () => {
    switch (reportType) {
      case 'CHAPTER':
        return 'Report Chapter';
      case 'COMMENT':
        return 'Report Comment';
      case 'USER':
        return 'Report User';
      case 'STORY':
        return 'Report Story';
      default:
        return 'Report';
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={variant}
              size={size}
              className={className}
              onClick={() => setIsOpen(true)}
            >
              <Flag className="h-4 w-4" />
              {size !== 'icon' && <span className="ml-2">{getLabel()}</span>}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{getLabel()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <ReportDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        onSubmit={handleSubmit}
        reportType={reportType}
        relatedId={relatedId}
        relatedTitle={relatedTitle}
        isLoading={isLoading}
      />
    </>
  );
}
