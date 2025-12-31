import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router';

import { Button } from '@/components/ui/button';
import { useGetStoryCollaborators } from '@/hooks/story/story.queries';
import { fadeIn } from '@/lib/utils';
import {
  CollaboratorActions,
  CollaboratorsEmpty,
  CollaboratorsError,
  CollaboratorsSkeleton,
  CollaboratorTable,
  InviteDialog,
} from './collaborators-section/index';

export default function CollaboratorSection() {
  const { slug } = useParams();

  const [search, setSearch] = useState('');
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const {
    data: collaborators,
    isLoading: isCollabLoading,
    isError: isCollabError,
    refetch: refetchCollaborators,
  } = useGetStoryCollaborators(slug ?? '');

  const filtered = useMemo(() => {
    if (!collaborators) return [];
    if (!search.trim()) return collaborators;
    return collaborators.filter((c) => c.user.clerkId.toLowerCase().includes(search.toLowerCase()));
  }, [search, collaborators]);

  const shouldShowActions = !!slug;
  const showTable = slug && !isCollabLoading && !isCollabError && filtered.length > 0;

  return (
    <motion.section {...fadeIn(0)} className="mx-auto max-w-6xl space-y-10 pb-14">
      {/* Back Button */}
      <Button variant="outline" size="sm" className="flex items-center gap-2">
        <ArrowLeft size={16} />
        Back
      </Button>

      {/* ---------------- Story States ---------------- */}

      {isCollabLoading && <CollaboratorsSkeleton />}

      {isCollabError && <CollaboratorsError onRetry={refetchCollaborators} />}

      {!isCollabLoading && !isCollabError && !slug && (
        <CollaboratorsEmpty onInvite={() => setIsInviteOpen(true)} />
      )}

      {/* ---------------- Actions ---------------- */}
      {shouldShowActions && (
        <>
          <CollaboratorActions
            search={search}
            setSearch={setSearch}
            openInvite={() => setIsInviteOpen(true)}
          />

          <InviteDialog open={isInviteOpen} onOpenChange={setIsInviteOpen} slug={slug ?? ''} />
        </>
      )}

      {/* ---------------- Collaborators States ---------------- */}

      {slug && isCollabLoading && <CollaboratorsSkeleton />}

      {slug && isCollabError && <CollaboratorsError onRetry={refetchCollaborators} />}

      {slug && !isCollabLoading && !isCollabError && collaborators?.length === 0 && (
        <CollaboratorsEmpty onInvite={() => setIsInviteOpen(true)} />
      )}

      {/* ---------------- Table ---------------- */}
      {showTable && <CollaboratorTable data={filtered} search={search} />}
    </motion.section>
  );
}
