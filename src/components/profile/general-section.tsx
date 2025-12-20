import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Camera,
  Mail,
  Lock,
  Smartphone,
  Key,
  Monitor,
  Trash2,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Pencil,
  Save,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

/* ---------------------------------- */
/* Styles */
/* ---------------------------------- */
const cardHover =
  'relative overflow-hidden rounded-[14px] transition-all duration-300 hover:-translate-y-[1px] hover:shadow-lg hover:border-primary/30';

/* ---------------------------------- */
/* Mock Data */
/* ---------------------------------- */
const mockDevices = [
  {
    id: '1',
    name: 'Chrome on Windows',
    lastActive: '2 hours ago',
    location: 'New York, USA',
    current: true,
  },
  {
    id: '2',
    name: 'Safari on iPhone',
    lastActive: '1 day ago',
    location: 'New York, USA',
    current: false,
  },
  {
    id: '3',
    name: 'Firefox on MacOS',
    lastActive: '3 days ago',
    location: 'Los Angeles, USA',
    current: false,
  },
];

/* ---------------------------------- */
/* Component */
/* ---------------------------------- */
export function GeneralSection() {
  const { user } = useUser();

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [name, setName] = useState(user?.fullName || user?.username || '');
  const [bio, setBio] = useState('');

  const handleLogoutDevice = (id: string) => {
    console.log('Logout device:', id);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-8"
    >
      {/* Header */}
      <header>
        <h1 className="text-lg font-semibold tracking-tight">General Settings</h1>
        <p className="text-muted-foreground text-sm">
          Manage your account details and security settings
        </p>
      </header>

      {/* -------------------------------- Profile -------------------------------- */}
      <Card className={cn('bg-card/10 group', cardHover)}>
        <div className="bg-[radial-gradient(circle_at_top_left,theme(colors.primary/15),transparent_60%)] pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your public profile information</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-6">
            <div className="group relative">
              <Avatar className="ring-background h-20 w-20 shadow-md ring-4">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {user?.firstName?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 backdrop-blur-sm transition group-hover:opacity-100"
              >
                <Camera className="h-5 w-5 text-white" />
              </motion.button>
            </div>

            <div>
              <p className="text-sm font-medium">Profile Photo</p>
              <p className="text-muted-foreground text-xs">JPG, PNG or GIF. Max size 2MB.</p>
              <Button variant="outline" size="sm" className="mt-2">
                <Camera className="mr-2 h-4 w-4" />
                Change Photo
              </Button>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label>Display Name</Label>
            <div className="flex items-center gap-2">
              {isEditingName ? (
                <>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                  <Button
                    size="icon"
                    className="bg-green-500/10 text-green-600 hover:bg-green-500/20"
                    onClick={() => setIsEditingName(false)}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => setIsEditingName(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-sm">{name || 'Not set'}</p>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-primary/10 hover:text-primary"
                    onClick={() => setIsEditingName(true)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label>Bio</Label>
            {isEditingBio ? (
              <>
                <Textarea
                  value={bio}
                  rows={3}
                  className="resize-none"
                  onChange={(e) => setBio(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setIsEditingBio(false)}>
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setIsEditingBio(false)}>
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-start gap-2">
                <p className="text-muted-foreground text-sm">
                  {bio || 'No bio set. Add a short description.'}
                </p>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-primary/10 hover:text-primary"
                  onClick={() => setIsEditingBio(true)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ---------------------------- Account Security ---------------------------- */}
      <Card className={cardHover}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" /> Account Security
          </CardTitle>
        </CardHeader>

        <CardContent>
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
        </CardContent>
      </Card>

      {/* ---------------------------- Active Sessions ---------------------------- */}
      <Card className={cardHover}>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" /> Active Sessions
            </CardTitle>
            <CardDescription>Devices logged into your account</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            Log out all
          </Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDevices.map((d) => (
                <TableRow key={d.id} className="hover:bg-muted/40 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Monitor className="text-muted-foreground h-4 w-4" />
                      {d.name}
                      {d.current && <Badge variant="secondary">Current</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>{d.lastActive}</TableCell>
                  <TableCell>{d.location}</TableCell>
                  <TableCell className="text-right">
                    {!d.current && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleLogoutDevice(d.id)}
                      >
                        Log out
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ------------------------------ Danger Zone ------------------------------ */}
      <Card className="border-destructive/40 hover:border-destructive transition">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" /> Danger Zone
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="border-destructive/20 bg-destructive/5 flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="text-destructive font-medium">Delete Account</p>
              <p className="text-muted-foreground text-sm">
                Permanently remove your account and data
              </p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="transition-transform hover:scale-[1.02]"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}

/* ---------------------------------- */
/* Security Row */
/* ---------------------------------- */
function SecurityRow({
  icon: Icon,
  label,
  description,
  verified,
  action,
}: {
  icon: any;
  label: string;
  description: string;
  verified?: boolean;
  action?: React.ReactNode;
}) {
  return (
    <div className="group hover:bg-muted/40 flex items-center justify-between rounded-lg px-2 py-3 transition">
      <div className="flex items-center gap-4">
        <div className="bg-muted group-hover:bg-primary/10 rounded-lg p-2 transition">
          <Icon className="text-muted-foreground h-4 w-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">{label}</p>
            {verified && (
              <Badge className="bg-green-500/10 text-green-600">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Verified
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

export default GeneralSection;
