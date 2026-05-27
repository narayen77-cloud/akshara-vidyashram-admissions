import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../data';

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("f1");

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-20 bg-gray-50/50 border-t border-gray-150">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-mono font-bold tracking-widest text-gold-600 uppercase block">Inquiries Desk</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-500">
            Clear, transparent answers to help parent visitors make informed enrollment decisions.
          </p>
        </div>

        {/* FAQs list accordion */}
        <div className="space-y-4 font-sans text-left" id="faq-accordion-container">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id}
                className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-2xs hover:shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-navy-900 group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-2.5">
                    <HelpCircle className="w-5 h-5 text-gold-500 shrink-0" />
                    <span className="group-hover:text-gold-600 transition-colors">{faq.question}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gold-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-300 group-hover:text-gray-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 font-sans text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 animate-slideDown">
                    <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                      <p>{faq.answer}</p>
                      
                      {/* Categorization tag banner */}
                      <span className="inline-block mt-3.5 px-2.5 py-1 bg-navy-50 text-navy-800 text-[10px] uppercase font-mono font-semibold tracking-wider rounded-md">
                        Topic: {faq.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
