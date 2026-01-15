import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import {
  Ban,
  CheckCircle,
  Crown,
  MoreHorizontal,
  Scale,
  ShieldCheck,
  Users,
  Mail,
  CreditCard,
  Calendar,
  Receipt,
  Sparkles,
  Building2,
  IndianRupee,
  DollarSign,
} from 'lucide-react';
import type {
  PlatformUser,
  PlatformRole,
  SubscriptionPlan,
  SubscriptionStatus,
  UserSubscription,
} from '../admin.types';

const roleConfig: Record<PlatformRole, { label: string; color: string; icon: typeof Crown }> = {
  SUPER_ADMIN: {
    label: 'Super Admin',
    color: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: Crown,
  },
  PLATFORM_MODERATOR: {
    label: 'Platform Mod',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: ShieldCheck,
  },
  APPEAL_MODERATOR: {
    label: 'Appeal Mod',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: Scale,
  },
  USER: { label: 'User', color: 'bg-slate-100 text-slate-800 border-slate-200', icon: Users },
};

const planConfig: Record<
  SubscriptionPlan,
  { label: string; color: string; icon: typeof Sparkles }
> = {
  FREE: {
    label: 'Free',
    color: 'bg-slate-100 text-slate-700 border-slate-200',
    icon: Users,
  },
  PRO: {
    label: 'Pro',
    color: 'bg-brand-pink-500/10 text-brand-pink-600 border-brand-pink-500/30',
    icon: Sparkles,
  },
  ENTERPRISE: {
    label: 'Enterprise',
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    icon: Building2,
  },
};

const statusConfig: Record<SubscriptionStatus, { label: string; color: string }> = {
  ACTIVE: { label: 'Active', color: 'bg-green-100 text-green-700' },
  CANCELLED: { label: 'Cancelled', color: 'bg-red-100 text-red-700' },
  EXPIRED: { label: 'Expired', color: 'bg-gray-100 text-gray-700' },
  PENDING: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
};

interface UserCardProps {
  user: PlatformUser;
  onRoleChange: (userId: string, role: PlatformRole) => void;
  onBan: (userId: string) => void;
  onUnban: (userId: string) => void;
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatAmount(amount: number, currency: 'INR' | 'USD'): string {
  const value = amount / 100;
  if (currency === 'INR') {
    return `₹${value.toLocaleString('en-IN')}`;
  }
  return `$${value.toFixed(2)}`;
}

function SubscriptionCard({ subscription }: { subscription: UserSubscription }) {
  const planInfo = planConfig[subscription.plan];
  const statusInfo = statusConfig[subscription.status];
  const PlanIcon = planInfo.icon;
  const CurrencyIcon = subscription.currency === 'INR' ? IndianRupee : DollarSign;

  return (
    <div className="border-border/50 bg-cream-90/50 rounded-lg border p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={cn('flex h-8 w-8 items-center justify-center rounded-lg', planInfo.color)}
          >
            <PlanIcon className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-text-primary text-sm font-medium">{planInfo.label} Plan</span>
              <Badge className={cn('h-5 px-1.5 text-[10px]', statusInfo.color)}>
                {statusInfo.label}
              </Badge>
            </div>
            <div className="text-text-secondary-65 flex items-center gap-1 text-xs">
              <CurrencyIcon className="h-3 w-3" />
              <span>{formatAmount(subscription.amount, subscription.currency)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="text-text-secondary-65 flex items-center gap-1.5">
          <Calendar className="h-3 w-3" />
          <span>Started: {formatDate(subscription.startDate)}</span>
        </div>
        <div className="text-text-secondary-65 flex items-center gap-1.5">
          <Calendar className="h-3 w-3" />
          <span>Ends: {formatDate(subscription.endDate)}</span>
        </div>
        <div className="text-text-secondary-65 flex items-center gap-1.5">
          <CreditCard className="h-3 w-3" />
          <span>{subscription.paymentMethod}</span>
        </div>
        {subscription.invoiceId && (
          <div className="text-text-secondary-65 flex items-center gap-1.5">
            <Receipt className="h-3 w-3" />
            <span className="truncate">{subscription.invoiceId}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function UserCard({ user, onRoleChange, onBan, onUnban }: UserCardProps) {
  const roleInfo = roleConfig[user.role];
  const RoleIcon = roleInfo.icon;
  const hasSubscription =
    user.currentSubscription || (user.subscriptionHistory && user.subscriptionHistory.length > 0);

  const currentPlan = user.currentSubscription
    ? planConfig[user.currentSubscription.plan]
    : planConfig.FREE;
  const CurrentPlanIcon = currentPlan.icon;

  return (
    <div
      className={cn(
        'border-border/50 bg-cream-95/50 rounded-lg border transition-all',
        user.isBanned && 'bg-destructive/5 border-destructive/20'
      )}
    >
      {/* Main row */}
      <div
        className={cn(
          'flex items-center gap-3 px-3 py-2.5',
          hasSubscription ? '' : 'hover:bg-cream-95'
        )}
      >
        <Avatar className="h-9 w-9 flex-shrink-0">
          <AvatarImage src={user.avatar || undefined} alt={user.name} />
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
            {user.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm leading-tight font-medium">{user.name}</p>
            {user.isBanned && (
              <Badge variant="destructive" className="h-4 px-1.5 text-[10px]">
                Banned
              </Badge>
            )}
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <span className="truncate">@{user.username}</span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1 truncate">
              <Mail className="h-3 w-3" />
              {user.email}
            </span>
          </div>
        </div>

        {/* Subscription Badge */}
        <Badge variant="outline" className={cn('h-6 gap-1 px-2 text-xs', currentPlan.color)}>
          <CurrentPlanIcon className="h-3 w-3" />
          <span className="hidden sm:inline">{currentPlan.label}</span>
        </Badge>

        {/* Role Badge */}
        <Badge variant="outline" className={cn('h-6 gap-1 px-2 text-xs', roleInfo.color)}>
          <RoleIcon className="h-3 w-3" />
          <span className="hidden sm:inline">{roleInfo.label}</span>
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onRoleChange(user.id, 'PLATFORM_MODERATOR')}
              disabled={user.role === 'SUPER_ADMIN'}
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              Make Platform Mod
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onRoleChange(user.id, 'APPEAL_MODERATOR')}
              disabled={user.role === 'SUPER_ADMIN'}
            >
              <Scale className="mr-2 h-4 w-4" />
              Make Appeal Mod
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onRoleChange(user.id, 'USER')}
              disabled={user.role === 'SUPER_ADMIN'}
            >
              <Users className="mr-2 h-4 w-4" />
              Remove Mod Role
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {user.isBanned ? (
              <DropdownMenuItem onClick={() => onUnban(user.id)}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Unban User
              </DropdownMenuItem>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive focus:text-destructive"
                    disabled={user.role === 'SUPER_ADMIN'}
                  >
                    <Ban className="mr-2 h-4 w-4" />
                    Ban User
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Ban User</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to ban {user.name}? They will not be able to access the
                      platform until unbanned.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onBan(user.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Ban User
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Subscription Accordion */}
      {hasSubscription && (
        <Accordion type="single" collapsible className="border-border/50 border-t">
          <AccordionItem value="subscription" className="border-none">
            <AccordionTrigger className="text-text-secondary-65 hover:bg-cream-90/50 px-3 py-2 text-xs font-medium hover:no-underline">
              <div className="flex items-center gap-2">
                <CreditCard className="h-3.5 w-3.5" />
                <span>Subscription Details</span>
                {user.subscriptionHistory && user.subscriptionHistory.length > 0 && (
                  <Badge variant="secondary" className="h-4 px-1.5 text-[10px]">
                    {user.subscriptionHistory.length} past
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-3 pb-3">
              <div className="space-y-3">
                {/* Current Subscription */}
                {user.currentSubscription && (
                  <div>
                    <p className="text-text-secondary-65 mb-2 text-[10px] font-semibold tracking-wider uppercase">
                      Current Subscription
                    </p>
                    <SubscriptionCard subscription={user.currentSubscription} />
                  </div>
                )}

                {/* Subscription History */}
                {user.subscriptionHistory && user.subscriptionHistory.length > 0 && (
                  <div>
                    <p className="text-text-secondary-65 mb-2 text-[10px] font-semibold tracking-wider uppercase">
                      Past Subscriptions
                    </p>
                    <Accordion type="single" collapsible className="space-y-2">
                      {user.subscriptionHistory.map((sub) => (
                        <AccordionItem
                          key={sub.id}
                          value={sub.id}
                          className="border-border/50 bg-cream-90/30 rounded-lg border"
                        >
                          <AccordionTrigger className="hover:bg-cream-90/50 rounded-lg px-3 py-2 text-xs hover:no-underline">
                            <div className="flex items-center gap-2">
                              <Badge
                                className={cn('h-5 px-1.5 text-[10px]', planConfig[sub.plan].color)}
                              >
                                {planConfig[sub.plan].label}
                              </Badge>
                              <span className="text-text-secondary-65">
                                {formatDate(sub.startDate)} - {formatDate(sub.endDate)}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-3 pb-3">
                            <SubscriptionCard subscription={sub} />
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
