import { Handle, Position } from '@xyflow/react';
import { Plus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { cn } from '@/lib/utils';
import type { NodeProps, Node } from '@xyflow/react';

export interface AddNodePlaceholderData extends Record<string, unknown> {
  parentChapterId: string;
  storySlug?: string;
}

export type AddNodePlaceholderProps = NodeProps<Node<AddNodePlaceholderData>>;

export function AddNodePlaceholder({ data, selected }: AddNodePlaceholderProps) {
  const params = useParams();
  const navigate = useNavigate();
  const storySlug = data.storySlug || params.slug;

  const handleClick = () => {
    navigate(`/stories/${storySlug}/builder?mode=new&parent=${data.parentChapterId}`);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'group relative flex cursor-pointer flex-col items-center justify-center transition-all duration-300',
        'h-14 w-14 rounded-2xl',
        'via-cream-95 to-cream-90 bg-gradient-to-br from-white',
        'border border-dashed',
        selected
          ? 'border-brand-pink-500 shadow-brand-pink-shadow25 shadow-lg'
          : 'hover:shadow-brand-blue/20 border-black/20 hover:border-transparent hover:shadow-xl'
      )}
    >
      {/* Top Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!from-brand-blue !to-brand-pink-500 !-top-1 !h-2.5 !w-2.5 !rounded-full !border-2 !border-white !bg-gradient-to-br !shadow-sm"
      />

      {/* Gradient background on hover */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300',
          'from-brand-blue via-brand-pink-500 to-brand-orange bg-gradient-to-br',
          'group-hover:opacity-100'
        )}
      />

      {/* Icon */}
      <Plus
        className={cn(
          'relative z-10 h-6 w-6 transition-all duration-300',
          'text-text-secondary-65 group-hover:scale-110 group-hover:text-white'
        )}
        strokeWidth={2.5}
      />

      {/* Tooltip on hover */}
      <div
        className={cn(
          'absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap',
          'bg-text-primary rounded-lg px-2.5 py-1',
          'text-[10px] font-medium text-white',
          'opacity-0 transition-all duration-200',
          'group-hover:-bottom-9 group-hover:opacity-100',
          'shadow-lg'
        )}
      >
        <span className="font-sans">Add Chapter</span>
        {/* Tooltip arrow */}
        <div className="bg-text-primary absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45" />
      </div>

      {/* Outer glow effect */}
      <div
        className={cn(
          'pointer-events-none absolute -inset-1 -z-10 rounded-3xl opacity-0 blur-lg transition-opacity duration-300',
          'from-brand-blue/40 via-brand-pink-500/30 to-brand-orange/40 bg-gradient-to-br',
          'group-hover:opacity-100'
        )}
      />

      {/* Pulse ring animation on hover */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300',
          'ring-2 ring-white/50',
          'group-hover:animate-pulse group-hover:opacity-100'
        )}
      />
    </div>
  );
}

export default AddNodePlaceholder;
