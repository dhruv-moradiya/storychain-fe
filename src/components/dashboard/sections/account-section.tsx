import { useState } from 'react';
import {
  AccountSettingSidebar,
  AccountSettingGeneralPart,
  AccountSettingSecurityPart,
  AccountSettingDevicePart,
  AccountSettingDeletePart,
} from '@/components/dashboard/sections/account-section/index';

const AccountSection = () => {
  const [active, setActive] = useState('general');

  const renderContent = () => {
    switch (active) {
      case 'general':
        return <AccountSettingGeneralPart />;

      case 'security':
        return <AccountSettingSecurityPart />;

      case 'devices':
        return <AccountSettingDevicePart />;

      case 'delete':
        return <AccountSettingDeletePart />;

      default:
        return <AccountSettingGeneralPart />;
    }
  };

  return (
    <div className="text-muted-foreground mx-auto grid max-w-7xl grid-cols-12 gap-6 space-y-6 text-sm">
      {/* SIDEBAR */}
      <div className="col-span-12 md:col-span-3">
        <AccountSettingSidebar active={active} onChange={setActive} />
      </div>

      {/* CONTENT */}
      <div className="col-span-12 space-y-6 md:col-span-9">{renderContent()}</div>
    </div>
  );
};

export default AccountSection;
