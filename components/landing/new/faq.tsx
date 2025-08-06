import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export const faqData = [
  {
    id: "item-1",
    question: "Who can use ViewUs?",
    answer: "Any business wanting to showcase customer testimonials.",
  },
  {
    id: "item-2",
    question: "How does it work?",
    answer:
      "You share a link with customers, they either submit text review or upload video, and you embed them on your site.",
  },
  {
    id: "item-3",
    question: "How do I embed testimonials?",
    answer:
      "Copy the embed code from your dashboard and paste it into your website.",
  },
  {
    id: "item-4",
    question: "Can I customize the widget?",
    answer: "Yes, you can match the widget to your brand's look.",
  },
  {
    id: "item-5",
    question: "Is it easy to use?",
    answer: "Absolutely! No coding skills are required.",
  },
  {
    id: "item-6",
    question: "Is it easy to use?",
    answer: "Absolutely! No coding skills are required.",
  },
  {
    id: "item-7",
    question: "Is it easy to use?",
    answer: "Absolutely! No coding skills are required.",
  },
  {
    id: "item-8",
    question: "Is it easy to use?",
    answer: "Absolutely! No coding skills are required.",
  },
];

export const Faq = () => {
  return (
    <div className="min-h-[30rem] flex md:flex-row flex-col my-24 w-full gap-10 md:gap-0 max-h-fit p-4 ">
      <div className="flex md:sticky top-4 gap-2 h-fit  items-center md:items-start flex-col w-full md:w-3/4 ">
        <Badge>FAQs</Badge>
        <h1 className="text-4xl md:text-4xl lg:text-5xl text-center  md:text-left font-semibold leading-tight text-balance max-w-2xl font-primary">
          You got questions? We got{" "}
          <span className="border-x-2 text-left border-primary px-1 py-px bg-gradient-to-r from-primary/30 via-transparent to-primary/30">
            answers
          </span>{" "}
        </h1>
      </div>
      <div className="md:w-2/3 bg-white p-4 rounded-2xl">
        <Accordion type="single" collapsible className="">
          {faqData.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border bg-muted px-4 mb-3 rounded-2xl"
            >
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
