import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, HelpCircle } from 'lucide-react';
import { Link } from 'react-router';

export function CTASection() {
  return (
    <section className="bg-cream-95 px-6 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <div className="border-border/50 rounded-2xl border bg-white/50 p-8">
          <h2 className="font-libreBaskerville text-text-tertiary mb-4 text-2xl tracking-tight sm:text-3xl">
            Ready to Start Your Story?
          </h2>
          <p className="text-text-secondary-65 mx-auto mb-8 max-w-xl text-sm leading-relaxed">
            Join thousands of writers creating interactive stories on StoryChain. Start for free and
            upgrade when you're ready.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild className="bg-brand-pink-500 hover:bg-brand-pink-600 gap-2 text-white">
              <Link to="/dashboard">
                <BookOpen className="h-4 w-4" />
                Start Writing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/pricing">
                <HelpCircle className="h-4 w-4" />
                View Pricing
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
