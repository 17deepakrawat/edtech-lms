"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

export default function FAQ({ faqs }: { faqs: FAQItem[] }) {
 

  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
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
