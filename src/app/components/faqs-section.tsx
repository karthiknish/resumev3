"use client";

import { motion } from "framer-motion";
import { FAQsDataType } from "@/lib/definitions";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqsData: FAQsDataType[] = [
  {
    id: 1,
    question: 'What technologies do you specialize in?',
    answer:
      'I specialize in modern web technologies including React, Next.js, TypeScript, and Node.js. I also have extensive experience with analytics implementation using tools like Google Analytics and custom tracking solutions. My full-stack expertise allows me to build complete, scalable applications from frontend to backend.',
  },
  {
    id: 2,
    question: 'How do you approach new projects?',
    answer:
      'I begin each project by thoroughly understanding the business requirements and user needs. Then, I create a detailed technical plan that outlines the architecture, technology stack, and implementation strategy. Throughout development, I maintain clear communication and ensure all decisions are data-driven.',
  },
  {
    id: 3,
    question: 'Can you help with analytics implementation?',
    answer:
      'Absolutely! Analytics implementation is one of my core strengths. I can help set up comprehensive tracking systems, create custom dashboards, and implement data collection strategies that provide actionable insights for your business. This includes both standard analytics tools and custom solutions.',
  },
  {
    id: 4,
    question: 'Do you provide ongoing maintenance and support?',
    answer:
      'Yes, I offer ongoing maintenance and support services to ensure your application continues to perform optimally. This includes regular updates, performance optimization, bug fixes, and implementing new features as your business needs evolve.',
  },
  {
    id: 5,
    question: 'How do you ensure project success?',
    answer:
      'I ensure project success through a combination of technical expertise, clear communication, and data-driven decision making. I use agile methodologies, maintain regular check-ins, and provide detailed documentation. Performance metrics and user feedback guide continuous improvements.',
  },
]

export default function FAQsSection() {
  return (
    <section className="bg-gradient-to-b from-[#5D2CAB] to-black py-[72px] text-white sm:py-24">
      <div className="container mx-auto">
        <motion.h2
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-5xl font-bold tracking-tight"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="mx-auto mt-12 max-w-4xl">
          <Accordion type="single" collapsible className="w-full">
            {faqsData.map((item) => (
              <AccordionItem
                value={`item-${item.id}`}
                key={item.id}
                className="border-white/30"
              >
                <AccordionTrigger className="sm:text-md text-left text-sm hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}