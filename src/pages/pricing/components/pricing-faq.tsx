import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle, MessageCircle, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { scrollReveal } from '@/lib/utils';
import type { FAQ } from '../pricing.types';

interface PricingFAQProps {
  faqs: FAQ[];
}

export function PricingFAQ({ faqs }: PricingFAQProps) {
  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <motion.div
            {...scrollReveal.paragraph}
            className="border-brand-pink-500/20 bg-brand-pink-500/5 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
          >
            <HelpCircle className="text-brand-pink-500 h-4 w-4" />
            <span className="text-brand-pink-500 text-sm font-medium">Got questions?</span>
          </motion.div>
          <motion.h2
            {...scrollReveal.heading}
            className="font-libreBaskerville text-text-tertiary text-2xl tracking-tight sm:text-3xl"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <motion.div
          {...scrollReveal.card(0)}
          className="border-border/50 bg-cream-95 hover:border-brand-pink-500/20 rounded-2xl border p-6 transition-all"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border-border/30 border-b last:border-b-0"
              >
                <AccordionTrigger className="text-text-primary group py-4 text-left text-sm font-medium hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="bg-brand-pink-500/10 group-hover:bg-brand-pink-500/20 flex h-7 w-7 items-center justify-center rounded-lg transition-colors">
                      <HelpCircle className="text-brand-pink-500 h-4 w-4" />
                    </div>
                    <span className="group-hover:text-brand-pink-500 transition-colors">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-text-secondary-65 pb-4 pl-10 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Still have questions? */}
        <motion.div
          {...scrollReveal.card(1)}
          whileHover={{ y: -2 }}
          className="border-border/50 from-brand-pink-500/5 to-brand-blue/5 mt-10 rounded-2xl border bg-gradient-to-br p-8 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-brand-pink-500/10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
          >
            <Mail className="text-brand-pink-500 h-7 w-7" />
          </motion.div>
          <h3 className="text-text-primary mb-2 text-lg font-semibold">Still have questions?</h3>
          <p className="text-text-secondary-65 mb-6 text-sm">
            Can't find the answer you're looking for? Our support team is here to help!
          </p>
          <Button className="bg-brand-pink-500 hover:bg-brand-pink-600 gap-2 text-white">
            <MessageCircle className="h-4 w-4" />
            Contact Support
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
