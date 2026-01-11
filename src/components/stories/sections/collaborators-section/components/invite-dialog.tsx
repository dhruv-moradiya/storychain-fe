import { useSearchUserByUsername } from '@/hooks/users';
import { useDebounce } from '@/hooks/useDebounce';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { cn, handleApiError } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';

import {
  CheckCircle,
  Crown,
  Eye,
  Handshake,
  Mail,
  PenTool,
  Search,
  Shield,
  UserPlus,
} from 'lucide-react';

import { StoryCollaboratorRole, type TStoryCollaboratorRole } from '@/type/story.type';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useCreateInvitation } from '@/hooks/story/story.mutations';
import { QueryKey } from '@/lib/query-keys';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createBadge } from '@/components/common/badge';

// Roles that can be invited (exclude OWNER)
const INVITABLE_ROLES = Object.values(StoryCollaboratorRole).filter(
  (role) => role !== StoryCollaboratorRole.OWNER
);

// Role configuration with descriptions
const ROLE_CONFIG: Record<
  string,
  {
    icon: typeof Crown;
    label: string;
    description: string;
    recommended?: boolean;
  }
> = {
  CO_AUTHOR: {
    icon: PenTool,
    label: 'Co-Author',
    description: 'Full editing rights, can publish chapters, manage PRs',
  },
  MODERATOR: {
    icon: Shield,
    label: 'Moderator',
    description: 'Can moderate content, manage reports, review PRs',
  },
  REVIEWER: {
    icon: Eye,
    label: 'Reviewer',
    description: 'Can review and comment on PRs, provide feedback',
  },
  CONTRIBUTOR: {
    icon: Handshake,
    label: 'Contributor',
    description: 'Can submit chapters via PR, comment on story',
    recommended: true,
  },
};

interface InviteDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  slug: string;
}

function InviteDialog({ open, onOpenChange, slug }: InviteDialogProps) {
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState<TStoryCollaboratorRole | ''>('CONTRIBUTOR');
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    username: string;
    email: string;
    avatarUrl?: string;
  } | null>(null);
  const [message, setMessage] = useState('');
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

  const handleSelectUser = (user: {
    clerkId: string;
    username: string;
    email: string;
    avatarUrl?: string;
  }) => {
    setSelectedUser({
      id: user.clerkId,
      username: user.username,
      email: user.email,
      avatarUrl: user.avatarUrl,
    });
    setSearch('');
  };

  const handleInvite = () => {
    if (!selectedRole || !selectedUser) return;

    mutate(
      {
        slug,
        invitedUserId: selectedUser.id,
        invitedUserName: selectedUser.username,
        role: selectedRole,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: QueryKey.story.collaborators(slug),
          });

          setInvited((prev) => [...prev, selectedUser.email]);
          toast.success(`Invitation sent to ${selectedUser.username}`, {
            position: 'top-right',
          });
          setSelectedUser(null);
          setMessage('');
        },

        onError: (error) => {
          const errorMessage = handleApiError(error);
          toast.error(errorMessage, { position: 'top-right' });
        },
      }
    );
  };

  const handleDialogClose = (v: boolean) => {
    if (!v) {
      setSearch('');
      setSelectedRole('CONTRIBUTOR');
      setSelectedUser(null);
      setMessage('');
      setInvited([]);
    }
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-lg border-black/10 bg-white p-0">
        <DialogHeader className="border-b border-black/5 px-6 py-4">
          <DialogTitle className="text-text-primary flex items-center gap-2 text-lg font-semibold">
            <UserPlus className="text-brand-pink-500 h-5 w-5" />
            Invite Collaborator
          </DialogTitle>
          <DialogDescription className="text-text-secondary-65 text-sm">
            Search for a user and select their role to invite them to this story.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 px-6 py-4">
          {/* Search Input */}
          <div>
            <label className="text-text-primary mb-2 block text-sm font-medium">Find User</label>
            <div className="relative">
              <Search className="text-text-secondary-65 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search by username or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-cream-95/50 border-black/10 pl-10 focus:bg-white"
              />
            </div>
          </div>

          {/* Search Results */}
          {debouncedSearch && (
            <div className="max-h-40 space-y-2 overflow-y-auto">
              {isLoading && (
                <div className="space-y-2">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="bg-cream-95/50 flex animate-pulse items-center gap-3 rounded-xl border border-black/5 p-3"
                    >
                      <div className="h-9 w-9 rounded-full bg-black/10" />
                      <div className="flex-1 space-y-1">
                        <div className="h-4 w-24 rounded bg-black/10" />
                        <div className="h-3 w-32 rounded bg-black/5" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {isError && (
                <div className="border-badge-error-border bg-badge-error-bg text-badge-error rounded-xl border p-3 text-center text-sm">
                  {error instanceof Error ? error.message : 'Something went wrong'}
                </div>
              )}

              {!isLoading && !isError && searchResult?.length === 0 && (
                <p className="text-text-secondary-65 py-4 text-center text-sm">
                  No users found for "{debouncedSearch}"
                </p>
              )}

              {!isLoading &&
                !isError &&
                searchResult?.map((user) => (
                  <motion.button
                    key={user.clerkId}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => handleSelectUser(user)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all',
                      'hover:border-brand-pink-500/30 hover:bg-cream-95/50 border-black/5 bg-white'
                    )}
                  >
                    <Avatar className="h-9 w-9 border border-white shadow-sm">
                      <AvatarImage src={user.avatarUrl} alt={user.username} />
                      <AvatarFallback className="bg-brand-blue/10 text-brand-blue text-sm font-medium">
                        {user.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-text-primary text-sm font-medium">
                        @{user.username}
                      </span>
                      <span className="text-text-secondary-65 text-xs">{user.email}</span>
                    </div>
                  </motion.button>
                ))}
            </div>
          )}

          {/* Selected User Display */}
          {selectedUser && (
            <div className="border-brand-pink-500/30 bg-brand-pink-500/5 flex items-center gap-3 rounded-xl border p-3">
              <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                <AvatarImage src={selectedUser.avatarUrl} alt={selectedUser.username} />
                <AvatarFallback className="bg-brand-pink-500/10 text-brand-pink-500 text-sm font-medium">
                  {selectedUser.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col">
                <span className="text-text-primary text-sm font-medium">
                  @{selectedUser.username}
                </span>
                <span className="text-text-secondary-65 text-xs">{selectedUser.email}</span>
              </div>
              {createBadge({
                label: 'Selected',
                icon: CheckCircle,
                color: 'success',
                size: 'sm',
                shape: 'pill',
                style: 'soft',
              })}
            </div>
          )}

          {/* Role Selection */}
          <div>
            <label className="text-text-primary mb-2 block text-sm font-medium">Role</label>
            <div className="space-y-2">
              {INVITABLE_ROLES.map((role) => {
                const config = ROLE_CONFIG[role];
                if (!config) return null;

                const Icon = config.icon;
                const isSelected = selectedRole === role;

                return (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all',
                      isSelected
                        ? 'border-brand-pink-500 bg-brand-pink-500/5 ring-brand-pink-500/20 ring-1'
                        : 'hover:bg-cream-95/50 border-black/10 bg-white hover:border-black/20'
                    )}
                  >
                    <div
                      className={cn(
                        'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all',
                        isSelected
                          ? 'border-brand-pink-500 bg-brand-pink-500'
                          : 'border-black/20 bg-white'
                      )}
                    >
                      {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Icon
                          className={cn(
                            'h-4 w-4',
                            isSelected ? 'text-brand-pink-500' : 'text-text-secondary-65'
                          )}
                        />
                        <span
                          className={cn(
                            'text-sm font-medium',
                            isSelected ? 'text-text-primary' : 'text-text-secondary-75'
                          )}
                        >
                          {config.label}
                        </span>
                        {config.recommended && (
                          <span className="bg-brand-blue/10 text-brand-blue rounded-full px-2 py-0.5 text-[10px] font-medium">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-text-secondary-65 mt-0.5 text-xs">{config.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Personal Message */}
          <div>
            <label className="text-text-primary mb-2 block text-sm font-medium">
              Personal Message{' '}
              <span className="text-text-secondary-65 font-normal">(Optional)</span>
            </label>
            <Textarea
              placeholder="Write a personal message to include with your invitation..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="bg-cream-95/50 resize-none border-black/10 focus:bg-white"
            />
          </div>
        </div>

        <DialogFooter className="border-t border-black/5 px-6 py-4">
          <div className="flex w-full items-center justify-between">
            {invited.length > 0 ? (
              <p className="text-text-secondary-65 text-xs">
                {invited.length} invitation{invited.length > 1 ? 's' : ''} sent
              </p>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => handleDialogClose(false)}
                className="border-black/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleInvite}
                disabled={!selectedRole || !selectedUser || isPending}
                className="bg-brand-pink-500 hover:bg-brand-pink-600 text-white disabled:opacity-50"
              >
                <Mail className="mr-2 h-4 w-4" />
                Send Invitation
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default InviteDialog;
