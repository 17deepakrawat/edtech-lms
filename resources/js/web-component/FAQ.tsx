"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItem = {
  question: string;
  answer: string;
};

// Decode HTML safely
const decodeHtml = (html: string) => {
  try {
    const decoded = html.replace(/\\\//g, '/');
    const parser = new DOMParser();
    const doc = parser.parseFromString(decoded, "text/html");
    return doc.body.innerHTML;
  } catch (e) {
    return html;
  }
};

export default function FAQ({ faqs }: { faqs?: FAQItem[] | string }) {
  // 🔐 Ensure `faqs` is an array
  let parsedFaqs: FAQItem[] = [];

  try {
    if (typeof faqs === "string") {
      parsedFaqs = JSON.parse(faqs);
    } else if (Array.isArray(faqs)) {
      parsedFaqs = faqs;
    }
  } catch (error) {
    console.error("Failed to parse FAQs:", error);
  }

  if (!parsedFaqs || parsedFaqs.length === 0) {
    return <p className="text-gray-500">No FAQs available.</p>;
  }

  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="space-y-2">
        {parsedFaqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(faq.answer),
                }}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
