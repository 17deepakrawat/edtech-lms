"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

export default function FAQ({ faqs }: { faqs?: FAQItem[] }) {
  if (!Array.isArray(faqs) || faqs.length === 0) {
    return <p className="text-gray-500">No FAQs available.</p>;
  }

  return (
    <div className="w-full">
      <Accordion type="single" collapsible>
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={`item-${faq.id}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
