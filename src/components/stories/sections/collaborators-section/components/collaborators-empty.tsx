import { motion } from 'framer-motion';
import { UserPlus, ArrowUpRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@/components/ui/empty';

interface CollaboratorsEmptyProps {
  onInvite: () => void;
}

export default function CollaboratorsEmpty({ onInvite }: CollaboratorsEmptyProps) {
  return (
    <Empty className="from-background/80 via-muted/25 to-muted/60 relative mx-auto max-w-lg overflow-hidden rounded-xl border bg-gradient-to-b py-14 shadow-xl">
      {/* Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_70%)]" />

      <EmptyHeader>
        {/* Icon Glow */}
        <div className="relative flex items-center justify-center">
          <motion.div
            className="bg-primary/20 absolute h-24 w-24 rounded-full blur-2xl"
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Animated Icon */}
          <motion.div
            animate={{ y: [-4, 4, -4], rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <EmptyMedia variant="icon" className="text-primary drop-shadow-md">
              <UserPlus size={46} strokeWidth={1.4} />
            </EmptyMedia>
          </motion.div>
        </div>

        <EmptyTitle className="text-xl font-semibold tracking-tight">
          No Collaborators Yet
        </EmptyTitle>

        <EmptyDescription className="mx-auto max-w-md leading-relaxed text-balance">
          You haven't invited anyone to collaborate on this story yet. Invite writers or editors to
          help you build your world.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent className="mt-3">
        <Button
          onClick={onInvite}
          className="flex items-center gap-2 rounded-lg px-6 shadow-md transition-transform hover:scale-[1.04]"
        >
          Invite Collaborator
        </Button>
      </EmptyContent>
    </Empty>
  );
}
