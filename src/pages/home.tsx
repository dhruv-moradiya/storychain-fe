import { Button } from '@/components/ui/button';
import { storyChainLandingContent, colors } from '@/constants';
import { fadeIn, scrollReveal } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { useAuth } from '@clerk/clerk-react';
import { LayoutDashboard, Compass } from 'lucide-react';

const Home = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ========== HERO BACKGROUND GRADIENT ========== */}
      {/* Soft atmospheric multi-stop gradient: sky → clouds → warm horizon */}
      {/* <div
        className="absolute inset-0 bg-gradient-to-b"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${colors.hero.gradient.from}, ${colors.hero.gradient.via1}, ${colors.hero.gradient.via2}, ${colors.hero.gradient.via3}, ${colors.hero.gradient.to})`,
        }}
      /> */}

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
          className="font-libreBaskerville mb-10 text-4xl leading-[1.15] tracking-tight sm:text-5xl md:text-6xl"
          style={{ color: colors.text.primary }}
        >
          {storyChainLandingContent.hero.title.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </motion.h1>

        {/* Description */}
        <motion.p
          {...fadeIn(0.3)}
          className="mb-12 max-w-xl font-mono text-sm leading-[1.8] font-medium"
          style={{ color: colors.text.secondaryOpacity75 }}
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
                <button
                  className="flex items-center gap-2 rounded-[6px] px-7 py-2.5 text-[clamp(12px,1.6vw,16px)] font-medium text-white shadow-md transition-all hover:shadow-lg"
                  style={{
                    backgroundColor: colors.brand.pink[500],
                    boxShadow: `0 10px 15px -3px ${colors.brand.pink.shadow25}, 0 0 0 2px ${colors.brand.pink.ring30}`,
                  }}
                >
                  <LayoutDashboard size={16} />
                  Go to Dashboard
                </button>
              </Link>

              {/* <Link to="/explore">
                <button className="flex items-center gap-2 rounded-[6px] border border-white/35 px-6 py-2.5 text-[clamp(12px,1.6vw,16px)] font-medium text-white/90 backdrop-blur transition hover:border-white/50 hover:bg-white/10">
                  <Compass size={16} />
                  Explore Stories
                </button>
              </Link> */}
            </>
          ) : (
            <>
              <Link to="/sign-up">
                <button
                  className="rounded-[6px] px-7 py-2.5 text-[clamp(13px,1.7vw,17px)] font-medium text-white shadow-md transition-all hover:shadow-lg"
                  style={{
                    backgroundColor: colors.brand.pink[500],
                    boxShadow: `0 10px 15px -3px ${colors.brand.pink.shadow25}, 0 0 0 2px ${colors.brand.pink.ring30}`,
                  }}
                >
                  {storyChainLandingContent.hero.primaryCta}
                </button>
              </Link>

              <Link to="/sign-in">
                <button className="rounded-[6px] border border-white/35 px-6 py-2.5 text-[clamp(13px,1.7vw,17px)] font-medium text-white/90 backdrop-blur transition hover:border-white/50 hover:bg-white/10">
                  {storyChainLandingContent.hero.secondaryCta}
                </button>
              </Link>
            </>
          )}
        </motion.div>

        {/* Helper text */}
        {/* <motion.p
          {...fadeIn(0.5)}
          className="mt-6 max-w-xl font-mono text-xs font-medium tracking-normal text-white/55"
        >
          {storyChainLandingContent.hero.helperText}
        </motion.p> */}
      </section>

      {/* ================= SECTION BLEND TO CREAM ================= */}
      <section className="relative z-10 h-32 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-[#fff6ea]"
          style={{
            background: `linear-gradient(to bottom, transparent, ${colors.opacity.creamBlend[50]}, ${colors.background.cream})`,
          }}
        />
        {/* Additional soft overlay for smoother transition */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-[#fff6ea]"
          style={{
            background: `linear-gradient(to bottom, transparent, ${colors.opacity.cream[60]}, ${colors.background.cream})`,
          }}
        />
      </section>

      {/* ================= NOT JUST AN APP ================= */}
      <section
        className="relative z-10 px-6 pt-20 pb-28"
        style={{ backgroundColor: colors.background.cream }}
      >
        <div className="mx-auto max-w-6xl">
          {/* Canvas with dot pattern - ONLY this section has dots */}
          <div
            className="relative rounded-[28px] px-6 py-32 shadow-sm backdrop-blur-sm"
            style={{ backgroundColor: colors.background.creamLight }}
          >
            {/* Subtle dot texture - low opacity, non-distracting */}
            <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle,_rgba(0,0,0,0.03)_1px,_transparent_1px)] [background-size:24px_24px] opacity-60" />
            {/* Soft edge blend */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[28px]"
              style={{
                background: `linear-gradient(to bottom, ${colors.opacity.cream[20]}, transparent, ${colors.opacity.cream[20]})`,
              }}
            />

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
                className="font-libreBaskerville mb-12 text-3xl leading-[1.2] tracking-tight sm:text-4xl"
                style={{ color: colors.text.tertiary }}
              >
                {storyChainLandingContent.notJustAnApp.lines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </motion.h2>

              {/* Supporting text */}
              <motion.p
                {...scrollReveal.paragraph}
                className="mx-auto max-w-xl font-mono text-sm leading-[1.85]"
                style={{ color: colors.text.secondaryOpacity70 }}
              >
                {storyChainLandingContent.notJustAnApp.description}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OWNERSHIP ================= */}
      <section className="relative z-10" style={{ backgroundColor: colors.background.cream }}>
        {/* ---------- IMAGE STRIP with TOP/BOTTOM blending ---------- */}
        <div className="relative w-full overflow-hidden">
          <motion.img
            {...scrollReveal.image}
            src={storyChainLandingContent.ownership.imageUrl.url}
            alt={storyChainLandingContent.ownership.imageUrl.alt}
            className="h-full w-full object-cover"
          />

          {/* Top fade - enhanced multi-layer blend */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-32"
            style={{
              background: `linear-gradient(to bottom, ${colors.background.cream} 0%, rgba(255,245,230,0.6) 40%, transparent 100%)`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-20"
            style={{
              background: `linear-gradient(to bottom, rgba(255,250,240,0.85) 0%, transparent 100%)`,
              filter: 'blur(8px)',
            }}
          />

          {/* Bottom fade - enhanced multi-layer blend */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
            style={{
              background: `linear-gradient(to top, ${colors.background.cream} 0%, rgba(255,245,230,0.6) 40%, transparent 100%)`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
            style={{
              background: `linear-gradient(to top, rgba(255,250,240,0.85) 0%, transparent 100%)`,
              filter: 'blur(8px)',
            }}
          />
        </div>

        {/* ---------- CONTENT ---------- */}
        <div className="relative mx-auto max-w-3xl px-6 pt-20 pb-36 text-center">
          {/* Accent */}
          <motion.span
            {...scrollReveal.paragraph}
            className="font-yellowtail mb-5 block text-lg"
            style={{ color: colors.brand.blue }}
          >
            {storyChainLandingContent.ownership.smallTitle}
          </motion.span>

          {/* Title */}
          <motion.h2
            {...scrollReveal.heading}
            className="font-libreBaskerville mb-10 text-3xl leading-[1.2] tracking-tight sm:text-4xl"
            style={{ color: colors.text.tertiary }}
          >
            {storyChainLandingContent.ownership.title.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </motion.h2>

          {/* Description */}
          <motion.p
            {...scrollReveal.paragraph}
            className="mx-auto mb-12 max-w-xl font-mono text-sm leading-[1.85]"
            style={{ color: colors.text.secondaryOpacity70 }}
          >
            {storyChainLandingContent.ownership.description}
          </motion.p>

          {/* Points */}
          <ul
            className="mx-auto mb-14 max-w-md space-y-4 text-left font-mono text-sm"
            style={{ color: colors.text.secondaryOpacity75 }}
          >
            {storyChainLandingContent.ownership.points.map((point, i) => (
              <motion.li key={point} {...scrollReveal.list(i)} className="flex items-start gap-3">
                <span
                  className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: colors.brand.blue }}
                />
                {point}
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <motion.div {...scrollReveal.paragraph}>
            <button
              className="rounded-[6px] px-7 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg"
              style={{ backgroundColor: colors.brand.blue }}
            >
              {storyChainLandingContent.ownership.cta}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ================= YOU'RE THE CAPTAIN ================= */}
      <section
        className="relative z-10 px-6 pt-24 pb-40"
        style={{ backgroundColor: colors.background.cream }}
      >
        {/* Subtle blend overlay at top of section */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-20"
          style={{
            background: `linear-gradient(to bottom, ${colors.opacity.cream[80]}, transparent)`,
          }}
        />
        <div className="mx-auto max-w-6xl text-center">
          {/* Illustration */}
          <motion.div {...scrollReveal.image} className="mb-16 flex justify-center">
            <img
              src={storyChainLandingContent.creatorTools.imageUrl.url}
              alt={storyChainLandingContent.creatorTools.imageUrl.alt}
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
            className="font-libreBaskerville mb-8 text-3xl leading-[1.2] tracking-tight sm:text-4xl"
            style={{ color: colors.text.tertiary }}
          >
            {storyChainLandingContent.creatorTools.title.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </motion.h2>

          {/* Description */}
          <motion.p
            {...scrollReveal.paragraph}
            className="mx-auto mb-20 max-w-xl font-mono text-sm leading-[1.85]"
            style={{ color: colors.text.secondaryOpacity70 }}
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
                  <div
                    className="font-mono text-xs font-semibold"
                    style={{ color: colors.text.tertiary }}
                  >
                    {app.name}
                  </div>
                  <div
                    className="mt-1.5 text-[11px] leading-relaxed"
                    style={{ color: colors.text.secondaryOpacity65 }}
                  >
                    {app.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div {...scrollReveal.paragraph}>
            <button
              className="rounded-[6px] px-7 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg"
              style={{ backgroundColor: colors.brand.pink[500] }}
            >
              {storyChainLandingContent.creatorTools.cta}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ================= TEAMWORK ================= */}
      <section className="relative z-10" style={{ backgroundColor: colors.background.cream }}>
        {/* ---------- IMAGE STRIP with TOP/BOTTOM blending ---------- */}
        <div className="relative h-[260px] w-full overflow-hidden">
          <motion.img
            {...scrollReveal.image}
            src={storyChainLandingContent.collaboration.imageUrl.url}
            alt={storyChainLandingContent.collaboration.imageUrl.alt}
            className="h-full w-full object-cover"
          />

          {/* Top fade - enhanced multi-layer blend */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-36"
            style={{
              background: `linear-gradient(to bottom, ${colors.background.cream}, ${colors.opacity.cream[75]}, transparent)`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-20"
            style={{
              background: `linear-gradient(to bottom, ${colors.opacity.cream[95]}, transparent)`,
            }}
          />

          {/* Bottom fade - enhanced multi-layer blend */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-36"
            style={{
              background: `linear-gradient(to top, ${colors.background.cream}, ${colors.opacity.cream[75]}, transparent)`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
            style={{
              background: `linear-gradient(to top, ${colors.opacity.cream[95]}, transparent)`,
            }}
          />
        </div>

        {/* ---------- CONTENT ---------- */}
        <div className="mx-auto max-w-4xl px-6 pt-16 pb-36 text-center">
          {/* Accent */}
          <motion.span
            {...scrollReveal.paragraph}
            className="font-yellowtail mb-4 block text-lg"
            style={{ color: colors.brand.pink[500] }}
          >
            {storyChainLandingContent.collaboration.eyebrow}
          </motion.span>

          {/* Title */}
          <motion.h2
            {...scrollReveal.heading}
            className="font-libreBaskerville mb-8 text-3xl leading-[1.2] tracking-tight sm:text-4xl"
            style={{ color: colors.text.tertiary }}
          >
            {storyChainLandingContent.collaboration.title.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </motion.h2>

          {/* Description */}
          <motion.p
            {...scrollReveal.paragraph}
            className="mx-auto mb-20 max-w-xl font-mono text-sm leading-[1.85]"
            style={{ color: colors.text.secondaryOpacity65 }}
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
                <div
                  className="h-6 w-6 rounded-md"
                  style={{ backgroundColor: colors.text.tertiary }}
                />
                <div
                  className="h-6 w-6 rounded-md"
                  style={{ backgroundColor: colors.brand.blue }}
                />
              </div>
              <p
                className="font-mono text-xs leading-relaxed"
                style={{ color: colors.text.secondaryOpacity75 }}
              >
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
                <div
                  className="h-6 w-6 rounded-md"
                  style={{ backgroundColor: colors.brand.pink[500] }}
                />
                <div
                  className="h-6 w-6 rounded-md"
                  style={{ backgroundColor: colors.text.secondary }}
                />
              </div>
              <p
                className="font-mono text-xs leading-relaxed"
                style={{ color: colors.text.secondaryOpacity75 }}
              >
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
                <div
                  className="h-6 w-6 rounded-md"
                  style={{ backgroundColor: colors.brand.blue }}
                />
                <div
                  className="h-6 w-6 rounded-md"
                  style={{ backgroundColor: colors.brand.pink[400] }}
                />
              </div>
              <p
                className="font-mono text-xs leading-relaxed"
                style={{ color: colors.text.secondaryOpacity75 }}
              >
                Any Space App + Your Idea
                <br />
                Build against and extend anything.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= DARK CTA SECTION ================= */}
      <section className="relative z-10 py-44" style={{ backgroundColor: colors.background.dark }}>
        {/* Smooth blend transition from light section above */}
        {/* <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32"
          style={{
            background: `linear-gradient(to bottom, ${colors.background.cream}, ${colors.opacity.cream[50]}, ${colors.dark[50]}, transparent)`,
          }}
        /> */}
        {/* Subtle vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, ${colors.white[4]} 0%, transparent 50%)`,
          }}
        />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          {/* Illustration with ALL-SIDES blend */}
          <motion.div {...scrollReveal.image} className="mb-16 flex justify-center">
            <div className="relative">
              <img
                src={storyChainLandingContent.darkCta.imageUrl.url}
                alt={storyChainLandingContent.darkCta.imageUrl.alt}
                className="h-[280px] w-auto rounded-lg"
              />
              {/* Top fade */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-lg"
                style={{
                  background: `linear-gradient(to bottom, ${colors.background.dark}, ${colors.dark[75]}, transparent)`,
                }}
              />
              {/* Bottom fade */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 rounded-b-lg"
                style={{
                  background: `linear-gradient(to top, ${colors.background.dark}, ${colors.dark[75]}, transparent)`,
                }}
              />
              {/* Left fade */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-20 rounded-l-lg"
                style={{
                  background: `linear-gradient(to right, ${colors.background.dark}, ${colors.dark[75]}, transparent)`,
                }}
              />
              {/* Right fade */}
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-20 rounded-r-lg"
                style={{
                  background: `linear-gradient(to left, ${colors.background.dark}, ${colors.dark[75]}, transparent)`,
                }}
              />
              {/* Corner softening with radial gradient */}
              <div
                className="pointer-events-none absolute inset-0 rounded-lg"
                style={{
                  background: `radial-gradient(ellipse at center, transparent 40%, ${colors.dark[50]} 70%, ${colors.dark[90]} 90%)`,
                }}
              />
            </div>
          </motion.div>

          {/* Accent */}
          <motion.span
            {...scrollReveal.paragraph}
            className="font-yellowtail mb-4 block text-base"
            style={{ color: `${colors.text.darkAccent}e6` }}
          >
            {storyChainLandingContent.darkCta.eyebrow}
          </motion.span>

          {/* Title */}
          <motion.h2
            {...scrollReveal.heading}
            className="font-libreBaskerville mb-8 text-3xl leading-[1.2] tracking-tight sm:text-4xl"
            style={{ color: colors.text.light }}
          >
            {storyChainLandingContent.darkCta.title.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </motion.h2>

          {/* Description */}
          <motion.p
            {...scrollReveal.paragraph}
            className="mx-auto mb-12 max-w-xl font-mono text-sm leading-[1.85]"
            style={{ color: colors.white[50] }}
          >
            {storyChainLandingContent.darkCta.description}
          </motion.p>

          {/* CTA */}
          <motion.div {...scrollReveal.paragraph}>
            <button
              className="rounded-[6px] px-7 py-2.5 text-sm font-medium text-white shadow-lg transition-all"
              style={{
                backgroundColor: colors.brand.pink[500],
                boxShadow: `0 10px 15px -3px ${colors.brand.pink.shadow25}`,
              }}
            >
              {storyChainLandingContent.darkCta.primaryCta}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ================= FINAL VISION ================= */}
      <section
        className="relative z-10 px-6 pt-44 pb-28 text-center"
        style={{ backgroundColor: colors.background.cream }}
      >
        {/* Smooth blend transition from dark section above */}
        {/* <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{
            background: `linear-gradient(to bottom, ${colors.background.dark}, ${colors.dark[40]}, ${colors.opacity.cream[60]}, transparent)`,
          }}
        /> */}
        {/* Cloud window with ALL-SIDES blend */}
        <motion.div {...scrollReveal.image} className="mb-20 flex justify-center">
          <div className="relative h-[200px] w-[400px] overflow-hidden rounded-[100px]">
            <img
              src="/src/assets/Gemini_Generated_Image_qg7ks4qg7ks4qg7k.png"
              alt="Exploring a new frontier"
              className="h-full w-full object-cover"
            />
            {/* Top fade */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-16"
              style={{
                background: `linear-gradient(to bottom, ${colors.background.cream}, ${colors.opacity.cream[80]}, transparent)`,
              }}
            />
            {/* Bottom fade */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
              style={{
                background: `linear-gradient(to top, ${colors.background.cream}, ${colors.opacity.cream[80]}, transparent)`,
              }}
            />
            {/* Left fade */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-20"
              style={{
                background: `linear-gradient(to right, ${colors.background.cream}, ${colors.opacity.cream[80]}, transparent)`,
              }}
            />
            {/* Right fade */}
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-20"
              style={{
                background: `linear-gradient(to left, ${colors.background.cream}, ${colors.opacity.cream[80]}, transparent)`,
              }}
            />
            {/* Corner softening with radial gradient */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at center, transparent 30%, ${colors.opacity.cream[50]} 60%, ${colors.opacity.cream[90]} 85%)`,
              }}
            />
          </div>
        </motion.div>

        {/* Accent */}
        <motion.span
          {...scrollReveal.paragraph}
          className="font-yellowtail mb-4 block text-base"
          style={{ color: colors.brand.blue }}
        >
          {storyChainLandingContent.vision.eyebrow}
        </motion.span>

        {/* Title */}
        <motion.h2
          {...scrollReveal.heading}
          className="font-libreBaskerville mb-8 text-3xl leading-[1.2] tracking-tight sm:text-4xl"
          style={{ color: colors.text.tertiary }}
        >
          {storyChainLandingContent.vision.title.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </motion.h2>

        {/* Description */}
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
          {/* Brand */}
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

          {/* Dynamic sections from content */}
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

        {/* Copyright */}
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
