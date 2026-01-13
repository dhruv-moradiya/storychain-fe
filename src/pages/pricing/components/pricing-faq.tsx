import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle, MessageCircle } from 'lucide-react';
import type { FAQ } from '../pricing.types';

interface PricingFAQProps {
  faqs: FAQ[];
}

export function PricingFAQ({ faqs }: PricingFAQProps) {
  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <span className="font-yellowtail text-brand-pink-500 mb-2 block text-lg">
            Got questions?
          </span>
          <h2 className="font-libreBaskerville text-text-tertiary text-2xl tracking-tight sm:text-3xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="border-border/50 bg-cream-95 rounded-2xl border p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border-border/30 border-b last:border-b-0"
              >
                <AccordionTrigger className="text-text-primary py-4 text-left text-sm font-medium hover:no-underline">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="text-brand-pink-500 h-4 w-4 flex-shrink-0" />
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-text-secondary-65 pb-4 pl-6 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Still have questions? */}
        <div className="mt-8 text-center">
          <p className="text-text-secondary-65 mb-4 text-sm">
            Still have questions? We're here to help!
          </p>
          <Button variant="outline" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
}
