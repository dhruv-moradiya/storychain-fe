import { cn } from '@/lib/utils';
import { rarityConfig } from './badge-types';

const rarities = [
  { key: 'common', label: 'Common', description: 'Easy to obtain' },
  { key: 'rare', label: 'Rare', description: 'Requires dedication' },
  { key: 'epic', label: 'Epic', description: 'Challenging achievements' },
  { key: 'legendary', label: 'Legendary', description: 'Ultimate mastery' },
] as const;

export const RarityLegend = () => {
  return (
    <div className="border-border/50 bg-cream-95 rounded-xl border p-5">
      <h3 className="text-text-primary mb-4 text-sm font-semibold">Rarity Guide</h3>
      <p className="text-text-secondary-65 mb-4 text-xs">
        Badges come in different rarities based on difficulty
      </p>

      <div className="flex flex-wrap gap-3">
        {rarities.map((rarity) => {
          const config = rarityConfig[rarity.key];
          return (
            <div key={rarity.key} className="group relative">
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium',
                  config.bg,
                  config.text,
                  config.border
                )}
              >
                {rarity.label}
              </span>

              {/* Tooltip */}
              <div className="bg-bg-dark pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-lg px-3 py-1.5 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
                {rarity.description}
                <div className="bg-bg-dark absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
