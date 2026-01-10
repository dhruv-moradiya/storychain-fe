import { Button } from '@/components/ui/button';
import { storyChainLandingContent, colors } from '@/constants';
import { fadeIn, scrollReveal } from '@/lib/utils';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router';
import { useAuth } from '@clerk/clerk-react';
import {
  LayoutDashboard,
  Compass,
  ArrowRight,
  BookOpen,
  Users,
  GitBranch,
  Star,
  Sparkles,
  MessageCircle,
  Zap,
  Shield,
  Layers,
  Feather,
  PenTool,
  Quote,
} from 'lucide-react';

// Scroll Progress Bar Component
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-50 h-1 origin-left"
      style={{
        scaleX,
        background: `linear-gradient(90deg, ${colors.brand.pink[500]}, ${colors.brand.blue})`,
      }}
    />
  );
};

// Floating Particles Component
const FloatingParticles = ({ count = 20, color = 'white' }: { count?: number; color?: string }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: Math.random() * 4 + 2,
          height: Math.random() * 4 + 2,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          backgroundColor: color,
          opacity: Math.random() * 0.3 + 0.1,
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, Math.random() * 20 - 10, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: Math.random() * 4 + 3,
          repeat: Infinity,
          delay: Math.random() * 2,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

// Decorative Dots Grid
const DotsGrid = ({ className = '' }: { className?: string }) => (
  <div className={`pointer-events-none absolute ${className}`}>
    <div className="grid grid-cols-5 gap-3 opacity-20">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="h-1 w-1 rounded-full bg-current"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.02 }}
        />
      ))}
    </div>
  </div>
);

// Testimonial Card Component
const TestimonialCard = ({
  quote,
  author,
  role,
  avatar,
  delay = 0,
}: {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="relative rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur"
  >
    <div className="mb-4 flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
    <p
      className="mb-4 font-mono text-sm leading-relaxed italic"
      style={{ color: colors.text.secondaryOpacity75 }}
    >
      "{quote}"
    </p>
    <div className="flex items-center gap-3">
      <img
        src={avatar}
        alt={author}
        className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
      />
      <div>
        <p className="text-sm font-medium" style={{ color: colors.text.tertiary }}>
          {author}
        </p>
        <p className="font-mono text-xs" style={{ color: colors.text.secondaryOpacity65 }}>
          {role}
        </p>
      </div>
    </div>
  </motion.div>
);

const Home = () => {
  const { isSignedIn } = useAuth();

  // Features data
  const features = [
    {
      icon: GitBranch,
      title: 'Infinite Branching',
      description: 'Let your story split into countless paths. Every choice creates a new reality.',
      color: colors.brand.blue,
    },
    {
      icon: Users,
      title: 'Collaborative Writing',
      description: 'Invite co-authors into your world. Write together in real-time harmony.',
      color: colors.brand.pink[500],
    },
    {
      icon: MessageCircle,
      title: 'Inline Comments',
      description: 'Discuss moments within the story. Let feedback flow naturally.',
      color: colors.brand.orange,
    },
    {
      icon: Layers,
      title: 'Version History',
      description: "Every revision is remembered. Return to any moment in your story's past.",
      color: '#8b5cf6',
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: "See changes as they happen. Stay connected to your story's heartbeat.",
      color: '#f59e0b',
    },
    {
      icon: Shield,
      title: 'Your Story, Your Rules',
      description: 'Control who reads, who writes, and how far your branches grow.',
      color: '#10b981',
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      quote:
        'Story Chain transformed how I write. The branching system lets my readers choose their own adventure.',
      author: 'Sarah Chen',
      role: 'Fantasy Writer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    {
      quote:
        'Finally, a platform that understands collaborative storytelling. My writing group loves it.',
      author: 'Marcus Johnson',
      role: 'Fiction Author',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    {
      quote: 'The community here is incredible. Every story feels alive with reader interactions.',
      author: 'Elena Rodriguez',
      role: 'Interactive Fiction Creator',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* ========== HERO BACKGROUND GRADIENT ========== */}
      <div
        className="absolute inset-0 h-screen w-full bg-gradient-to-b"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${colors.hero.gradient.from}, ${colors.hero.gradient.via1}, ${colors.hero.gradient.via2}, ${colors.hero.gradient.via3}, ${colors.hero.gradient.to})`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{ backgroundColor: colors.hero.overlay.white10 }}
      />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{ backgroundColor: colors.hero.overlay.purple5 }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />

      {/* ========== FLOATING GRADIENT ORBS ========== */}
      <motion.div
        className="pointer-events-none absolute top-32 left-1/4 h-64 w-64 rounded-full opacity-25 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colors.hero.gradient.via1} 0%, transparent 70%)`,
        }}
        // {...floatingOrb.slow}
      />
      <motion.div
        className="pointer-events-none absolute top-48 right-1/4 h-48 w-48 rounded-full opacity-20 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colors.hero.gradient.via2} 0%, transparent 70%)`,
        }}
        // {...floatingOrb.medium}
      />
      <motion.div
        className="pointer-events-none absolute top-64 left-1/3 h-32 w-32 rounded-full opacity-30 blur-2xl"
        style={{
          background: `radial-gradient(circle, ${colors.brand.pink[400]} 0%, transparent 70%)`,
        }}
        // {...floatingOrb.fast}
      />

      {/* Hero floating particles */}
      <FloatingParticles count={30} color="rgba(255,255,255,0.6)" />

      {/* ================= NAVBAR ================= */}
      <motion.header
        {...fadeIn(0)}
        className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-8"
      >
        <div className="flex items-center gap-2.5 font-medium text-white">
          <motion.span
            className="h-3 w-3 rounded-full bg-pink-500"
            animate={{
              boxShadow: [
                '0 0 12px rgba(236,72,153,0.7)',
                '0 0 20px rgba(236,72,153,0.9)',
                '0 0 12px rgba(236,72,153,0.7)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          Story Chain
        </div>

        <nav className="flex items-center gap-2 text-sm text-white/80">
          {isSignedIn ? (
            <>
              <Button
                variant="ghost"
                className="font-mono font-semibold text-white/80 hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link to="/dashboard" className="flex items-center gap-2">
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="font-mono font-semibold text-white/80 hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link to="/explore" className="flex items-center gap-2">
                  <Compass size={16} />
                  Explore
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="link"
                className="font-mono font-semibold text-white/80 hover:text-white"
              >
                <Link to="/sign-in">Login</Link>
              </Button>
              <Button
                variant="link"
                className="font-mono font-semibold text-white/80 hover:text-white"
              >
                <Link to="/sign-up">Sign up</Link>
              </Button>
            </>
          )}
        </nav>
      </motion.header>

      {/* ================= HERO ================= */}
      <section className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-6 pt-8 pb-20 text-center">
        {/* Decorative elements */}
        <DotsGrid className="top-1/4 left-8 text-white/30" />
        <DotsGrid className="right-8 bottom-1/4 text-white/30" />

        {/* Animated pen icon */}
        <motion.div
          className="absolute top-1/3 left-[15%] hidden lg:block"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <PenTool className="h-8 w-8 text-white/20" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 right-[15%] hidden lg:block"
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <BookOpen className="h-10 w-10 text-white/15" />
        </motion.div>

        {/* Eyebrow with sparkle */}
        <motion.span
          {...fadeIn(0.1)}
          className="font-yellowtail mb-4 flex items-center gap-2 text-2xl tracking-wide text-white/85"
        >
          <motion.span
            animate={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="h-5 w-5 text-amber-300" />
          </motion.span>
          {storyChainLandingContent.hero.eyebrow}
        </motion.span>

        {/* Title */}
        <motion.h1 className="font-libreBaskerville mb-10 text-4xl leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
          {storyChainLandingContent.hero.title.map((line, i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${colors.text.primary} 0%, ${colors.brand.blue} 50%, ${colors.brand.pink[500]} 100%)`,
              }}
            >
              {line}
            </motion.div>
          ))}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mb-12 flex max-w-xl flex-wrap justify-center gap-x-1.5 font-mono text-sm leading-[1.8] font-medium"
          style={{ color: colors.text.secondaryOpacity75 }}
        >
          {storyChainLandingContent.hero.description.split(' ').map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{
                duration: 0.35,
                delay: 0.6 + i * 0.03,
                ease: 'easeOut',
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeIn(0.4)}
          className="mb-8 flex flex-wrap items-center justify-center gap-4"
        >
          {isSignedIn ? (
            <Link to="/dashboard">
              <motion.button
                className="group flex items-center gap-2 rounded-[6px] px-7 py-2.5 text-sm font-medium text-white shadow-md"
                style={{
                  backgroundColor: colors.brand.pink[500],
                  boxShadow: `0 10px 15px -3px ${colors.brand.pink.shadow25}`,
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <LayoutDashboard size={16} />
                Go to Dashboard
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
          ) : (
            <>
              <Link to="/sign-up">
                <motion.button
                  className="group flex items-center gap-2 rounded-[6px] px-7 py-2.5 text-sm font-medium text-white shadow-md"
                  style={{
                    backgroundColor: colors.brand.pink[500],
                    boxShadow: `0 10px 15px -3px ${colors.brand.pink.shadow25}`,
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {storyChainLandingContent.hero.primaryCta}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </motion.button>
              </Link>

              <Link to="/sign-in">
                <motion.button
                  className="rounded-[6px] border border-white/35 px-6 py-2.5 text-sm font-medium text-white/90 backdrop-blur"
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  {storyChainLandingContent.hero.secondaryCta}
                </motion.button>
              </Link>
            </>
          )}
        </motion.div>

        {/* Floating badges */}
        <motion.div {...fadeIn(0.6)} className="flex flex-wrap justify-center gap-3">
          {['Free to Start', 'No Credit Card', 'Unlimited Stories'].map((badge, i) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex cursor-default items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-mono text-xs text-white/70 backdrop-blur"
            >
              <Sparkles className="h-3 w-3" />
              {badge}
            </motion.span>
          ))}
        </motion.div>

        {/* Animated line below hero */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-1"
          >
            <div className="h-6 w-px bg-gradient-to-b from-white/40 to-transparent" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ================= SECTION BLEND TO CREAM ================= */}
      <section className="relative z-10 h-24 w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent, ${colors.opacity.creamBlend[50]}, ${colors.background.cream})`,
          }}
        />
      </section>

      {/* ================= NOT JUST AN APP ================= */}
      <section
        className="relative z-10 px-6 pt-8 pb-20"
        style={{ backgroundColor: colors.background.cream }}
      >
        <div className="mx-auto max-w-6xl">
          <div
            className="relative overflow-hidden rounded-[28px] px-6 py-32 shadow-sm backdrop-blur-sm"
            style={{ backgroundColor: colors.background.creamLight }}
          >
            <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle,_rgba(0,0,0,0.03)_1px,_transparent_1px)] [background-size:24px_24px] opacity-60" />
            <div
              className="pointer-events-none absolute inset-0 rounded-[28px]"
              style={{
                background: `linear-gradient(to bottom, ${colors.opacity.cream[20]}, transparent, ${colors.opacity.cream[20]})`,
              }}
            />

            {/* Decorative corner elements */}
            <div
              className="absolute top-6 left-6 h-12 w-12 rounded-tl-lg border-t-2 border-l-2 opacity-10"
              style={{ borderColor: colors.brand.pink[500] }}
            />
            <div
              className="absolute right-6 bottom-6 h-12 w-12 rounded-br-lg border-r-2 border-b-2 opacity-10"
              style={{ borderColor: colors.brand.blue }}
            />

            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <motion.span
                {...scrollReveal.paragraph}
                className="font-yellowtail mb-5 block text-lg text-pink-500"
              >
                {storyChainLandingContent.notJustAnApp.smallTitle}
              </motion.span>

              <motion.h2
                {...scrollReveal.heading}
                className="font-libreBaskerville mb-12 text-3xl leading-[1.2] tracking-tight sm:text-4xl"
                style={{ color: colors.text.tertiary }}
              >
                {storyChainLandingContent.notJustAnApp.lines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </motion.h2>

              <motion.p
                {...scrollReveal.paragraph}
                className="mx-auto mb-12 max-w-xl font-mono text-sm leading-[1.85]"
                style={{ color: colors.text.secondaryOpacity70 }}
              >
                {storyChainLandingContent.notJustAnApp.description}
              </motion.p>

              {/* Icon row with connecting line */}
              <motion.div
                {...scrollReveal.paragraph}
                className="relative flex justify-center gap-6"
              >
                {/* Connecting line behind icons */}
                <div className="absolute top-1/2 right-1/4 left-1/4 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent" />

                {[
                  { Icon: BookOpen, color: colors.brand.orange },
                  { Icon: Sparkles, color: colors.brand.blue },
                  { Icon: GitBranch, color: colors.brand.pink[500] },
                  { Icon: Users, color: colors.text.tertiary },
                ].map(({ Icon, color }, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-black/5"
                  >
                    <Icon className="h-5 w-5" style={{ color }} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES GRID - BENTO STYLE ================= */}
      <section
        className="relative z-10 px-6 py-20"
        style={{ backgroundColor: colors.background.cream }}
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <motion.span
              className="font-yellowtail mb-4 block text-lg"
              style={{ color: colors.brand.blue }}
            >
              Everything you need
            </motion.span>
            <h2
              className="font-libreBaskerville text-3xl leading-tight tracking-tight sm:text-4xl"
              style={{ color: colors.text.tertiary }}
            >
              {storyChainLandingContent.features.title.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </h2>
          </motion.div>

          {/* Features Row - Cards with Corner Crosses */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative"
              >
                {/* Light Card with Corner Crosses */}
                <div className="relative h-full overflow-hidden rounded-2xl border border-black/5 bg-white p-8 shadow-sm transition-all duration-500 group-hover:border-black/10 group-hover:shadow-lg">
                  {/* Corner Crosses */}
                  <div className="absolute top-4 left-4 h-3 w-3">
                    <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-black/20" />
                    <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-black/20" />
                  </div>
                  <div className="absolute top-4 right-4 h-3 w-3">
                    <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-black/20" />
                    <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-black/20" />
                  </div>
                  <div className="absolute bottom-4 left-4 h-3 w-3">
                    <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-black/20" />
                    <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-black/20" />
                  </div>
                  <div className="absolute right-4 bottom-4 h-3 w-3">
                    <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-black/20" />
                    <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-black/20" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex h-full min-h-[160px] flex-col">
                    {/* Icon & Title - centered */}
                    <div className="flex flex-1 flex-col items-center justify-center text-center">
                      <motion.div
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${feature.color}12` }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <feature.icon className="h-6 w-6" style={{ color: feature.color }} />
                      </motion.div>
                      <motion.h3
                        className="font-libreBaskerville text-lg font-semibold tracking-tight"
                        style={{ color: colors.text.tertiary }}
                        whileHover={{ scale: 1.02 }}
                      >
                        {feature.title}
                      </motion.h3>
                    </div>

                    {/* Description */}
                    <p
                      className="text-center font-mono text-xs leading-relaxed"
                      style={{ color: colors.text.secondaryOpacity65 }}
                    >
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover gradient effect */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-10"
                    style={{ background: `linear-gradient(135deg, ${feature.color}, transparent)` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OWNERSHIP ================= */}
      <section className="relative z-10" style={{ backgroundColor: colors.background.cream }}>
        <div className="relative w-full overflow-hidden">
          <motion.img
            {...scrollReveal.image}
            src={storyChainLandingContent.ownership.imageUrl.url}
            alt={storyChainLandingContent.ownership.imageUrl.alt}
            className="h-full w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-32"
            style={{
              background: `linear-gradient(to bottom, ${colors.background.cream} 0%, rgba(255,245,230,0.6) 40%, transparent 100%)`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
            style={{
              background: `linear-gradient(to top, ${colors.background.cream} 0%, rgba(255,245,230,0.6) 40%, transparent 100%)`,
            }}
          />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 pt-16 pb-20 text-center">
          <motion.span
            {...scrollReveal.paragraph}
            className="font-yellowtail mb-5 block text-lg"
            style={{ color: colors.brand.blue }}
          >
            {storyChainLandingContent.ownership.smallTitle}
          </motion.span>

          <motion.h2
            {...scrollReveal.heading}
            className="font-libreBaskerville mb-10 text-3xl leading-[1.2] tracking-tight sm:text-4xl"
            style={{ color: colors.text.tertiary }}
          >
            {storyChainLandingContent.ownership.title.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </motion.h2>

          <motion.p
            {...scrollReveal.paragraph}
            className="mx-auto mb-12 max-w-xl font-mono text-sm leading-[1.85]"
            style={{ color: colors.text.secondaryOpacity70 }}
          >
            {storyChainLandingContent.ownership.description}
          </motion.p>

          <ul
            className="mx-auto mb-14 max-w-md space-y-4 text-left font-mono text-sm"
            style={{ color: colors.text.secondaryOpacity75 }}
          >
            {storyChainLandingContent.ownership.points.map((point, i) => (
              <motion.li key={point} {...scrollReveal.list(i)} className="flex items-start gap-3">
                <motion.span
                  className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: colors.brand.blue }}
                  whileInView={{ scale: [0, 1.5, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                />
                {point}
              </motion.li>
            ))}
          </ul>

          <motion.div {...scrollReveal.paragraph}>
            <motion.button
              className="group flex items-center gap-2 rounded-[6px] px-7 py-2.5 text-sm font-medium text-white shadow-md"
              style={{ backgroundColor: colors.brand.blue }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {storyChainLandingContent.ownership.cta}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section
        className="relative z-10 px-6 py-20"
        style={{ backgroundColor: colors.background.cream }}
      >
        {/* Decorative quote marks */}
        <motion.div
          className="absolute top-32 left-[10%] hidden lg:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
        >
          <Quote className="h-24 w-24" style={{ color: colors.brand.pink[500] }} />
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <motion.span
              className="font-yellowtail mb-4 block text-lg"
              style={{ color: colors.brand.pink[500] }}
            >
              Loved by writers
            </motion.span>
            <h2
              className="font-libreBaskerville text-3xl leading-tight tracking-tight sm:text-4xl"
              style={{ color: colors.text.tertiary }}
            >
              <div>Stories from</div>
              <div>our community</div>
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={testimonial.author} {...testimonial} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= CREATOR TOOLS ================= */}
      <section
        className="relative z-10 px-6 pt-20 pb-24"
        style={{ backgroundColor: colors.background.cream }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-20"
          style={{
            background: `linear-gradient(to bottom, ${colors.opacity.cream[80]}, transparent)`,
          }}
        />
        <div className="mx-auto max-w-6xl text-center">
          <motion.div {...scrollReveal.image} className="mb-16 flex justify-center">
            <img
              src={storyChainLandingContent.creatorTools.imageUrl.url}
              alt={storyChainLandingContent.creatorTools.imageUrl.alt}
              className="h-[240px] w-auto"
            />
          </motion.div>

          <motion.span
            {...scrollReveal.paragraph}
            className="font-yellowtail mb-4 block text-lg text-pink-500"
          >
            {storyChainLandingContent.creatorTools.eyebrow}
          </motion.span>

          <motion.h2
            {...scrollReveal.heading}
            className="font-libreBaskerville mb-8 text-3xl leading-[1.2] tracking-tight sm:text-4xl"
            style={{ color: colors.text.tertiary }}
          >
            {storyChainLandingContent.creatorTools.title.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </motion.h2>

          <motion.p
            {...scrollReveal.paragraph}
            className="mx-auto mb-20 max-w-xl font-mono text-sm leading-[1.85]"
            style={{ color: colors.text.secondaryOpacity70 }}
          >
            {storyChainLandingContent.creatorTools.description}
          </motion.p>

          {/* App Grid - Light Cards with Corner Crosses */}
          <div className="mx-auto mb-20 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {storyChainLandingContent.captain.apps.map((app, i) => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative"
              >
                {/* Light Card */}
                <div className="relative h-full overflow-hidden rounded-2xl border border-black/5 bg-white p-8 shadow-sm transition-all duration-500 group-hover:border-black/10 group-hover:shadow-lg">
                  {/* Corner Crosses */}
                  <div className="absolute top-4 left-4 h-3 w-3">
                    <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-black/20" />
                    <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-black/20" />
                  </div>
                  <div className="absolute top-4 right-4 h-3 w-3">
                    <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-black/20" />
                    <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-black/20" />
                  </div>
                  <div className="absolute bottom-4 left-4 h-3 w-3">
                    <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-black/20" />
                    <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-black/20" />
                  </div>
                  <div className="absolute right-4 bottom-4 h-3 w-3">
                    <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-black/20" />
                    <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-black/20" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex h-full min-h-[180px] flex-col">
                    {/* Title - centered */}
                    <div className="flex flex-1 items-center justify-center">
                      <motion.h3
                        className="font-libreBaskerville text-xl font-semibold tracking-tight"
                        style={{ color: colors.text.tertiary }}
                        whileHover={{ scale: 1.03 }}
                      >
                        {app.name}
                      </motion.h3>
                    </div>

                    {/* Bottom content */}
                    <div className="space-y-3">
                      <p
                        className="font-mono text-xs leading-relaxed"
                        style={{ color: colors.text.secondaryOpacity65 }}
                      >
                        {app.description}
                      </p>
                      <motion.button
                        className="inline-flex items-center gap-1 rounded-full border px-4 py-1.5 text-xs font-medium transition-all"
                        style={{
                          color: colors.text.secondaryOpacity75,
                          borderColor: 'rgba(0,0,0,0.15)',
                        }}
                        whileHover={{
                          scale: 1.02,
                          backgroundColor: 'rgba(0,0,0,0.03)',
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Explore
                      </motion.button>
                    </div>
                  </div>

                  {/* Hover gradient effect */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-10"
                    style={{ background: app.gradient }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...scrollReveal.paragraph}>
            <motion.button
              className="group flex items-center gap-2 rounded-[6px] px-7 py-2.5 text-sm font-medium text-white shadow-md"
              style={{ backgroundColor: colors.brand.pink[500] }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {storyChainLandingContent.creatorTools.cta}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ================= TEAMWORK ================= */}
      <section className="relative z-10" style={{ backgroundColor: colors.background.cream }}>
        <div className="relative h-[260px] w-full overflow-hidden">
          <motion.img
            {...scrollReveal.image}
            src={storyChainLandingContent.collaboration.imageUrl.url}
            alt={storyChainLandingContent.collaboration.imageUrl.alt}
            className="h-full w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-36"
            style={{
              background: `linear-gradient(to bottom, ${colors.background.cream}, ${colors.opacity.cream[75]}, transparent)`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-36"
            style={{
              background: `linear-gradient(to top, ${colors.background.cream}, ${colors.opacity.cream[75]}, transparent)`,
            }}
          />
        </div>

        <div className="mx-auto max-w-4xl px-6 pt-16 pb-20 text-center">
          <motion.span
            {...scrollReveal.paragraph}
            className="font-yellowtail mb-4 block text-lg"
            style={{ color: colors.brand.pink[500] }}
          >
            {storyChainLandingContent.collaboration.eyebrow}
          </motion.span>

          <motion.h2
            {...scrollReveal.heading}
            className="font-libreBaskerville mb-8 text-3xl leading-[1.2] tracking-tight sm:text-4xl"
            style={{ color: colors.text.tertiary }}
          >
            {storyChainLandingContent.collaboration.title.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </motion.h2>

          <motion.p
            {...scrollReveal.paragraph}
            className="mx-auto mb-12 max-w-xl font-mono text-sm leading-[1.85]"
            style={{ color: colors.text.secondaryOpacity65 }}
          >
            {storyChainLandingContent.collaboration.description}
          </motion.p>

          {/* Collaboration features */}
          <div className="mx-auto mb-12 grid max-w-2xl grid-cols-2 gap-4">
            {storyChainLandingContent.collaboration.features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 rounded-xl bg-white/60 px-4 py-3 text-left shadow-sm ring-1 ring-black/5"
              >
                <Feather
                  className="h-4 w-4 flex-shrink-0"
                  style={{ color: colors.brand.pink[500] }}
                />
                <span
                  className="font-mono text-xs"
                  style={{ color: colors.text.secondaryOpacity75 }}
                >
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div {...scrollReveal.paragraph}>
            <motion.button
              className="group flex items-center gap-2 rounded-[6px] px-7 py-2.5 text-sm font-medium text-white shadow-md"
              style={{ backgroundColor: colors.brand.blue }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {storyChainLandingContent.collaboration.cta}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ================= DARK CTA SECTION ================= */}
      <section
        className="relative z-10 overflow-hidden py-32"
        style={{ backgroundColor: colors.background.dark }}
      >
        {/* Animated gradient mesh background */}
        <div className="pointer-events-none absolute inset-0">
          {/* Primary gradient orb - large, slow */}
          <motion.div
            className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full blur-[120px]"
            style={{
              background: `linear-gradient(135deg, ${colors.brand.pink[500]}40, ${colors.brand.blue}30)`,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Secondary gradient orb */}
          <motion.div
            className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full blur-[100px]"
            style={{
              background: `linear-gradient(225deg, ${colors.brand.blue}35, ${colors.brand.pink[400]}25)`,
            }}
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          {/* Accent orb */}
          <motion.div
            className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
            style={{
              background: `radial-gradient(circle, ${colors.brand.pink[500]}20, transparent 70%)`,
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating particles */}
        <FloatingParticles count={25} color="rgba(255,255,255,0.12)" />

        <div className="relative mx-auto max-w-4xl px-6">
          {/* Decorative Story Branch Visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-16 flex justify-center"
          >
            <div className="relative h-[200px] w-full max-w-lg">
              {/* Central node - the story */}
              <motion.div
                className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-2xl shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${colors.brand.pink[500]}, ${colors.brand.blue})`,
                    boxShadow: `0 0 60px ${colors.brand.pink[500]}50, 0 0 100px ${colors.brand.blue}30`,
                  }}
                >
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
              </motion.div>

              {/* Orbiting branch nodes */}
              {[
                { Icon: GitBranch, angle: 0, delay: 0, size: 'h-12 w-12', iconSize: 'h-5 w-5' },
                { Icon: Users, angle: 72, delay: 0.5, size: 'h-10 w-10', iconSize: 'h-4 w-4' },
                { Icon: Sparkles, angle: 144, delay: 1, size: 'h-11 w-11', iconSize: 'h-4 w-4' },
                {
                  Icon: MessageCircle,
                  angle: 216,
                  delay: 1.5,
                  size: 'h-10 w-10',
                  iconSize: 'h-4 w-4',
                },
                { Icon: Feather, angle: 288, delay: 2, size: 'h-12 w-12', iconSize: 'h-5 w-5' },
              ].map(({ Icon, angle, delay, size, iconSize }, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: delay }}
                >
                  {/* Connecting line */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 h-px origin-left"
                    style={{
                      width: '70px',
                      background: `linear-gradient(90deg, ${colors.brand.pink[500]}60, transparent)`,
                      transform: `rotate(${angle}deg)`,
                    }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: delay }}
                  />
                  {/* Node */}
                  <motion.div
                    className={`absolute ${size} flex items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm`}
                    style={{
                      left: `${Math.cos((angle * Math.PI) / 180) * 85}px`,
                      top: `${Math.sin((angle * Math.PI) / 180) * 85}px`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: delay, ease: 'easeInOut' }}
                    whileHover={{ scale: 1.15, backgroundColor: 'rgba(255,255,255,0.2)' }}
                  >
                    <Icon className={`${iconSize} text-white/70`} />
                  </motion.div>
                </motion.div>
              ))}

              {/* Pulsing ring effect */}
              <motion.div
                className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeOut', delay: 1 }}
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="text-center">
            <motion.span
              {...scrollReveal.paragraph}
              className="font-yellowtail mb-4 block text-xl"
              style={{ color: colors.brand.pink[400] }}
            >
              {storyChainLandingContent.darkCta.eyebrow}
            </motion.span>

            <motion.h2
              {...scrollReveal.heading}
              className="font-libreBaskerville mb-6 text-4xl leading-[1.15] tracking-tight sm:text-5xl"
              style={{ color: colors.text.light }}
            >
              {storyChainLandingContent.darkCta.title.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </motion.h2>

            <motion.p
              {...scrollReveal.paragraph}
              className="mx-auto mb-12 max-w-xl font-mono text-sm leading-[1.9]"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              {storyChainLandingContent.darkCta.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div {...scrollReveal.paragraph} className="flex flex-wrap justify-center gap-4">
              <motion.button
                className="group flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium text-white shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${colors.brand.pink[500]}, ${colors.brand.pink[600] || colors.brand.pink[500]})`,
                  boxShadow: `0 10px 40px -10px ${colors.brand.pink[500]}80`,
                }}
                whileHover={{
                  scale: 1.03,
                  y: -3,
                  boxShadow: `0 20px 50px -10px ${colors.brand.pink[500]}90`,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                {storyChainLandingContent.darkCta.primaryCta}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                className="group flex items-center gap-2 rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white/80 backdrop-blur-sm"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  borderColor: 'rgba(255,255,255,0.3)',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                {storyChainLandingContent.darkCta.secondaryCta}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FINAL VISION ================= */}
      <section
        className="relative z-10 px-6 pt-28 pb-20 text-center"
        style={{ backgroundColor: colors.background.cream }}
      >
        <motion.div {...scrollReveal.image} className="mb-20 flex justify-center">
          <div className="relative h-[200px] w-[400px] overflow-hidden rounded-[100px]">
            <img
              src="/src/assets/Gemini_Generated_Image_qg7ks4qg7ks4qg7k.png"
              alt="Exploring a new frontier"
              className="h-full w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-16"
              style={{
                background: `linear-gradient(to bottom, ${colors.background.cream}, ${colors.opacity.cream[80]}, transparent)`,
              }}
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
              style={{
                background: `linear-gradient(to top, ${colors.background.cream}, ${colors.opacity.cream[80]}, transparent)`,
              }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-20"
              style={{
                background: `linear-gradient(to right, ${colors.background.cream}, ${colors.opacity.cream[80]}, transparent)`,
              }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-20"
              style={{
                background: `linear-gradient(to left, ${colors.background.cream}, ${colors.opacity.cream[80]}, transparent)`,
              }}
            />
          </div>
        </motion.div>

        <motion.span
          {...scrollReveal.paragraph}
          className="font-yellowtail mb-4 block text-base"
          style={{ color: colors.brand.blue }}
        >
          {storyChainLandingContent.vision.eyebrow}
        </motion.span>

        <motion.h2
          {...scrollReveal.heading}
          className="font-libreBaskerville mb-8 text-3xl leading-[1.2] tracking-tight sm:text-4xl"
          style={{ color: colors.text.tertiary }}
        >
          {storyChainLandingContent.vision.title.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </motion.h2>

        <motion.p
          {...scrollReveal.paragraph}
          className="mx-auto max-w-xl font-mono text-sm leading-[1.85]"
          style={{ color: colors.text.secondaryOpacity65 }}
        >
          {storyChainLandingContent.vision.description}
        </motion.p>
      </section>

      {/* ================= FOOTER ================= */}
      <footer
        className="relative z-10 px-6 pt-12 pb-24"
        style={{ backgroundColor: colors.background.cream }}
      >
        <div
          className="mx-auto grid max-w-6xl grid-cols-2 gap-12 text-left text-xs sm:grid-cols-5"
          style={{ color: colors.text.secondaryOpacity65 }}
        >
          <div>
            <div
              className="mb-3 flex items-center gap-2 font-medium"
              style={{ color: colors.text.tertiary }}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: colors.brand.pink[500] }}
              />
              {storyChainLandingContent.footer.brand.name}
            </div>
            <div className="mb-2 leading-relaxed">
              {storyChainLandingContent.footer.brand.description}
            </div>
            <div className="text-[10px] italic" style={{ color: colors.text.secondaryOpacity65 }}>
              {storyChainLandingContent.footer.brand.tagline}
            </div>
          </div>

          {storyChainLandingContent.footer.sections.map((section) => (
            <div key={section.title}>
              <div className="mb-3 font-medium" style={{ color: colors.text.tertiary }}>
                {section.title}
              </div>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="transition-colors hover:opacity-80">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mx-auto mt-12 max-w-6xl border-t pt-6 text-center text-xs"
          style={{
            borderColor: colors.text.secondaryOpacity65,
            color: colors.text.secondaryOpacity65,
          }}
        >
          {storyChainLandingContent.footer.copyright}
        </div>
      </footer>
    </div>
  );
};

export default Home;
