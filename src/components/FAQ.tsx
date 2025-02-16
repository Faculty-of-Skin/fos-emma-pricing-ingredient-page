
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const FAQ = () => {
  const faqs = [
    {
      question: "Does this replace my booking system?",
      answer: "No, it integrates seamlessly."
    },
    {
      question: "How much does it cost?",
      answer: "Pilot is free for 30 days, then flexible pricing tiers."
    },
    {
      question: "What booking systems are supported?",
      answer: "Mindbody, Phorest, Fresha & more."
    },
    {
      question: "How does AI recommend treatments?",
      answer: "It analyzes past bookings & client preferences to suggest relevant treatments & retail products."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-spa-beige">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-spa-charcoal text-center mb-12">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="mb-12">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-spa-stone/20">
                <AccordionTrigger className="text-spa-charcoal hover:text-spa-charcoal hover:no-underline text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-spa-stone">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-spa-charcoal hover:bg-spa-stone text-white min-w-[300px]"
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfv8jr6Z5cb-URGZbI8w1-q8uHAXDxH6tTEVRXwQMl4hmvnBw/viewform', '_blank')}
            >
              Join the Waitlist – Limited Spots Available
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
