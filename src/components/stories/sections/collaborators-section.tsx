import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router';

import { useGetStoryCollaborators } from '@/hooks/story/story.queries';
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
  const [activeFilter, setActiveFilter] = useState('all');
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const {
    data: collaborators,
    isLoading: isCollabLoading,
    isError: isCollabError,
    refetch: refetchCollaborators,
  } = useGetStoryCollaborators(slug ?? '');

  // Calculate counts for each role
  const roleCounts = useMemo(() => {
    if (!collaborators) return {};
    return collaborators.reduce(
      (acc, c) => {
        acc[c.role] = (acc[c.role] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [collaborators]);

  // Filter collaborators based on search and active filter
  const filtered = useMemo(() => {
    if (!collaborators) return [];

    let result = collaborators;

    // Filter by role
    if (activeFilter !== 'all') {
      result = result.filter((c) => c.role === activeFilter);
    }

    // Filter by search
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.user.username.toLowerCase().includes(searchLower) ||
          c.user.email?.toLowerCase().includes(searchLower)
      );
    }

    return result;
  }, [search, activeFilter, collaborators]);

  const shouldShowActions = !!slug;
  const showTable = slug && !isCollabLoading && !isCollabError && filtered.length > 0;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-6xl space-y-6 pb-14"
    >
      {/* Loading State */}
      {isCollabLoading && <CollaboratorsSkeleton />}

      {/* Error State */}
      {isCollabError && <CollaboratorsError onRetry={refetchCollaborators} />}

      {/* No Slug State */}
      {!isCollabLoading && !isCollabError && !slug && (
        <CollaboratorsEmpty onInvite={() => setIsInviteOpen(true)} />
      )}

      {/* Actions Bar */}
      {shouldShowActions && !isCollabLoading && !isCollabError && (
        <>
          <CollaboratorActions
            search={search}
            setSearch={setSearch}
            openInvite={() => setIsInviteOpen(true)}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={roleCounts}
          />

          <InviteDialog open={isInviteOpen} onOpenChange={setIsInviteOpen} slug={slug ?? ''} />
        </>
      )}

      {/* Empty State for Collaborators */}
      {slug && !isCollabLoading && !isCollabError && collaborators?.length === 0 && (
        <CollaboratorsEmpty onInvite={() => setIsInviteOpen(true)} />
      )}

      {/* No Results State */}
      {slug &&
        !isCollabLoading &&
        !isCollabError &&
        collaborators &&
        collaborators.length > 0 &&
        filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-black/10 bg-white py-16"
          >
            <p className="text-text-secondary-65 text-sm">
              No collaborators found matching your filters
            </p>
            <button
              onClick={() => {
                setSearch('');
                setActiveFilter('all');
              }}
              className="text-brand-pink-500 hover:text-brand-pink-600 mt-2 text-sm font-medium"
            >
              Clear filters
            </button>
          </motion.div>
        )}

      {/* Collaborator Table */}
      {showTable && <CollaboratorTable data={filtered} search={search} />}
    </motion.section>
  );
}
