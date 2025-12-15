import { useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { fadeIn } from '@/lib/utils';
import {
  CollaboratorActions,
  CollaboratorsEmpty,
  CollaboratorsError,
  CollaboratorsSkeleton,
  CollaboratorTable,
  InviteDialog,
} from './collaborators-section/index';
import type { IStory } from '@/type/story.type';
import { useGetStoryBySlug, useGetStoryCollaborators } from '@/hooks/story/story.queries';

export default function CollaboratorSection() {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  /* ------------------------------------------------------
     1️⃣ Fast-path: Try cached story first
  ------------------------------------------------------ */
  const cachedStory = queryClient.getQueryData<IStory>(['story_by_slug', slug]);

  /* ------------------------------------------------------
     2️⃣ Fetch story if not cached
  ------------------------------------------------------ */
  const {
    data: fetchedStory,
    isLoading: isStoryLoading,
    isError: isStoryError,
    refetch: refetchStory,
  } = useGetStoryBySlug(slug ?? '', {
    enabled: !cachedStory,
  });

  const story = cachedStory ?? fetchedStory;
  const storyId = story?._id;

  /* ------------------------------------------------------
     3️⃣ Fetch collaborators (enabled only when storyId exists)
  ------------------------------------------------------ */
  const {
    data: collaborators,
    isLoading: isCollabLoading,
    isError: isCollabError,
    refetch: refetchCollaborators,
  } = useGetStoryCollaborators(storyId ?? '');

  /* ------------------------------------------------------
     4️⃣ Memoized filtered list
  ------------------------------------------------------ */
  const filtered = useMemo(() => {
    if (!collaborators) return [];
    if (!search.trim()) return collaborators;
    return collaborators.filter((c) => c.user.clerkId.toLowerCase().includes(search.toLowerCase()));
  }, [search, collaborators]);

  /* ------------------------------------------------------
     5️⃣ Define UI states
  ------------------------------------------------------ */
  const shouldShowActions = !!storyId;
  const showTable = storyId && !isCollabLoading && !isCollabError && filtered.length > 0;

  return (
    <motion.section {...fadeIn(0)} className="mx-auto max-w-6xl space-y-10 pb-14">
      {/* Back Button */}
      <Button variant="outline" size="sm" className="flex items-center gap-2">
        <ArrowLeft size={16} />
        Back
      </Button>

      {/* ---------------- Story States ---------------- */}

      {isStoryLoading && <CollaboratorsSkeleton />}

      {isStoryError && <CollaboratorsError onRetry={refetchStory} />}

      {!isStoryLoading && !isStoryError && !storyId && (
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

          <InviteDialog open={isInviteOpen} onOpenChange={setIsInviteOpen} storyId={storyId} />
        </>
      )}

      {/* ---------------- Collaborators States ---------------- */}

      {storyId && isCollabLoading && <CollaboratorsSkeleton />}

      {storyId && isCollabError && <CollaboratorsError onRetry={refetchCollaborators} />}

      {storyId && !isCollabLoading && !isCollabError && collaborators?.length === 0 && (
        <CollaboratorsEmpty onInvite={() => setIsInviteOpen(true)} />
      )}

      {/* ---------------- Table ---------------- */}
      {showTable && <CollaboratorTable data={filtered} search={search} />}
    </motion.section>
  );
}
