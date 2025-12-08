import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fadeIn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';

function CollaboratorActions({
  search,
  setSearch,
  openInvite,
}: {
  search: string;
  setSearch: (v: string) => void;
  openInvite: () => void;
}) {
  return (
    <motion.div
      {...fadeIn(0.1)}
      className="bg-muted/20 flex flex-col items-start justify-between gap-3 rounded-xl border p-4 shadow-sm sm:flex-row sm:items-center"
    >
      {/* Search */}
      <div className="relative w-full sm:w-80">
        <Search className="text-muted-foreground absolute top-2.5 left-2 size-4" />
        <Input
          placeholder="Search collaborators..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* Invite Button */}
      <Button onClick={openInvite} className="flex items-center gap-2">
        <Plus size={16} />
        Invite Collaborator
      </Button>
    </motion.div>
  );
}

export default CollaboratorActions;
