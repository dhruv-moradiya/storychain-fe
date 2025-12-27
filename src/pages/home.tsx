import { Button } from '@/components/ui/button';
import { storyChainLandingContent } from '@/constants/content/lading-page-content';
import { cn, fadeIn, scrollReveal } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { useAuth } from '@clerk/clerk-react';
import { LayoutDashboard, Compass } from 'lucide-react';
import { Activity } from 'react';

const Home = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ========== HERO BACKGROUND GRADIENT ========== */}
      {/* Soft atmospheric multi-stop gradient: sky → clouds → warm horizon */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#a8b4f0] via-[#c4b8e8] via-[#dcc5d8] via-[#ecd4c8] to-[#fff5e6]" />

      {/* Subtle overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />

      {/* ================= NAVBAR ================= */}
      <motion.header
        {...fadeIn(0)}
        className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-8"
      >
        <div className="flex items-center gap-2.5 font-medium text-white">
          <span className="h-3 w-3 rounded-full bg-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.7)]" />
          Story Chain
        </div>

        <nav className="flex items-center gap-2 text-sm text-white/80">
          <Activity mode={isSignedIn ? 'visible' : 'hidden'}>
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
          </Activity>

          <Activity mode={isSignedIn ? 'hidden' : 'visible'}>
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
          </Activity>
        </nav>
      </motion.header>

      {/* ================= HERO ================= */}
      <section className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-6 pt-8 pb-20 text-center">
        {/* Eyebrow */}
        <motion.span
          {...fadeIn(0.1)}
          className="font-yellowtail mb-4 text-2xl tracking-wide text-white/85"
        >
          {storyChainLandingContent.hero.eyebrow}
        </motion.span>

        {/* Title */}
        <motion.h1
          {...fadeIn(0.2)}
          className="font-libreBaskerville mb-10 text-4xl leading-[1.15] tracking-tight text-[#23255f] sm:text-5xl md:text-6xl"
        >
          {storyChainLandingContent.hero.title.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </motion.h1>

        {/* Description */}
        <motion.p
          {...fadeIn(0.3)}
          className="mb-12 max-w-xl font-mono text-sm leading-[1.8] font-medium text-[#2a2d66]/75"
        >
          {storyChainLandingContent.hero.description}
        </motion.p>

        {/* CTAs - Different for authenticated vs non-authenticated */}
        <motion.div
          {...fadeIn(0.4)}
          className="mb-8 flex flex-wrap items-center justify-center gap-4"
        >
          {isSignedIn ? (
            <>
              <Link to="/dashboard">
                <button className="flex items-center gap-2 rounded-[6px] bg-pink-500 px-7 py-2.5 text-sm font-medium text-white shadow-lg ring-2 shadow-pink-500/25 ring-pink-500/30 transition-all hover:bg-pink-600 hover:shadow-pink-500/35">
                  <LayoutDashboard size={16} />
                  Go to Dashboard
                </button>
              </Link>

              <Link to="/explore">
                <button className="flex items-center gap-2 rounded-[6px] border border-white/35 px-6 py-2.5 text-sm font-medium text-white/90 backdrop-blur transition hover:border-white/50 hover:bg-white/10">
                  <Compass size={16} />
                  Explore Stories
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/sign-up">
                <button className="rounded-[6px] bg-pink-500 px-7 py-2.5 text-sm font-medium text-white shadow-lg ring-2 shadow-pink-500/25 ring-pink-500/30 transition-all hover:bg-pink-600 hover:shadow-pink-500/35">
                  {storyChainLandingContent.hero.primaryCta}
                </button>
              </Link>

              <Link to="/sign-in">
                <button className="rounded-[6px] border border-white/35 px-6 py-2.5 text-sm font-medium text-white/90 backdrop-blur transition hover:border-white/50 hover:bg-white/10">
                  {storyChainLandingContent.hero.secondaryCta}
                </button>
              </Link>
            </>
          )}
        </motion.div>

        {/* Helper text */}
        <motion.p
          {...fadeIn(0.5)}
          className="mt-6 max-w-xl font-mono text-xs font-medium tracking-normal text-white/55"
        >
          {storyChainLandingContent.hero.helperText}
        </motion.p>
      </section>

      {/* ================= SECTION BLEND TO CREAM ================= */}
      <section className="relative z-10 h-24 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fff5e6]/60 to-[#fff6ea]" />
      </section>

      {/* ================= NOT JUST AN APP ================= */}
      <section
        className={cn(
          'relative z-10 bg-[#fff6ea] px-6 pt-20 pb-28'
          // 'bg-[radial-gradient(circle,_rgba(0,0,0,0.12)_1px,_transparent_1px)] bg-[length:20px_20px]'
        )}
      >
        <div className="mx-auto max-w-6xl">
          {/* Canvas with dot pattern - ONLY this section has dots */}
          <div className="relative rounded-[28px] bg-[#fff7eb] px-6 py-32 shadow-sm">
            {/* Subtle dot texture - low opacity, non-distracting */}
            <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle,_rgba(160,160,160,0.7)_1px,_transparent_1px)] [background-size:24px_24px] opacity-80" />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              {/* Accent title */}
              <motion.span
                {...scrollReveal.paragraph}
                className="font-yellowtail mb-5 block text-lg text-pink-500"
              >
                {storyChainLandingContent.notJustAnApp.smallTitle}
              </motion.span>

              {/* Main headline */}
              <motion.h2
                {...scrollReveal.heading}
                className="font-libreBaskerville mb-12 text-3xl leading-[1.2] tracking-tight text-[#1b1d4e] sm:text-4xl"
              >
                {storyChainLandingContent.notJustAnApp.lines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </motion.h2>

              {/* Supporting text */}
              <motion.p
                {...scrollReveal.paragraph}
                className="mx-auto max-w-xl font-mono text-sm leading-[1.85] text-[#2a2d66]/70"
              >
                {storyChainLandingContent.notJustAnApp.description}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OWNERSHIP ================= */}
      <section className="relative z-10 bg-[#fff6ea]">
        {/* ---------- IMAGE STRIP with TOP/BOTTOM blending ---------- */}
        <div className="relative h-[280px] w-full overflow-hidden">
          <motion.img
            {...scrollReveal.image}
            src="/src/assets/Gemini_Generated_Image_f77ghef77ghef77g.png"
            alt="Ownership illustration"
            className="h-full w-full object-cover"
          />

          {/* Top fade - stronger */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#fff6ea] via-[#fff6ea]/70 to-transparent" />

          {/* Bottom fade - stronger */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fff6ea] via-[#fff6ea]/70 to-transparent" />
        </div>

        {/* ---------- CONTENT ---------- */}
        <div className="relative mx-auto max-w-3xl px-6 pt-20 pb-36 text-center">
          {/* Accent */}
          <motion.span
            {...scrollReveal.paragraph}
            className="font-yellowtail mb-5 block text-lg text-[#6b7cff]"
          >
            Ownership
          </motion.span>

          {/* Title */}
          <motion.h2
            {...scrollReveal.heading}
            className="font-libreBaskerville mb-10 text-3xl leading-[1.2] tracking-tight text-[#1b1d4e] sm:text-4xl"
          >
            {storyChainLandingContent.ownership.title.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </motion.h2>

          {/* Description */}
          <motion.p
            {...scrollReveal.paragraph}
            className="mx-auto mb-12 max-w-xl font-mono text-sm leading-[1.85] text-[#2a2d66]/70"
          >
            {storyChainLandingContent.ownership.description}
          </motion.p>

          {/* Points */}
          <ul className="mx-auto mb-14 max-w-md space-y-4 text-left font-mono text-sm text-[#2a2d66]/75">
            {storyChainLandingContent.ownership.points.map((point, i) => (
              <motion.li key={point} {...scrollReveal.list(i)} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#6b7cff]" />
                {point}
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <motion.div {...scrollReveal.paragraph}>
            <button className="rounded-[6px] bg-[#6b7cff] px-7 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-[#5a6cff] hover:shadow-lg">
              {storyChainLandingContent.ownership.cta}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ================= YOU'RE THE CAPTAIN ================= */}
      <section className="relative z-10 bg-[#fff6ea] px-6 pt-24 pb-40">
        <div className="mx-auto max-w-6xl text-center">
          {/* Illustration */}
          <motion.div {...scrollReveal.image} className="mb-16 flex justify-center">
            <img
              src="/src/assets/Gemini_Generated_Image_5b8cs15b8cs15b8c-removebg-preview.png"
              alt="You're the captain"
              className="h-[240px] w-auto"
            />
          </motion.div>

          {/* Accent */}
          <motion.span
            {...scrollReveal.paragraph}
            className="font-yellowtail mb-4 block text-lg text-pink-500"
          >
            {storyChainLandingContent.creatorTools.eyebrow}
          </motion.span>

          {/* Title */}
          <motion.h2
            {...scrollReveal.heading}
            className="font-libreBaskerville mb-8 text-3xl leading-[1.2] tracking-tight text-[#1b1d4e] sm:text-4xl"
          >
            {storyChainLandingContent.creatorTools.title.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </motion.h2>

          {/* Description */}
          <motion.p
            {...scrollReveal.paragraph}
            className="mx-auto mb-20 max-w-xl font-mono text-sm leading-[1.85] text-[#2a2d66]/70"
          >
            {storyChainLandingContent.creatorTools.description}
          </motion.p>

          {/* App / Feature Grid with poetic icons */}
          <div className="mx-auto mb-20 grid max-w-4xl grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
            {storyChainLandingContent.captain.apps.map((app, i) => (
              <motion.div
                key={app.name}
                {...scrollReveal.card(i)}
                className="flex flex-col items-center gap-4 rounded-xl bg-white/70 p-5 shadow-sm ring-1 ring-black/[0.04] backdrop-blur transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl shadow-sm"
                  style={{ background: app.gradient }}
                >
                  {app.icon}
                </div>

                <div className="text-center">
                  <div className="font-mono text-xs font-semibold text-[#1b1d4e]">{app.name}</div>
                  <div className="mt-1.5 text-[11px] leading-relaxed text-[#2a2d66]/65">
                    {app.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div {...scrollReveal.paragraph}>
            <button className="rounded-[6px] bg-pink-500 px-7 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-pink-600 hover:shadow-lg">
              {storyChainLandingContent.creatorTools.cta}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ================= TEAMWORK ================= */}
      <section className="relative z-10 bg-[#fff6ea]">
        {/* ---------- IMAGE STRIP with TOP/BOTTOM blending ---------- */}
        <div className="relative h-[260px] w-full overflow-hidden">
          <motion.img
            {...scrollReveal.image}
            src="/src/assets/Gemini_Generated_Image_qg7ks4qg7ks4qg7k.png"
            alt="Clouds"
            className="h-full w-full object-cover"
          />

          {/* Top fade */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#fff6ea] via-[#fff6ea]/60 to-transparent" />

          {/* Bottom fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#fff6ea] via-[#fff6ea]/60 to-transparent" />
        </div>

        {/* ---------- CONTENT ---------- */}
        <div className="mx-auto max-w-4xl px-6 pt-16 pb-36 text-center">
          {/* Accent */}
          <motion.span
            {...scrollReveal.paragraph}
            className="font-yellowtail mb-4 block text-lg text-pink-500"
          >
            {storyChainLandingContent.collaboration.eyebrow}
          </motion.span>

          {/* Title */}
          <motion.h2
            {...scrollReveal.heading}
            className="font-libreBaskerville mb-8 text-3xl leading-[1.2] tracking-tight text-[#1b1d4e] sm:text-4xl"
          >
            {storyChainLandingContent.collaboration.title.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </motion.h2>

          {/* Description */}
          <motion.p
            {...scrollReveal.paragraph}
            className="mx-auto mb-20 max-w-xl font-mono text-sm leading-[1.85] text-[#2a2d66]/65"
          >
            {storyChainLandingContent.collaboration.description}
          </motion.p>

          {/* Cards */}
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-3">
            {/* Card 1 */}
            <motion.div
              {...scrollReveal.card(0)}
              className="rounded-xl bg-white/75 p-7 shadow-sm ring-1 ring-black/[0.04] backdrop-blur"
            >
              <div className="mb-4 flex justify-center gap-2">
                <div className="h-6 w-6 rounded-md bg-[#1b1d4e]" />
                <div className="h-6 w-6 rounded-md bg-[#6b7cff]" />
              </div>
              <p className="font-mono text-xs leading-relaxed text-[#2a2d66]/75">
                Minima + Port
                <br />
                Turn your notes into a website.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              {...scrollReveal.card(1)}
              className="rounded-xl bg-white/75 p-7 shadow-sm ring-1 ring-black/[0.04] backdrop-blur"
            >
              <div className="mb-4 flex justify-center gap-2">
                <div className="h-6 w-6 rounded-md bg-pink-500" />
                <div className="h-6 w-6 rounded-md bg-[#2a2d66]" />
              </div>
              <p className="font-mono text-xs leading-relaxed text-[#2a2d66]/75">
                Telescope + Black Hole
                <br />
                Generate images and store them safely.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              {...scrollReveal.card(2)}
              className="rounded-xl bg-white/75 p-7 shadow-sm ring-1 ring-black/[0.04] backdrop-blur"
            >
              <div className="mb-4 flex justify-center gap-2">
                <div className="h-6 w-6 rounded-md bg-[#6b7cff]" />
                <div className="h-6 w-6 rounded-md bg-pink-400" />
              </div>
              <p className="font-mono text-xs leading-relaxed text-[#2a2d66]/75">
                Any Space App + Your Idea
                <br />
                Build against and extend anything.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= DARK CTA SECTION ================= */}
      <section className="relative z-10 bg-[#0b0b10] py-44">
        {/* Subtle vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04)_0%,_transparent_50%)]" />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          {/* Illustration with ALL-SIDES radial blend */}
          <motion.div {...scrollReveal.image} className="mb-16 flex justify-center">
            <div className="relative">
              <img
                src="/src/assets/Gemini_Generated_Image_7zwxkp7zwxkp7zwx.png"
                alt="For developers"
                className="h-[280px] w-auto rounded-lg"
              />
              {/* Soft radial vignette - melts into dark background from ALL sides */}
              <div className="pointer-events-none absolute inset-0 rounded-lg bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(11,11,16,0.6)_60%,_rgba(11,11,16,0.95)_80%)]" />
              {/* Additional edge softening */}
              <div className="pointer-events-none absolute inset-0 rounded-lg shadow-[inset_0_0_60px_40px_rgba(11,11,16,0.8)]" />
            </div>
          </motion.div>

          {/* Accent */}
          <motion.span
            {...scrollReveal.paragraph}
            className="font-yellowtail mb-4 block text-base text-[#f6c36a]/90"
          >
            {storyChainLandingContent.darkCta.eyebrow}
          </motion.span>

          {/* Title */}
          <motion.h2
            {...scrollReveal.heading}
            className="font-libreBaskerville mb-8 text-3xl leading-[1.2] tracking-tight text-[#f5f5f7] sm:text-4xl"
          >
            {storyChainLandingContent.darkCta.title.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </motion.h2>

          {/* Description */}
          <motion.p
            {...scrollReveal.paragraph}
            className="mx-auto mb-12 max-w-xl font-mono text-sm leading-[1.85] text-white/50"
          >
            {storyChainLandingContent.darkCta.description}
          </motion.p>

          {/* CTA */}
          <motion.div {...scrollReveal.paragraph}>
            <button className="rounded-[6px] bg-pink-500 px-7 py-2.5 text-sm font-medium text-white shadow-lg shadow-pink-500/25 transition-all hover:bg-pink-600 hover:shadow-pink-500/35">
              {storyChainLandingContent.darkCta.primaryCta}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ================= FINAL VISION ================= */}
      <section className="relative z-10 bg-[#fff6ea] px-6 pt-44 pb-28 text-center">
        {/* Cloud window with ALL-SIDES radial blend */}
        <motion.div {...scrollReveal.image} className="mb-20 flex justify-center">
          <div className="relative h-[200px] w-[400px] overflow-hidden rounded-[100px]">
            <img
              src="/src/assets/Gemini_Generated_Image_qg7ks4qg7ks4qg7k.png"
              alt="Exploring a new frontier"
              className="h-full w-full object-cover"
            />
            {/* Soft radial fade from ALL sides - no visible rectangle edges */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_25%,_rgba(255,246,234,0.5)_50%,_rgba(255,246,234,0.85)_70%,_rgba(255,246,234,1)_85%)]" />
          </div>
        </motion.div>

        {/* Accent */}
        <motion.span
          {...scrollReveal.paragraph}
          className="font-yellowtail mb-4 block text-base text-[#6b7cff]"
        >
          {storyChainLandingContent.vision.eyebrow}
        </motion.span>

        {/* Title */}
        <motion.h2
          {...scrollReveal.heading}
          className="font-libreBaskerville mb-8 text-3xl leading-[1.2] tracking-tight text-[#1b1d4e] sm:text-4xl"
        >
          {storyChainLandingContent.vision.title.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </motion.h2>

        {/* Description */}
        <motion.p
          {...scrollReveal.paragraph}
          className="mx-auto max-w-xl font-mono text-sm leading-[1.85] text-[#2a2d66]/65"
        >
          {storyChainLandingContent.vision.description}
        </motion.p>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-10 bg-[#fff6ea] px-6 pt-12 pb-24">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-12 text-left text-xs text-[#2a2d66]/65 sm:grid-cols-5">
          {/* Brand */}
          <div>
            <div className="mb-3 font-medium text-[#1b1d4e]">
              {storyChainLandingContent.footer.tagline.join(' ')}
            </div>
            <div className="leading-relaxed">Built for creators everywhere</div>
          </div>

          {/* Product */}
          <div>
            <div className="mb-3 font-medium text-[#1b1d4e]">Product</div>
            <ul className="space-y-2">
              <li>Pricing & Limits</li>
              <li>Manual</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="mb-3 font-medium text-[#1b1d4e]">Company</div>
            <ul className="space-y-2">
              <li>Team</li>
              <li>Motivation</li>
              <li>Blog</li>
              <li>Careers</li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <div className="mb-3 font-medium text-[#1b1d4e]">Developers</div>
            <ul className="space-y-2">
              <li>Documentation</li>
              <li>Changelog</li>
              <li>CLI</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <div className="mb-3 font-medium text-[#1b1d4e]">Resources</div>
            <ul className="space-y-2">
              <li>Legal</li>
              <li>Privacy</li>
              <li>Terms</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
