import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Monitor } from 'lucide-react';

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

export function SessionsCard() {
  const handleLogoutDevice = (id: string) => {
    console.log('Logout device:', id);
  };

  return (
    <div className="border-border/50 bg-cream-95 rounded-xl border p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Monitor className="text-brand-pink-500 h-5 w-5" />
          <div>
            <h2 className="text-text-primary text-base font-semibold">Active Sessions</h2>
            <p className="text-text-secondary-65 text-sm">Devices logged into your account</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Log out all
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-text-secondary-65">Device</TableHead>
            <TableHead className="text-text-secondary-65">Last Active</TableHead>
            <TableHead className="text-text-secondary-65">Location</TableHead>
            <TableHead className="text-text-secondary-65 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockDevices.map((d) => (
            <TableRow key={d.id} className="hover:bg-muted/40 transition-colors">
              <TableCell>
                <div className="flex items-center gap-2">
                  <Monitor className="text-text-secondary-65 h-4 w-4" />
                  <span className="text-text-primary">{d.name}</span>
                  {d.current && (
                    <Badge variant="secondary" className="bg-brand-pink-500/10 text-brand-pink-500">
                      Current
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-text-secondary-65">{d.lastActive}</TableCell>
              <TableCell className="text-text-secondary-65">{d.location}</TableCell>
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
    </div>
  );
}
