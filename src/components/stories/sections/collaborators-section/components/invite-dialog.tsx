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
  ChevronDown,
  Crown,
  Eye,
  Handshake,
  Mail,
  PenTool,
  Search,
  Shield,
  UserPlus,
} from 'lucide-react';

import { StoryCollaboratorRole, type TStoryCollaboratorRole } from '@/type/story';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useCreateInvitation } from '@/hooks/story/story.mutations';
import { QueryKey } from '@/lib/query-keys';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
  co_author: {
    icon: PenTool,
    label: 'Co-Author',
    description: 'Full editing rights, can publish chapters, manage PRs',
  },
  moderator: {
    icon: Shield,
    label: 'Moderator',
    description: 'Can moderate content, manage reports, review PRs',
  },
  reviewer: {
    icon: Eye,
    label: 'Reviewer',
    description: 'Can review and comment on PRs, provide feedback',
  },
  contributor: {
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
  const [selectedRole, setSelectedRole] = useState<TStoryCollaboratorRole | ''>('contributor');
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
      setSelectedRole('contributor');
      setSelectedUser(null);
      setMessage('');
      setInvited([]);
    }
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="border-border/50 max-w-md gap-0 p-0">
        <DialogHeader className="border-border/50 border-b px-5 py-3">
          <DialogTitle className="text-text-primary flex items-center gap-2 text-base font-semibold">
            <UserPlus className="text-brand-pink-500 h-4 w-4" />
            Invite Collaborator
          </DialogTitle>
          <DialogDescription className="text-text-secondary-65 text-xs">
            Search for a user and select their role.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 px-5 py-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="text-text-secondary-65 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search by username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-border/50 h-9 pl-9 text-sm"
            />
          </div>

          {/* Search Results */}
          {debouncedSearch && (
            <div className="max-h-32 space-y-1 overflow-y-auto">
              {isLoading && (
                <div className="space-y-1">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="bg-muted/30 flex animate-pulse items-center gap-2 rounded-lg p-2"
                    >
                      <div className="bg-muted h-8 w-8 rounded-full" />
                      <div className="flex-1 space-y-1">
                        <div className="bg-muted h-3 w-20 rounded" />
                        <div className="bg-muted/50 h-2.5 w-28 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {isError && (
                <div className="text-destructive bg-destructive/10 rounded-lg p-2 text-center text-xs">
                  {error instanceof Error ? error.message : 'Something went wrong'}
                </div>
              )}

              {!isLoading && !isError && searchResult?.length === 0 && (
                <p className="text-text-secondary-65 py-3 text-center text-xs">
                  No users found for "{debouncedSearch}"
                </p>
              )}

              {!isLoading &&
                !isError &&
                searchResult?.map((user) => (
                  <motion.button
                    key={user.clerkId}
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => handleSelectUser(user)}
                    className="hover:bg-muted/50 flex w-full items-center gap-2 rounded-lg p-2 text-left transition-colors"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={
                          'https://i.pinimg.com/736x/1d/e3/53/1de35348990b67b7491660af0a3851f9.jpg'
                        }
                        alt={user.username}
                      />
                      <AvatarFallback className="bg-brand-pink-500/10 text-brand-pink-500 text-xs font-medium">
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
            <div className="border-brand-pink-500/30 bg-brand-pink-500/5 flex items-center gap-2 rounded-lg border p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={selectedUser.avatarUrl} alt={selectedUser.username} />
                <AvatarFallback className="bg-brand-pink-500/10 text-brand-pink-500 text-xs font-medium">
                  {selectedUser.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col">
                <span className="text-text-primary text-sm font-medium">
                  @{selectedUser.username}
                </span>
                <span className="text-text-secondary-65 text-xs">{selectedUser.email}</span>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-text-secondary-65 hover:text-text-primary text-xs"
              >
                Change
              </button>
            </div>
          )}

          {/* Role Selection - Compact Grid */}
          <div>
            <label className="text-text-primary mb-2 block text-xs font-medium">Select Role</label>
            <div className="grid grid-cols-2 gap-2">
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
                      'relative flex flex-col items-start gap-1 rounded-lg border p-2.5 text-left transition-all',
                      isSelected
                        ? 'border-brand-pink-500 bg-brand-pink-500/5'
                        : 'border-border/50 hover:border-border hover:bg-muted/30'
                    )}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Icon
                          className={cn(
                            'h-3.5 w-3.5',
                            isSelected ? 'text-brand-pink-500' : 'text-text-secondary-65'
                          )}
                        />
                        <span
                          className={cn(
                            'text-xs font-medium',
                            isSelected ? 'text-text-primary' : 'text-text-secondary-75'
                          )}
                        >
                          {config.label}
                        </span>
                      </div>
                      {isSelected && <CheckCircle className="text-brand-pink-500 h-3.5 w-3.5" />}
                    </div>
                    <p className="text-text-secondary-65 line-clamp-2 text-[10px] leading-tight">
                      {config.description}
                    </p>
                    {config.recommended && (
                      <span className="bg-brand-blue/10 text-brand-blue absolute -top-1.5 right-2 rounded px-1 py-0.5 text-[8px] font-medium">
                        Recommended
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Personal Message - Collapsed by default */}
          <details className="group">
            <summary className="text-text-secondary-65 hover:text-text-primary flex cursor-pointer items-center gap-1 text-xs">
              <ChevronDown className="h-3 w-3 transition-transform group-open:rotate-180" />
              Add personal message (optional)
            </summary>
            <Textarea
              placeholder="Write a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
              className="border-border/50 mt-2 resize-none text-sm"
            />
          </details>
        </div>

        <DialogFooter className="border-border/50 flex-row items-center justify-between border-t px-5 py-3">
          {invited.length > 0 ? (
            <p className="text-text-secondary-65 text-xs">{invited.length} sent</p>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => handleDialogClose(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleInvite}
              disabled={!selectedRole || !selectedUser || isPending}
              className="bg-brand-pink-500 hover:bg-brand-pink-600 text-white"
            >
              <Mail className="mr-1.5 h-3.5 w-3.5" />
              Send Invite
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default InviteDialog;
