import { useSearchParams } from 'react-router';
import { cn } from '@/lib/utils';

const StoryStatusTabs = () => {
  const tabs = ['all', 'published', 'drafts', 'in_review'];

  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.get('tab') || 'all';

  const handleChange = (tab: string) => {
    setSearchParams({ tab });
  };

  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleChange(tab)}
          className={cn(
            'rounded-md border px-3 py-1.5 text-[13px] capitalize transition',
            selected === tab
              ? 'bg-primary text-primary-foreground border-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default StoryStatusTabs;
