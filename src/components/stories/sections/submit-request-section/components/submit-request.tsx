import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { submitRequest } from '@/mock-data/submit-request';
import { ListFilter, Tag } from 'lucide-react';
import { useState } from 'react';
import StoryRequestDetail from './submit-request-details';
import StoryRequestList from './submit-request-list';
import { ButtonGroup } from '@/components/ui/button-group';

interface SubmitRequestProps {
  onClose: () => void;
}

export default function SubmitRequest({ onClose }: SubmitRequestProps) {
  const [selectedRequest, setSelectedRequest] = useState<string | null>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const onSelect = (id: string) => setSelectedRequest(id);

  const filteredRequests = submitRequest.filter((req) =>
    statusFilter === 'all' ? true : req.status === statusFilter
  );

  return (
    <div className="relative flex h-full w-full flex-col">
      {/* --- TOP BAR (GitHub-style search + filter bar) --- */}
      <div className="flex w-full items-center justify-between px-2 py-2">
        <div className="flex w-full items-center justify-between gap-2">
          {/* FILTER + SEARCH (Left Section) */}
          <div className="bg-background flex flex-1 items-center overflow-hidden rounded-md border">
            {/* FILTER DROPDOWN */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn('flex h-9 items-center gap-2 rounded-none border-r px-3 text-xs')}
                >
                  <ListFilter size={14} />
                  <span className="capitalize">
                    {statusFilter === 'all' ? 'Filter' : statusFilter}
                  </span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-28 text-xs">
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('open')}>Open</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('approved')}>
                  Approved
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('merged')}>
                  Merged
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('rejected')}>
                  Rejected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* SEARCH INPUT */}
            <Input
              placeholder="Search submit requests…"
              className="bg-background flex-1 rounded-none border-none text-xs focus-visible:ring-0"
            />
          </div>

          {/* RIGHT SIDE ACTION BUTTONS */}
          <ButtonGroup>
            <Button variant="outline" className="gap-1 border text-xs font-medium">
              <Tag size={14} />
              Labels
            </Button>
            <Button className="text-xs font-medium">New Submit Request</Button>
          </ButtonGroup>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 overflow-auto p-2">
        {!selectedRequest ? (
          <StoryRequestList requests={filteredRequests} onSelect={onSelect} />
        ) : (
          <StoryRequestDetail
            request={submitRequest.find((req) => req.id === selectedRequest)!}
            onBack={() => setSelectedRequest(null)}
          />
        )}
      </div>
    </div>
  );
}
