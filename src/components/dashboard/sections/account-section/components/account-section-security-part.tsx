// account-section/components/account-setting-security-part.tsx
import { Button } from '@/components/ui/button';
import { ProfileRow } from './account-section-general-part';

const AccountSettingSecurityPart = () => {
  return (
    <div className="space-y-6">
      <h3 className="scroll-m-20 border-b pb-2 font-semibold tracking-tight">Account Security</h3>

      <div className="space-y-3">
        <ProfileRow
          label="Password"
          description="Change your password to secure your account."
          action={
            <Button variant="outline" size="sm" className="text-xs">
              Change password
            </Button>
          }
        />
        <ProfileRow
          label="Two-factor Authentication (2FA)"
          description="Add an additional layer of security to your account."
          action={
            <Button variant="outline" size="sm" className="text-xs">
              Enable 2FA
            </Button>
          }
        />
        <ProfileRow
          label="Passkeys"
          description="Sign in securely using biometric authentication."
          action={
            <Button variant="outline" size="sm" className="text-xs">
              Add passkey
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default AccountSettingSecurityPart;
