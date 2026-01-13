import { Lightbulb } from 'lucide-react';

interface ProTip {
  title: string;
  description: string;
}

interface ProTipsProps {
  tips: ProTip[];
}

export function ProTips({ tips }: ProTipsProps) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <span className="font-yellowtail text-brand-orange mb-2 block text-lg">
            Expert advice
          </span>
          <h2 className="font-libreBaskerville text-text-tertiary text-2xl tracking-tight sm:text-3xl">
            Pro Tips for Success
          </h2>
        </div>

        <div className="border-border/50 bg-cream-95 rounded-2xl border p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="group flex gap-4 rounded-xl bg-white/50 p-4 transition-all hover:bg-white hover:shadow-sm"
              >
                <div className="bg-brand-orange/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                  <Lightbulb className="text-brand-orange h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-text-primary mb-1 font-semibold">{tip.title}</h3>
                  <p className="text-text-secondary-65 text-sm leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
