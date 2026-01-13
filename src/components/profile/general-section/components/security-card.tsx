import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Lock, Smartphone, Key, Shield, CheckCircle2 } from 'lucide-react';

interface SecurityRowProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  verified?: boolean;
  action?: React.ReactNode;
}

function SecurityRow({ icon: Icon, label, description, verified, action }: SecurityRowProps) {
  return (
    <div className="hover:bg-muted/40 flex items-center justify-between rounded-lg px-2 py-3 transition">
      <div className="flex items-center gap-4">
        <div className="bg-brand-pink-500/10 rounded-lg p-2">
          <Icon className="text-brand-pink-500 h-4 w-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-text-primary text-sm font-medium">{label}</p>
            {verified && (
              <Badge className="bg-green-500/10 text-green-600">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Verified
              </Badge>
            )}
          </div>
          <p className="text-text-secondary-65 text-sm">{description}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

export function SecurityCard() {
  const { user } = useUser();

  return (
    <div className="border-border/50 bg-cream-95 rounded-xl border p-5">
      <div className="mb-4 flex items-center gap-2">
        <Shield className="text-brand-pink-500 h-5 w-5" />
        <h2 className="text-text-primary text-base font-semibold">Account Security</h2>
      </div>

      <div className="space-y-1">
        <SecurityRow
          icon={Mail}
          label="Email"
          description={user?.primaryEmailAddress?.emailAddress || 'Not set'}
          verified
          action={
            <Button size="sm" variant="outline">
              Change
            </Button>
          }
        />
        <SecurityRow
          icon={Lock}
          label="Password"
          description="Last changed 3 months ago"
          action={
            <Button size="sm" variant="outline">
              Update
            </Button>
          }
        />
        <SecurityRow
          icon={Smartphone}
          label="2FA"
          description="Extra security for your account"
          action={
            <Button size="sm" variant="outline">
              Enable
            </Button>
          }
        />
        <SecurityRow
          icon={Key}
          label="Passkeys"
          description="Biometric authentication"
          action={
            <Button size="sm" variant="outline">
              Add
            </Button>
          }
        />
      </div>
    </div>
  );
}
