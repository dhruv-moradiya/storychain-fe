import { cn } from '@/lib/utils';

const menu = [
  { key: 'general', label: 'General' },
  { key: 'security', label: 'Security' },
  { key: 'devices', label: 'Devices' },
  { key: 'delete', label: 'Delete Account' },
];

const AccountSettingSidebar = ({
  active,
  onChange,
}: {
  active: string;
  onChange: (v: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-1 pr-4">
      {menu.map((item) => (
        <button
          key={item.key}
          onClick={() => onChange(item.key)}
          className={cn(
            'rounded-md px-3 py-2 text-left text-sm transition',
            active === item.key ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default AccountSettingSidebar;
