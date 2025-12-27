import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GitPullRequest, ListFilter, X } from 'lucide-react';
import { useState } from 'react';
import { mockRequests } from './data';
import StoryRequestDetail from './StoryRequestDetail';
import StoryRequestList from './StoryRequestList';

interface MergeRequestPanelProps {
  onClose: () => void;
}

export default function MergeRequestPanel({ onClose }: MergeRequestPanelProps) {
  const [selectedRequest, setSelectedRequest] = useState<string | null>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const onSelect = (id: string) => {
    setSelectedRequest(id);
  };

  const filteredRequests = mockRequests.filter((req) =>
    statusFilter === 'all' ? true : req.status === statusFilter
  );

  return (
    <div className="scrollbar bg-background relative flex h-full w-full flex-col overflow-auto rounded-l-lg shadow-xl">
      <div className="bg-background/80 sticky top-0 z-40 flex w-full items-center justify-between border-b p-3 backdrop-blur-sm">
        <h3 className="flex items-center gap-2 text-base font-medium">
          <GitPullRequest size={18} className="text-primary" />
          Story Merge Requests
        </h3>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 px-2 py-1 text-xs"
              >
                <ListFilter size={14} />
                <span>{statusFilter === 'all' ? 'Filter' : statusFilter}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[100px]">
              <DropdownMenuItem onClick={() => setStatusFilter('all')}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('open')}>Open</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('approved')}>
                Approved
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('merged')}>Merged</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('rejected')}>
                Rejected
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="icon-sm" variant="ghost" onClick={onClose}>
            <X size={14} />
          </Button>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-1">
        {!selectedRequest ? (
          <StoryRequestList requests={filteredRequests} onSelect={onSelect} />
        ) : (
          <StoryRequestDetail
            request={mockRequests.find((req) => req.id === selectedRequest)!}
            onBack={() => setSelectedRequest(null)}
          />
        )}
      </div>
    </div>
  );
}
