import { useSearchUserByUsername } from '@/hooks/users';
import { useDebounce } from '@/hooks/useDebounce';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { fadeIn, handleApiError } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { CheckCircle, Mail, Search } from 'lucide-react';

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { StoryCollaboratorRole, type TStoryCollaboratorRole } from '@/type/story.type';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useCreateInvitation } from '@/hooks/story/story.mutations';
import { QueryKey } from '@/lib/query-keys';

// Roles that can be invited (exclude OWNER)
const INVITABLE_ROLES = Object.values(StoryCollaboratorRole).filter(
  (role) => role !== StoryCollaboratorRole.OWNER
);

interface InviteDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  storyId: string;
}

function InviteDialog({ open, onOpenChange, storyId }: InviteDialogProps) {
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState<TStoryCollaboratorRole | ''>('');
  const [invited, setInvited] = useState<string[]>([]);

  const debouncedSearch = useDebounce(search, 400);

  const {
    data: searchResult,
    isLoading,
    isError,
    error,
  } = useSearchUserByUsername(debouncedSearch);

  const { mutate, isPending } = useCreateInvitation();
  const queryClient = useQueryClient();

  const handleInvite = (userId: string, username: string, email: string) => {
    if (!selectedRole) return;

    mutate(
      {
        storyId,
        invitedUserId: userId,
        invitedUserName: username,
        role: selectedRole,
      },
      {
        onSuccess: () => {
          // Invalidate collaborators using correct query key
          queryClient.invalidateQueries({
            queryKey: QueryKey.story.collaborators(storyId),
          });

          setInvited((prev) => [...prev, email]);
          toast.success(`Invitation sent to ${username}`, { position: 'top-right' });
        },

        onError: (error) => {
          const message = handleApiError(error);
          toast.error(message, { position: 'top-right' });
        },
      }
    );
  };

  const handleDialogClose = (v: boolean) => {
    if (!v) {
      // Reset state when dialog closes
      setSearch('');
      setSelectedRole('');
      setInvited([]);
    }
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Collaborator</DialogTitle>
          <DialogDescription>Select a role and invite a user to this story.</DialogDescription>
        </DialogHeader>

        {/* Role Selector */}
        <div className="mt-3">
          <p className="mb-1 text-sm font-medium">Select Role</p>
          <Select
            value={selectedRole}
            onValueChange={(v) => setSelectedRole(v as TStoryCollaboratorRole)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose role..." />
            </SelectTrigger>

            <SelectContent>
              {INVITABLE_ROLES.map((role) => (
                <SelectItem key={role} value={role}>
                  {role.replace('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Input */}
        <div className="relative mt-4">
          <Search className="text-muted-foreground absolute top-2.5 left-2 size-4" />
          <Input
            placeholder="Search user by username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>

        {/* Search Results */}
        <div className="mt-4 max-h-60 space-y-3 overflow-y-auto">
          {debouncedSearch && isLoading && (
            <motion.div {...fadeIn(0.1)} className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-muted/30 flex animate-pulse items-center justify-between rounded-md border p-2"
                >
                  <div className="bg-muted h-4 w-40 rounded" />
                  <div className="bg-muted h-6 w-16 rounded" />
                </div>
              ))}
            </motion.div>
          )}

          {isError && (
            <motion.div
              {...fadeIn(0.1)}
              className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-600"
            >
              {error instanceof Error ? error.message : 'Something went wrong'}
            </motion.div>
          )}

          {debouncedSearch && !isLoading && !isError && searchResult?.length === 0 && (
            <motion.p {...fadeIn(0.1)} className="text-muted-foreground py-4 text-center text-sm">
              No users found for "{debouncedSearch}"
            </motion.p>
          )}

          {!isLoading &&
            !isError &&
            searchResult?.map((user) => (
              <motion.div
                key={user.clerkId}
                {...fadeIn(0.05)}
                className="bg-background/60 flex items-center justify-between rounded-md border p-2"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.username}</span>
                  <span className="text-muted-foreground text-xs">{user.email}</span>
                </div>

                {invited.includes(user.email) ? (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <CheckCircle size={12} /> Sent
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!selectedRole || isPending}
                    onClick={() => handleInvite(user.clerkId, user.username, user.email)}
                    className="flex items-center gap-1"
                  >
                    <Mail size={12} />
                    Invite
                  </Button>
                )}
              </motion.div>
            ))}
        </div>

        <DialogFooter className="mt-4">
          {invited.length > 0 && (
            <p className="text-muted-foreground text-xs">
              Sent {invited.length} invite{invited.length > 1 ? 's' : ''}.
            </p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default InviteDialog;
