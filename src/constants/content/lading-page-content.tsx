import { BookOpen, GitBranch, Sparkles, Users } from 'lucide-react';

export const storyChainLandingContent = {
  hero: {
    eyebrow: 'A place where stories breathe',
    title: ['Stories are not written.', 'They are grown.'],
    description:
      'Story Chain is a living space for stories that refuse to end. Write together, branch endlessly, and let every choice create a new world.',
    primaryCta: 'Begin a Story',
    secondaryCta: 'Wander the Stories',
    helperText: 'Every path is real. Every ending matters.',
  },

  notJustAnApp: {
    smallTitle: 'Story Chain',
    lines: [
      "It's not just a story.",
      "It's not just a platform.",
      "It's a world that grows with you.",
    ],
    description:
      'Story Chain lets writers and readers build living narratives together — branching stories, shared imagination, and worlds that never stop evolving.',
    icons: [
      <BookOpen className="h-6 w-6 text-[#ff9f68]" />,
      <Sparkles className="h-6 w-6 text-[#6b7cff]" />,
      <GitBranch className="h-6 w-6 text-[#ff6fae]" />,
      <Users className="h-6 w-6 text-[#2a2d66]" />,
    ],
    tiles: [
      { color: 'linear-gradient(180deg, #f6c36a, #e7a845)' }, // yellow
      { color: 'radial-gradient(circle at top, #7b8cff, #1b1d4e)' }, // blue glow
      { color: 'linear-gradient(180deg, #2a2d66, #11132f)' }, // dark
      { color: 'linear-gradient(180deg, #ff9f68, #ff6b3d)' }, // orange
    ],
  },

  ownership: {
    title: ['What you create', 'belongs to you.'],
    description:
      'Your stories are yours — their shape, their voice, their future. Choose who enters, who writes, and how far the branches may grow.',
    points: [
      'Open a story to the world, or keep it sacred',
      'Invite voices you trust',
      'Decide where branches may bloom',
      'Shape the story without losing control',
    ],
    cta: 'Set Your Rules',
  },

  captain: {
    apps: [
      {
        name: 'Story Editor',
        description: 'Write and revise with clarity.',
        gradient: 'linear-gradient(180deg, #f6c36a, #e7a845)',
        icon: (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            <path
              d="M4 19c0-1.5 3-2 6-2s6 .5 6 2"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="10" cy="8" r="4" stroke="white" strokeWidth="1.5" />
            <path d="M16 6l4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        name: 'Branches',
        description: 'Explore alternate paths.',
        gradient: 'linear-gradient(180deg, #6b7cff, #4a5cff)',
        icon: (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            <path
              d="M12 3v6M12 9c-3 0-5 2-5 5v4M12 9c3 0 5 2 5 5v4"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="7" cy="19" r="2" stroke="white" strokeWidth="1.5" />
            <circle cx="17" cy="19" r="2" stroke="white" strokeWidth="1.5" />
          </svg>
        ),
      },
      {
        name: 'World Vault',
        description: 'Store your universes.',
        gradient: 'linear-gradient(180deg, #ff6fae, #e8559a)',
        icon: (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="1.5" />
            <ellipse cx="12" cy="12" rx="3" ry="8" stroke="white" strokeWidth="1.2" />
            <path d="M4 12h16" stroke="white" strokeWidth="1.2" />
          </svg>
        ),
      },
      {
        name: 'Minima',
        description: 'A calm writing space.',
        gradient: 'linear-gradient(180deg, #2a2d66, #11132f)',
        icon: (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            <path
              d="M12 3C8 3 5 6 5 9c0 2 1 3.5 2.5 4.5L7 21h10l-.5-7.5C18 12.5 19 11 19 9c0-3-3-6-7-6z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M9 21h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        name: 'Signals',
        description: 'Share stories safely.',
        gradient: 'linear-gradient(180deg, #6ecbff, #4aa8e8)',
        icon: (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            <circle cx="12" cy="12" r="2" fill="white" />
            <path
              d="M8.5 8.5a5 5 0 010 7M15.5 8.5a5 5 0 000 7"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M5.5 5.5a9 9 0 010 13M18.5 5.5a9 9 0 000 13"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
    ],
  },

  collaboration: {
    eyebrow: 'Written together',
    title: ['Stories sound better', 'when many voices speak softly.'],
    description:
      'Write alongside others without losing your rhythm. Discuss moments, reply to ideas, and watch stories evolve through conversation.',
    features: [
      'Leave thoughts between the lines',
      'Reply where stories turn',
      'Mention a mind you trust',
      'Revisit every version',
    ],
    cta: 'Invite a Collaborator',
  },

  exploreStories: {
    eyebrow: 'Discover',
    title: ['Follow stories', 'wherever they choose to go.'],
    description:
      'Every story has many futures. Explore worlds shaped by countless hands — and choose the path that feels right to you.',
    cta: 'Explore Living Stories',
  },

  features: {
    title: ['Everything a story needs', 'to stay alive'],
    items: [
      {
        title: 'Branching Chapters',
        description: 'One moment, many futures. Let stories split, diverge, and grow wild.',
      },
      {
        title: 'Shared Writing',
        description: 'Invite others into your world. Create together, without losing your voice.',
      },
      {
        title: 'Reactions & Replies',
        description: 'Stories are conversations. Let readers respond where it matters most.',
      },
      {
        title: 'Drafts & Pinned Moments',
        description: 'Save fragile ideas. Hold onto chapters that matter.',
      },
      {
        title: 'Mentions & Signals',
        description: 'Call a collaborator when inspiration strikes. Never miss a turning point.',
      },
      {
        title: 'Story Pulse',
        description: 'See where readers pause, react, and return. Watch your story breathe.',
      },
    ],
    cta: 'Create Your World',
  },

  creatorTools: {
    eyebrow: 'Made for storytellers',
    title: ['A gentle place', 'where ideas learn to breathe'],
    description:
      'Story Chain doesn’t rush you. It holds space for half-formed thoughts, quiet revisions, and moments that need time to become themselves.',
    tools: [
      'Chapters that unfold at your pace',
      'Drafts that wait without asking',
      'Versions that remember where you’ve been',
      'A writing space that fades into silence',
    ],
    cta: 'Step Inside the Story',
  },

  darkCta: {
    eyebrow: 'When the moment feels right',
    title: ['Begin with a thought.', 'Let it find its own way.'],
    description:
      'Some stories are meant to be shared. Others are meant to be held close. Here, you don’t have to decide right away.',
    primaryCta: 'Begin Writing',
    secondaryCta: 'Wander and Read',
  },

  vision: {
    eyebrow: 'Our belief',
    title: ['Stories deserve', 'time and tenderness.'],
    description:
      'We believe stories aren’t content to be consumed. They are living things — shaped by care, by choice, and by the people who touch them along the way.',
  },

  footer: {
    tagline: ['Write gently.', 'Branch bravely.', 'Let stories live.'],
    links: ['Explore', 'Write', 'Docs', 'Community', 'Privacy', 'Terms'],
  },
};
