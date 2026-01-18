import { FileText, Settings } from 'lucide-react';

// Genre options for the dropdown - organized by category
export const GENRES = [
  // General
  { value: 'FANTASY', label: 'Fantasy' },
  { value: 'SCI_FI', label: 'Sci-Fi' },
  { value: 'MYSTERY', label: 'Mystery' },
  { value: 'ROMANCE', label: 'Romance' },
  { value: 'HORROR', label: 'Horror' },
  { value: 'THRILLER', label: 'Thriller' },
  { value: 'ADVENTURE', label: 'Adventure' },
  { value: 'ACTION', label: 'Action' },
  { value: 'DRAMA', label: 'Drama' },
  { value: 'COMEDY', label: 'Comedy' },
  { value: 'SUPERNATURAL', label: 'Supernatural' },
  { value: 'HISTORICAL', label: 'Historical Fiction' },
  { value: 'SLICE_OF_LIFE', label: 'Slice of Life' },

  // Japanese (Light Novel / Manga / Anime style)
  { value: 'ISEKAI', label: 'Isekai (異世界)' },
  { value: 'SHOUNEN', label: 'Shounen (少年)' },
  { value: 'SHOUJO', label: 'Shoujo (少女)' },
  { value: 'SEINEN', label: 'Seinen (青年)' },
  { value: 'JOSEI', label: 'Josei (女性)' },
  { value: 'MECHA', label: 'Mecha (メカ)' },
  { value: 'MAHOU_SHOUJO', label: 'Mahou Shoujo (魔法少女)' },
  { value: 'ECCHI', label: 'Ecchi (エッチ)' },
  { value: 'YURI', label: 'Yuri (百合)' },
  { value: 'YAOI', label: 'Yaoi (やおい)' },
  { value: 'BOYS_LOVE', label: 'Boys Love (BL)' },
  { value: 'GIRLS_LOVE', label: 'Girls Love (GL)' },
  { value: 'OTOME', label: 'Otome (乙女)' },
  { value: 'VILLAINESS', label: 'Villainess (悪役令嬢)' },
  { value: 'LIGHT_NOVEL', label: 'Light Novel (ラノベ)' },

  // Chinese (Web Novel style)
  { value: 'XIANXIA', label: 'Xianxia (仙侠)' },
  { value: 'WUXIA', label: 'Wuxia (武侠)' },
  { value: 'XUANHUAN', label: 'Xuanhuan (玄幻)' },
  { value: 'CULTIVATION', label: 'Cultivation (修真)' },
  { value: 'QIHUAN', label: 'Qihuan (奇幻)' },
  { value: 'XIANXIA_ROMANCE', label: 'Xianxia Romance (仙侠言情)' },
  { value: 'ANCIENT_CHINA', label: 'Ancient China (古代)' },
  { value: 'PALACE_INTRIGUE', label: 'Palace Intrigue (宫斗)' },
  { value: 'REBIRTH', label: 'Rebirth (重生)' },
  { value: 'TRANSMIGRATION', label: 'Transmigration (穿越)' },
  { value: 'QUICK_TRANSMIGRATION', label: 'Quick Transmigration (快穿)' },
  { value: 'CEO_ROMANCE', label: 'CEO Romance (总裁文)' },
  { value: 'MODERN_ROMANCE_CN', label: 'Modern Romance (现代言情)' },

  // Korean (Manhwa / Web Novel style)
  { value: 'KOREAN_FANTASY', label: 'Korean Fantasy (판타지)' },
  { value: 'HUNTER', label: 'Hunter (헌터물)' },
  { value: 'MURIM', label: 'Murim (무림)' },
  { value: 'REGRESSION', label: 'Regression (회귀)' },
  { value: 'POSSESSION', label: 'Possession (빙의)' },
  { value: 'RETURN', label: 'Return (귀환)' },
  { value: 'GATE', label: 'Gate (게이트)' },
  { value: 'DUNGEON', label: 'Dungeon (던전)' },
  { value: 'TOWER', label: 'Tower Climbing (탑)' },
  { value: 'CONSTELLATION', label: 'Constellation (성좌)' },
  { value: 'SYSTEM', label: 'System (시스템)' },
  { value: 'STATUS_WINDOW', label: 'Status Window (스탯창)' },
  { value: 'KOREAN_ROMANCE', label: 'Korean Romance (로맨스)' },
  { value: 'CONTRACT_MARRIAGE', label: 'Contract Marriage (계약결혼)' },
  { value: 'CHAEBOL', label: 'Chaebol (재벌)' },

  // LitRPG & GameLit
  { value: 'LITRPG', label: 'LitRPG' },
  { value: 'GAMELIT', label: 'GameLit' },
  { value: 'VRMMO', label: 'VRMMO' },
  { value: 'PROGRESSION_FANTASY', label: 'Progression Fantasy' },

  // Fantasy Sub-genres
  { value: 'DARK_FANTASY', label: 'Dark Fantasy' },
  { value: 'URBAN_FANTASY', label: 'Urban Fantasy' },
  { value: 'EPIC_FANTASY', label: 'Epic Fantasy' },
  { value: 'HIGH_FANTASY', label: 'High Fantasy' },
  { value: 'LOW_FANTASY', label: 'Low Fantasy' },
  { value: 'SWORD_AND_SORCERY', label: 'Sword & Sorcery' },
  { value: 'MAGICAL_REALISM', label: 'Magical Realism' },

  // Sci-Fi Sub-genres
  { value: 'SPACE_OPERA', label: 'Space Opera' },
  { value: 'HARD_SCI_FI', label: 'Hard Sci-Fi' },
  { value: 'SOFT_SCI_FI', label: 'Soft Sci-Fi' },
  { value: 'CYBERPUNK', label: 'Cyberpunk' },
  { value: 'STEAMPUNK', label: 'Steampunk' },
  { value: 'DYSTOPIAN', label: 'Dystopian' },
  { value: 'POST_APOCALYPTIC', label: 'Post-Apocalyptic' },
  { value: 'TIME_TRAVEL', label: 'Time Travel' },
  { value: 'ALTERNATE_HISTORY', label: 'Alternate History' },

  // Romance Sub-genres
  { value: 'HAREM', label: 'Harem' },
  { value: 'REVERSE_HAREM', label: 'Reverse Harem' },
  { value: 'SLOW_BURN', label: 'Slow Burn' },
  { value: 'ENEMIES_TO_LOVERS', label: 'Enemies to Lovers' },
  { value: 'FRIENDS_TO_LOVERS', label: 'Friends to Lovers' },
  { value: 'FAKE_DATING', label: 'Fake Dating' },
  { value: 'SECOND_CHANCE', label: 'Second Chance' },
  { value: 'ARRANGED_MARRIAGE', label: 'Arranged Marriage' },

  // Character Archetypes
  { value: 'OVERPOWERED_MC', label: 'Overpowered MC' },
  { value: 'WEAK_TO_STRONG', label: 'Weak to Strong' },
  { value: 'ANTI_HERO', label: 'Anti-Hero' },
  { value: 'VILLAIN', label: 'Villain' },
  { value: 'SUPERHERO', label: 'Superhero' },

  // Settings
  { value: 'ACADEMY', label: 'Academy' },
  { value: 'ROYAL', label: 'Royal/Nobility' },
  { value: 'MILITARY', label: 'Military' },
  { value: 'APOCALYPTIC', label: 'Apocalyptic' },

  // Horror & Dark
  { value: 'ZOMBIE', label: 'Zombie' },
  { value: 'VAMPIRE', label: 'Vampire' },
  { value: 'WEREWOLF', label: 'Werewolf' },
  { value: 'GHOST', label: 'Ghost' },
  { value: 'PARANORMAL', label: 'Paranormal' },

  // Mystery & Thriller
  { value: 'DETECTIVE', label: 'Detective' },
  { value: 'NOIR', label: 'Noir' },
  { value: 'COZY_MYSTERY', label: 'Cozy Mystery' },
  { value: 'LEGAL_THRILLER', label: 'Legal Thriller' },
  { value: 'MEDICAL_THRILLER', label: 'Medical Thriller' },
  { value: 'PSYCHOLOGICAL', label: 'Psychological' },
  { value: 'SPY', label: 'Spy/Espionage' },
  { value: 'HEIST', label: 'Heist' },
  { value: 'CRIME', label: 'Crime' },

  // Age Categories
  { value: 'YOUNG_ADULT', label: 'Young Adult' },
  { value: 'NEW_ADULT', label: 'New Adult' },
  { value: 'MIDDLE_GRADE', label: 'Middle Grade' },
  { value: 'CHILDREN', label: "Children's" },
  { value: 'EROTICA', label: 'Erotica' },

  // Other
  { value: 'FANFICTION', label: 'Fanfiction' },
  { value: 'FAIRY_TALE', label: 'Fairy Tale' },
  { value: 'MYTHOLOGY', label: 'Mythology' },
  { value: 'FOLKLORE', label: 'Folklore' },
  { value: 'MARTIAL_ARTS', label: 'Martial Arts' },
  { value: 'SPORTS', label: 'Sports' },
  { value: 'SURVIVAL', label: 'Survival' },
  { value: 'WESTERN', label: 'Western' },
  { value: 'SATIRE', label: 'Satire' },
  { value: 'COMING_OF_AGE', label: 'Coming of Age' },
  { value: 'LITERARY_FICTION', label: 'Literary Fiction' },
  { value: 'ANTHOLOGY', label: 'Anthology' },
  { value: 'REINCARNATION', label: 'Reincarnation' },
  { value: 'OTHER', label: 'Other' },
] as const;

export const STEPS = [
  { id: 1, label: 'Basic Info', icon: FileText },
  { id: 2, label: 'Settings', icon: Settings },
] as const;

export type Genre = (typeof GENRES)[number]['value'];
export type StepId = (typeof STEPS)[number]['id'];
