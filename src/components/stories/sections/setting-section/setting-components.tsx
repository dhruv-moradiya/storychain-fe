import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Image, Loader2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

/* ---------------------------------------------
 * Setting Card Container
 * --------------------------------------------*/
export const SettingCard = ({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="border-border/50 rounded-xl border"
  >
    {(title || description) && (
      <div className="border-border/30 border-b px-5 py-4">
        {title && <h3 className="text-text-primary font-semibold">{title}</h3>}
        {description && <p className="text-text-secondary-65 mt-1 text-sm">{description}</p>}
      </div>
    )}
    <div className="divide-border/30 flex flex-col divide-y">{children}</div>
  </motion.div>
);

/* ---------------------------------------------
 * Base Row
 * --------------------------------------------*/
export const BaseRow = ({
  icon,
  label,
  description,
  action,
}: {
  icon: React.ReactNode;
  label: string;
  description?: string;
  action?: React.ReactNode;
}) => (
  <div className="hover:bg-muted/30 flex items-center justify-between gap-4 px-5 py-4 transition">
    <div className="flex items-start gap-3">
      <div className="bg-brand-pink-500/10 text-brand-pink-500 mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-text-primary text-sm font-medium">{label}</span>
        {description && (
          <span className="text-text-secondary-65 text-xs leading-tight">{description}</span>
        )}
      </div>
    </div>
    {action}
  </div>
);

/* ---------------------------------------------
 * Toggle Row
 * --------------------------------------------*/
export const ToggleRow = ({
  icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <BaseRow
    icon={icon}
    label={label}
    description={description}
    action={
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-brand-pink-500"
      />
    }
  />
);

/* ---------------------------------------------
 * Readonly Row
 * --------------------------------------------*/
export const ReadonlyRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <BaseRow
    icon={icon}
    label={label}
    action={
      <span className="bg-muted/50 text-text-secondary rounded-md px-3 py-1 text-sm">{value}</span>
    }
  />
);

/* ---------------------------------------------
 * Badge Row - for displaying badges instead of text
 * --------------------------------------------*/
export const BadgeRow = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <BaseRow
    icon={icon}
    label={label}
    action={<div className="flex flex-wrap gap-1.5">{children}</div>}
  />
);

/* ---------------------------------------------
 * Image Upload Row
 * --------------------------------------------*/
export const ImageRow = ({
  label,
  hint,
  aspectClass,
  preview,
  currentImage,
  uploading,
  onSelect,
  onRemove,
}: {
  label: string;
  hint: string;
  aspectClass: string;
  preview: string | null;
  currentImage?: string;
  uploading: boolean;
  onSelect: (file: File) => void;
  onRemove?: () => void;
}) => {
  const displayImage = preview || currentImage;

  return (
    <div className="px-5 py-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-text-primary text-sm font-medium">{label}</span>
        <span className="text-text-secondary-65 text-xs">{hint}</span>
      </div>

      <label className="group block cursor-pointer">
        <input
          type="file"
          hidden
          accept="image/*"
          disabled={uploading}
          onChange={(e) => e.target.files && onSelect(e.target.files[0])}
        />

        <div
          className={cn(
            'relative overflow-hidden rounded-xl border-2 border-dashed transition-all',
            aspectClass,
            uploading
              ? 'border-brand-pink-500/30 opacity-60'
              : 'border-border/50 hover:border-brand-pink-500/50'
          )}
        >
          {displayImage ? (
            <img src={displayImage} className="h-full w-full object-cover" alt={label} />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2">
              <div className="bg-brand-pink-500/10 flex h-12 w-12 items-center justify-center rounded-xl">
                <Image size={24} className="text-brand-pink-500" />
              </div>
              <span className="text-text-secondary-65 text-sm">Click to upload</span>
            </div>
          )}

          {!uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
              <span className="rounded-lg bg-white px-4 py-2 text-sm font-medium shadow-lg">
                {displayImage ? 'Change image' : 'Upload image'}
              </span>
            </div>
          )}

          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-lg">
                <Loader2 size={16} className="text-brand-pink-500 animate-spin" />
                <span className="text-sm">Uploading...</span>
              </div>
            </div>
          )}
        </div>
      </label>

      {displayImage && onRemove && !uploading && (
        <button
          onClick={onRemove}
          className="text-destructive mt-2 flex items-center gap-1.5 text-xs hover:underline"
        >
          <Trash2 size={12} />
          Remove image
        </button>
      )}
    </div>
  );
};
