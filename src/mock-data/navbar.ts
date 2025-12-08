import {
  BookOpen,
  Coffee,
  Compass,
  Ghost,
  Heart,
  Landmark,
  PenTool,
  Rocket,
  Search,
  Sparkles,
} from "lucide-react";
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface ExploreItem {
  title: string;
  to: string;
  description: string;
  icon: IconComponent;
}

export const exploreItems: ExploreItem[] = [
  {
    title: "Fantasy Worlds",
    to: "/explore/fantasy",
    description:
      "Dive into magical lands filled with dragons, kingdoms, and ancient prophecies waiting to unfold.",
    icon: Sparkles,
  },
  {
    title: "Sci-Fi & Futuristic",
    to: "/explore/scifi",
    description:
      "Explore stories of space travel, AI civilizations, and post-apocalyptic futures beyond imagination.",
    icon: Rocket,
  },
  {
    title: "Romance & Drama",
    to: "/explore/romance",
    description:
      "Emotional tales of love, heartbreak, and human connection that tug at your heartstrings.",
    icon: Heart,
  },
  {
    title: "Mystery & Thriller",
    to: "/explore/mystery",
    description:
      "Unravel secrets, solve crimes, and experience the tension of gripping detective stories.",
    icon: Search,
  },
  {
    title: "Adventure & Action",
    to: "/explore/adventure",
    description:
      "Embark on daring quests and fast-paced journeys that push heroes beyond their limits.",
    icon: Compass,
  },
  {
    title: "Horror & Supernatural",
    to: "/explore/horror",
    description:
      "Face your fears in chilling tales of ghosts, curses, and dark secrets lurking in the shadows.",
    icon: Ghost,
  },
  {
    title: "Historical Tales",
    to: "/explore/history",
    description:
      "Step back in time to witness epic moments, forgotten heroes, and the rise and fall of empires.",
    icon: Landmark,
  },
  {
    title: "Slice of Life",
    to: "/explore/slice-of-life",
    description:
      "Simple, heartwarming, and deeply relatable stories about ordinary people and everyday experiences.",
    icon: Coffee,
  },
  {
    title: "Fan-Fiction",
    to: "/explore/fanfiction",
    description:
      "Creative reimaginings and alternate universes inspired by your favorite books, shows, and movies.",
    icon: BookOpen,
  },
  {
    title: "Poetry & Short Forms",
    to: "/explore/poetry",
    description:
      "Expressive poems and micro-stories that capture emotion and meaning in just a few lines.",
    icon: PenTool,
  },
];
