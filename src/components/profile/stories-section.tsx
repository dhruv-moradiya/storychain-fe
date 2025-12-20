import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  GitBranch,
  Users,
  Clock,
  BookOpen,
  FileText,
  Star,
  ArrowUpRight,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

// Mock data
const mockStories = [
  {
    id: '1',
    title: 'The Dawn of AI',
    description: 'A short story about the rise of sentient machines and their impact on humanity.',
    status: 'PUBLISHED',
    chapters: 12,
    branches: 5,
    views: 1234,
    contributors: [
      { name: 'Alice', avatar: '/avatars/alice.png' },
      { name: 'Bob', avatar: '/avatars/bob.png' },
    ],
    createdAt: new Date('2024-09-01T09:00:00'),
    updatedAt: new Date('2024-12-10T14:20:00'),
  },
  {
    id: '2',
    title: 'The Forest Keeper',
    description: 'An enchanting tale of magic and mystery in an ancient forest.',
    status: 'DRAFT',
    chapters: 3,
    branches: 1,
    views: 0,
    contributors: [],
    createdAt: new Date('2024-11-05T08:30:00'),
    updatedAt: new Date('2024-12-09T11:45:00'),
  },
  {
    id: '3',
    title: 'Echoes of Tomorrow',
    description: 'Time travel adventure across multiple dimensions.',
    status: 'PUBLISHED',
    chapters: 8,
    branches: 3,
    views: 567,
    contributors: [{ name: 'Charlie', avatar: '/avatars/charlie.png' }],
    createdAt: new Date('2024-10-15T10:00:00'),
    updatedAt: new Date('2024-12-08T16:30:00'),
  },
];

const mockContributions = [
  {
    id: '1',
    storyTitle: 'The Lost City',
    chapterTitle: 'Chapter 5: The Hidden Path',
    status: 'MERGED',
    createdAt: new Date('2024-12-01'),
  },
  {
    id: '2',
    storyTitle: 'Starlight Dreams',
    chapterTitle: 'Chapter 12: Final Confrontation',
    status: 'PENDING',
    createdAt: new Date('2024-12-05'),
  },
];

const statusConfig = {
  PUBLISHED: { label: 'Published', className: 'bg-green-500/10 text-green-600' },
  DRAFT: { label: 'Draft', className: 'bg-yellow-500/10 text-yellow-600' },
  ARCHIVED: { label: 'Archived', className: 'bg-gray-500/10 text-gray-600' },
  MERGED: { label: 'Merged', className: 'bg-purple-500/10 text-purple-600' },
  PENDING: { label: 'Pending', className: 'bg-blue-500/10 text-blue-600' },
};

const statsContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export function StoriesSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('my-stories');

  const filteredStories = mockStories.filter((story) =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">My Stories</h1>
          <p className="text-muted-foreground text-sm">Manage your stories and contributions</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Story
        </Button>
      </div>

      {/* Stats Overview */}
      <motion.div
        variants={statsContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        <StatsCard icon={BookOpen} label="Total Stories" value={mockStories.length} />
        <StatsCard
          icon={FileText}
          label="Total Chapters"
          value={mockStories.reduce((acc, s) => acc + s.chapters, 0)}
        />
        <StatsCard
          icon={GitBranch}
          label="Total Branches"
          value={mockStories.reduce((acc, s) => acc + s.branches, 0)}
        />
        <StatsCard
          icon={Eye}
          label="Total Views"
          value={mockStories.reduce((acc, s) => acc + s.views, 0)}
        />
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="my-stories" className="gap-2">
            <BookOpen className="h-4 w-4" />
            My Stories
          </TabsTrigger>
          <TabsTrigger value="contributions" className="gap-2">
            <GitBranch className="h-4 w-4" />
            Contributions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-stories" className="mt-6">
          {/* Search */}
          <div className="mb-6 flex items-center gap-4">
            <div className="relative max-w-sm flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Stories Table */}
          {filteredStories.length > 0 ? (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Story</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Stats</TableHead>
                    <TableHead>Contributors</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStories.map((story) => (
                    <TableRow key={story.id} className="group">
                      <TableCell>
                        <div className="space-y-1">
                          <p className="group-hover:text-primary cursor-pointer font-medium transition-colors">
                            {story.title}
                          </p>
                          <p className="text-muted-foreground line-clamp-1 max-w-xs text-sm">
                            {story.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={cn(
                            'text-xs',
                            statusConfig[story.status as keyof typeof statusConfig]?.className
                          )}
                        >
                          {statusConfig[story.status as keyof typeof statusConfig]?.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-muted-foreground flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <FileText className="h-3.5 w-3.5" />
                            {story.chapters}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitBranch className="h-3.5 w-3.5" />
                            {story.branches}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5" />
                            {story.views}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {story.contributors.length > 0 ? (
                          <div className="flex -space-x-2">
                            {story.contributors.slice(0, 3).map((c, i) => (
                              <Avatar key={i} className="border-background h-7 w-7 border-2">
                                <AvatarImage src={c.avatar} alt={c.name} />
                                <AvatarFallback className="text-xs">{c.name[0]}</AvatarFallback>
                              </Avatar>
                            ))}
                            {story.contributors.length > 3 && (
                              <div className="bg-muted border-background flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs">
                                +{story.contributors.length - 3}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">Solo</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                          <Clock className="h-3.5 w-3.5" />
                          {formatDistanceToNow(story.updatedAt, { addSuffix: true })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Eye className="h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Edit className="h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Users className="h-4 w-4" />
                              Manage Collaborators
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive gap-2">
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          ) : (
            <EmptyState
              icon={BookOpen}
              title="No stories found"
              description={
                searchQuery
                  ? 'Try adjusting your search query'
                  : 'Start by creating your first story'
              }
              action={
                !searchQuery && (
                  <Button className="mt-4 gap-2">
                    <Plus className="h-4 w-4" />
                    Create Story
                  </Button>
                )
              }
            />
          )}
        </TabsContent>

        <TabsContent value="contributions" className="mt-6">
          {mockContributions.length > 0 ? (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Story</TableHead>
                    <TableHead>Chapter</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockContributions.map((contribution) => (
                    <TableRow key={contribution.id}>
                      <TableCell className="font-medium">{contribution.storyTitle}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {contribution.chapterTitle}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={cn(
                            'text-xs',
                            statusConfig[contribution.status as keyof typeof statusConfig]
                              ?.className
                          )}
                        >
                          {statusConfig[contribution.status as keyof typeof statusConfig]?.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDistanceToNow(contribution.createdAt, { addSuffix: true })}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          ) : (
            <EmptyState
              icon={GitBranch}
              title="No contributions yet"
              description="Start contributing to other stories to see them here"
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface StatsCardProps {
  icon: typeof BookOpen;
  label: string;
  value: number;
}

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
}

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
}

export function StatsCard({ icon: Icon, label, value }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
    >
      <Card className="hover:bg-muted/40 transition-colors duration-200">
        <CardContent className="flex items-center gap-4 p-4">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-muted rounded-md p-2"
          >
            <Icon className="text-muted-foreground h-4 w-4" />
          </motion.div>

          {/* Text */}
          <div>
            <p className="text-2xl leading-none font-semibold">{value}</p>
            <p className="text-muted-foreground mt-1 text-xs">{label}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface EmptyStateProps {
  icon: typeof BookOpen;
  title: string;
  description: string;
  action?: React.ReactNode;
}

function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted mb-4 rounded-full p-4">
        <Icon className="text-muted-foreground h-8 w-8" />
      </div>
      <h3 className="mb-1 font-medium">{title}</h3>
      <p className="text-muted-foreground max-w-sm text-sm">{description}</p>
      {action}
    </div>
  );
}

export default StoriesSection;
