import React from 'react';
import { Phone, MessageSquare, Edit3 } from 'lucide-react';

interface StickyBottomCTAProps {
  lang: 'en' | 'ta';
  onScrollToSection: (sectionId: string) => void;
}

export default function StickyBottomCTA({ lang, onScrollToSection }: StickyBottomCTAProps) {
  const phoneUrn = "tel:+914142227000";
  // Authentic WhatsApp message seeking admissions walk-in schedules to direct campaign number
  const whatsappUrl = "https://wa.me/918925693013?text=Hello%2C%20I%20am%20interested%20in%20Akshara%20Vidyaashram%20admissions.%20Please%20share%20details.";

  const labelCall = lang === 'en' ? 'Call Now' : 'அழைக்க';
  const labelWhatsapp = lang === 'en' ? 'WhatsApp Us' : 'வாட்ஸ்அப்';
  const labelEnquire = lang === 'en' ? 'Enquire Now' : 'விசாரிக்க';

  return (
    <div 
      className="fixed bottom-0 inset-x-0 z-45 bg-white border-t border-gray-200 shadow-[0_-5px_20px_rgba(0,0,0,0.08)] flex items-stretch divide-x divide-gray-150 h-16 sm:hidden"
      id="mobile-sticky-dock"
    >
      {/* 1. Direct Hotline Call Option */}
      <a 
        href={phoneUrn}
        className="flex-1 flex flex-col items-center justify-center gap-1 hover:bg-gray-50 active:bg-gray-100 transition-colors text-navy-800"
        id="sticky-hotline-option"
      >
        <Phone className="w-5 h-5 text-gold-500" />
        <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-gray-500 leading-none">
          {labelCall}
        </span>
      </a>

      {/* 2. Chat on Whatsapp Option */}
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center gap-1 hover:bg-gray-50 active:bg-gray-100 transition-colors text-green-700"
        id="sticky-whatsapp-option"
      >
        <MessageSquare className="w-5 h-5 text-green-500 fill-current" />
        <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-gray-500 leading-none">
          {labelWhatsapp}
        </span>
      </a>

      {/* 3. High Conversion Scroll to Enquiry Form */}
      <button 
        onClick={() => onScrollToSection('booking-section')}
        className="flex-1 flex flex-col items-center justify-center gap-1 bg-[#9c1e22] text-white hover:bg-red-900 active:bg-red-950 transition-colors cursor-pointer"
        id="sticky-enquiry-option"
      >
        <Edit3 className="w-5 h-5 text-gold-400" />
        <span className="text-[10px] font-sans font-bold tracking-wider uppercase leading-none text-white">
          {labelEnquire}
        </span>
      </button>
    </div>
  );
}
