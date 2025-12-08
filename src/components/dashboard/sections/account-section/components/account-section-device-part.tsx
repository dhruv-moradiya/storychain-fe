// account-section/components/account-setting-device-part.tsx
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PcCase } from 'lucide-react';

const AccountSettingDevicePart = () => {
  return (
    <div className="space-y-6">
      <h3 className="scroll-m-20 border-b pb-2 font-semibold tracking-tight">Devices</h3>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Device</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead>Location</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3].map((i) => (
            <TableRow key={i}>
              <TableCell className="flex items-center gap-2">
                <PcCase size={14} /> Chrome on Windows
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">2 hours ago</TableCell>
              <TableCell className="text-muted-foreground text-sm">New York, USA</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="text-xs">
                  Log out
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AccountSettingDevicePart;
