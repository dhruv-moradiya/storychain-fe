// account-section/components/account-setting-delete-part.tsx
import { Button } from '@/components/ui/button';

const AccountSettingDeletePart = () => {
  return (
    <div className="space-y-6">
      <h3 className="scroll-m-20 border-b pb-2 font-semibold tracking-tight text-red-500">
        Delete Account
      </h3>

      <p className="text-muted-foreground text-sm">
        Permanently delete your account and remove access from all workspaces.
      </p>

      <Button variant="destructive" size="sm">
        Delete Account
      </Button>
    </div>
  );
};

export default AccountSettingDeletePart;
