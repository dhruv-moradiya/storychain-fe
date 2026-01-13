import { HowToUseHero } from './components/how-to-use-hero';
import { GettingStarted } from './components/getting-started';
import { FeatureSection } from './components/feature-section';
import { ProTips } from './components/pro-tips';
import { CTASection } from './components/cta-section';
import { gettingStartedSteps, sections, proTips } from './how-to-use.data';

export default function HowToUsePage() {
  return (
    <div className="bg-bg-cream min-h-screen">
      <HowToUseHero />
      <GettingStarted steps={gettingStartedSteps} />

      {sections.map((section, index) => (
        <FeatureSection key={section.id} section={section} index={index} />
      ))}

      <ProTips tips={proTips} />
      <CTASection />
    </div>
  );
}
