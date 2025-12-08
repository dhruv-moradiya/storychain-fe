import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronRight, CircleAlert, PcCase } from "lucide-react";
import type { ReactNode } from "react";

const GeneralSection = () => {
  return (
    <div className="space-y-10 pb-5">
      {/* Accoumt */}
      <div>
        <h3 className="scroll-m-20 font-semibold tracking-tight border-b pb-2 mb-4">
          Account
        </h3>

        <div className="flex flex-col items-start">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-full overflow-hidden">
              <div className="bg-amber-700 w-full h-full" />
            </div>
            <div className="flex flex-col gap-1">
              <Label
                className="text-xs mt-2 text-muted-foreground"
                htmlFor="name"
              >
                Preferred name
              </Label>
              <Input className="" id="name" value="Username" />
            </div>
          </div>
          <Button variant="link" className="text-blue-500 p-0 text-xs">
            Change your portrait
          </Button>
        </div>
      </div>

      {/* Account security */}
      <div>
        <h3 className="scroll-m-20 font-semibold tracking-tight border-b pb-2 mb-4 mt-6">
          Account security
        </h3>
        <div className="space-y-3">
          <ProfileRow
            label="Email"
            desciption="dmoradiya443@gmail.com"
            action={
              <Button variant="outline" size="sm" className="text-xs">
                Change email
              </Button>
            }
          />
          <ProfileRow
            label="Password"
            desciption="Change your password to login to your account."
            action={
              <Button variant="outline" size="sm" className="text-xs">
                Change password
              </Button>
            }
          />
          <ProfileRow
            label="2-step verification"
            desciption="Add an additional layer of security to your account during login."
            action={
              <Button variant="outline" size="sm" className="text-xs">
                Add verification method
              </Button>
            }
          />
          <ProfileRow
            label="Passkeys"
            desciption="Securely sign-in with on-device biometric authentication."
            action={
              <Button variant="outline" size="sm" className="text-xs">
                Add passkey
              </Button>
            }
          />
        </div>
      </div>

      {/* Delete account */}
      <div>
        <h3 className="scroll-m-20 font-semibold tracking-tight border-b pb-2 mb-4 mt-6">
          Suspend or delete account
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="scroll-m-20 text-red-500">Delete account</h3>
            <p className="text-sm text-muted-foreground">
              Permanently delete the account and remove access from all
              workspaces.
            </p>
          </div>
          <Button variant="ghost" size="icon" className="mt-2">
            <ChevronRight className="text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Device */}
      <div>
        <h3 className="scroll-m-20 font-semibold tracking-tight border-b pb-2 mb-4 mt-6 flex items-center gap-2">
          Device
          <Tooltip>
            <TooltipTrigger asChild>
              <CircleAlert size={14} />
            </TooltipTrigger>
            <TooltipContent>
              <p>All devices logged in to your account</p>
            </TooltipContent>
          </Tooltip>
        </h3>

        <div className="border-b pb-3">
          <ProfileRow
            label="Log out of all devices"
            desciption="Log out of all other active sessions on other devices besides this one."
            action={
              <Button variant="outline" size="sm" className="text-xs">
                Log out of all devices
              </Button>
            }
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground text-sm">
                Device name
              </TableHead>
              <TableHead className="text-muted-foreground text-sm">
                Last active
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CircleAlert className="inline ml-1 mb-1" size={12} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This may be delayed by several hoours.</p>
                  </TooltipContent>
                </Tooltip>
              </TableHead>
              <TableHead className="text-muted-foreground text-sm">
                Location
              </TableHead>
              <TableHead className="text-muted-foreground text-sm"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell className="flex items-center text-sm gap-2">
                  <PcCase size={14} />
                  Chrome on Windows
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  2 hours ago
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  New York, USA
                </TableCell>
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
    </div>
  );
};

export default GeneralSection;

interface ProfileRowProps {
  label: string;
  desciption: string | ReactNode;
  action?: ReactNode;
}

const ProfileRow = ({ label, desciption, action }: ProfileRowProps) => (
  <div className="flex justify-between items-center">
    <div>
      <h4 className="scroll-m-20 text-sm font-medium mb-1">{label}</h4>
      <p className="text-sm text-muted-foreground mb-2">{desciption}</p>
    </div>
    {action}
  </div>
);
