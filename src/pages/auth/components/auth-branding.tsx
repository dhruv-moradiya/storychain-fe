import { motion } from 'framer-motion';
import { BookOpen, GitBranch, Users, Sparkles } from 'lucide-react';

interface FeatureItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureItem = ({ icon: Icon, title, description }: FeatureItemProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-start gap-3"
  >
    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
      <Icon className="h-5 w-5 text-white/80" />
    </div>
    <div>
      <h3 className="font-medium text-white">{title}</h3>
      <p className="text-sm text-white/60">{description}</p>
    </div>
  </motion.div>
);

interface AuthBrandingProps {
  title: string;
  subtitle: string;
  description: string;
}

export function AuthBranding({ title, subtitle, description }: AuthBrandingProps) {
  return (
    <div
      className="relative hidden items-center justify-center overflow-hidden lg:flex"
      style={{
        background:
          'linear-gradient(135deg, var(--hero-gradient-from), var(--hero-gradient-via1), var(--hero-gradient-via2))',
      }}
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full opacity-20 blur-3xl"
          style={{ background: 'var(--brand-pink-500)' }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full opacity-15 blur-3xl"
          style={{ background: 'var(--brand-blue)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md px-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-2"
        >
          <div className="bg-brand-pink-500 flex h-10 w-10 items-center justify-center rounded-xl">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-white">Story Chain</span>
        </motion.div>

        {/* Tagline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-libreBaskerville mb-4 text-3xl leading-tight text-white"
        >
          {title}
          <br />
          {subtitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10 font-mono text-sm leading-relaxed text-white/70"
        >
          {description}
        </motion.p>

        {/* Features */}
        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FeatureItem
              icon={GitBranch}
              title="Branching Narratives"
              description="Create stories that split into multiple paths"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <FeatureItem
              icon={Users}
              title="Collaborative Writing"
              description="Write together with authors worldwide"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <FeatureItem
              icon={Sparkles}
              title="Community Driven"
              description="Vote and shape the direction of stories"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function MobileLogo() {
  return (
    <div className="mb-4 flex items-center justify-center gap-2 lg:hidden">
      <div className="bg-brand-pink-500 flex h-9 w-9 items-center justify-center rounded-xl">
        <BookOpen className="h-4 w-4 text-white" />
      </div>
      <span className="text-text-primary text-lg font-semibold">Story Chain</span>
    </div>
  );
}
