import type { LucideIcon } from 'lucide-react';

export interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earned: boolean;
  earnedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

export type BadgeFilter = 'all' | 'earned' | 'locked';

export interface BadgeStats {
  total: number;
  earned: number;
  completion: number;
}
