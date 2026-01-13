import type { LucideIcon } from 'lucide-react';

export interface Step {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  tips: string[];
}

export interface Section {
  id: string;
  title: string;
  subtitle: string;
  items: Feature[];
}
