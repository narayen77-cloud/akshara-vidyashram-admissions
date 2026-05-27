import React, { useState } from 'react';
import { Menu, X, PhoneCall, CalendarDays, KeyRound, Globe } from 'lucide-react';
import { LOGO_PATH, SCHOOL_NAME } from '../data';
import { TRANSLATIONS } from '../translations';

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenAdmin: () => void;
  lang: 'en' | 'ta';
  onLangChange: (lang: 'en' | 'ta') => void;
}

export default function Navbar({ onScrollToSection, onOpenAdmin, lang, onLangChange }: NavbarProps) {
  const t = TRANSLATIONS[lang];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header id="app-header" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100/80 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Brand Layout */}
          <div 
            onClick={() => {
              onScrollToSection('hero-section');
              setIsOpen(false);
            }} 
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
          >
            <img 
              src={LOGO_PATH} 
              alt={`${SCHOOL_NAME} Official Logo`}
              className="h-12 w-12 sm:h-14 sm:w-14 object-contain transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
              id="brand-logo-img"
            />
            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-xl font-extrabold tracking-tight text-navy-800 leading-none">
                AKSHARAA
              </span>
              <span className="font-heading text-[10px] sm:text-xs font-semibold tracking-widest text-[#9c1e22] uppercase leading-none mt-1">
                VIDYAASHRAM
              </span>
              <span className="hidden xs:block text-[8px] sm:text-[9px] font-mono font-medium tracking-wider text-gray-400 uppercase leading-none mt-1">
                beyond the syllabus...
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" id="desktop-nav">
            <button 
              onClick={() => onScrollToSection('experience-section')}
              className="font-sans text-xs xl:text-sm font-semibold text-slate-600 hover:text-[#9c1e22] transition-colors cursor-pointer"
            >
              {t.navExperience}
            </button>
            <button 
              onClick={() => onScrollToSection('stages-section')}
              className="font-sans text-xs xl:text-sm font-semibold text-slate-600 hover:text-[#9c1e22] transition-colors cursor-pointer"
            >
              {t.navCurriculum}
            </button>
            <button 
              onClick={() => onScrollToSection('calculator-section')}
              className="font-sans text-xs xl:text-sm font-semibold text-slate-600 hover:text-[#9c1e22] transition-colors cursor-pointer"
            >
              {t.navEligibility}
            </button>
            <button 
              onClick={() => onScrollToSection('faq-section')}
              className="font-sans text-xs xl:text-sm font-semibold text-slate-600 hover:text-[#9c1e22] transition-colors cursor-pointer"
            >
              {t.navFaq}
            </button>
            <button 
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 font-sans text-xs font-bold text-rose-700 hover:text-rose-850 transition-colors bg-rose-50 hover:bg-rose-100/50 px-2.5 py-1.5 rounded-lg border border-rose-100/40 cursor-pointer whitespace-nowrap shadow-3xs"
              title="View Inquiries Submitted"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{t.navAdmissionsDesk}</span>
            </button>
          </nav>

          {/* Desktop Actions Block (Call, Language, and CTA) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Selector Toggle */}
            <div className="flex items-center bg-slate-50 p-1 rounded-full text-xs font-semibold font-sans border border-slate-200/50 shadow-inner">
              <button 
                onClick={() => onLangChange('en')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer text-[10px] uppercase tracking-wider ${lang === 'en' ? 'bg-navy-800 text-white shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'}`}
              >
                EN
              </button>
              <button 
                onClick={() => onLangChange('ta')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer text-[10px] uppercase tracking-wider ${lang === 'ta' ? 'bg-[#9c1e22] text-white shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'}`}
              >
                தமிழ்
              </button>
            </div>

            <a 
              href="tel:+914142227000" 
              className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-700 hover:text-[#9c1e22] transition-colors bg-slate-50/50 hover:bg-slate-100/60 px-2.5 py-2 rounded-lg border border-slate-100"
              id="hotline-link"
            >
              <PhoneCall className="w-3.5 h-3.5 text-gold-500" />
              <span>{t.navContactNumber}</span>
            </a>
            <button 
              onClick={() => onScrollToSection('booking-section')}
              className="flex items-center gap-1.5 bg-navy-800 hover:bg-navy-950 text-white hover:text-gold-400 font-heading text-xs font-semibold px-4 py-2.5 rounded-lg border border-navy-850 hover:border-gold-500 transition-all shadow-sm cursor-pointer whitespace-nowrap"
              id="navbar-cta-btn"
            >
              <CalendarDays className="w-3.5 h-3.5 text-gold-400" />
              <span>{t.navBookTour}</span>
            </button>
          </div>

          {/* Mobile/Tablet Controls Block (No duplication with desktop views) */}
          <div className="flex lg:hidden items-center gap-2.5">
            {/* Direct Switch for Mobile */}
            <button 
              onClick={() => onLangChange(lang === 'en' ? 'ta' : 'en')}
              className="flex items-center gap-1 bg-slate-50 hover:bg-slate-100 text-slate-800 text-[11px] font-bold px-2.5 py-2 rounded-lg border border-slate-200/60 cursor-pointer"
              title={lang === 'en' ? 'மாற்றவும் தமிழ்' : 'Switch to English'}
            >
              <Globe className="w-3.5 h-3.5 text-[#9c1e22]" />
              <span>{lang === 'en' ? 'தமிழ்' : 'EN'}</span>
            </button>

            <button 
              onClick={onOpenAdmin}
              className="p-2 text-rose-700 bg-rose-50 rounded-lg hover:bg-rose-100 cursor-pointer border border-rose-100/50"
              title="Admissions Desk"
            >
              <KeyRound className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-navy-800 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white" id="mobile-drawer">
          <div className="px-4 pt-2 pb-6 space-y-3">
            <button 
              onClick={() => { onScrollToSection('experience-section'); setIsOpen(false); }}
              className="block w-full text-left px-3 py-2.5 text-base font-semibold text-navy-800 hover:bg-gray-50 rounded-lg"
            >
              {t.navExperience}
            </button>
            <button 
              onClick={() => { onScrollToSection('stages-section'); setIsOpen(false); }}
              className="block w-full text-left px-3 py-2.5 text-base font-semibold text-navy-800 hover:bg-gray-50 rounded-lg"
            >
              {t.navCurriculum}
            </button>
            <button 
              onClick={() => { onScrollToSection('calculator-section'); setIsOpen(false); }}
              className="block w-full text-left px-3 py-2.5 text-base font-semibold text-navy-800 hover:bg-gray-50 rounded-lg"
            >
              {t.navEligibility}
            </button>
            <button 
              onClick={() => { onScrollToSection('faq-section'); setIsOpen(false); }}
              className="block w-full text-left px-3 py-2.5 text-base font-semibold text-navy-800 hover:bg-gray-50 rounded-lg"
            >
              {t.navFaq}
            </button>
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <a 
                href="tel:+914142227000" 
                className="flex items-center gap-3 px-3 py-2.5 font-mono text-base font-semibold text-navy-800 rounded-lg bg-gray-50"
              >
                <PhoneCall className="w-5 h-5 text-gold-500" />
                <span>{t.navContactNumber}</span>
              </a>
              <button 
                onClick={() => { onScrollToSection('booking-section'); setIsOpen(false); }}
                className="flex items-center justify-center gap-2 w-full bg-navy-800 text-white font-heading text-base font-bold py-3 px-4 rounded-lg shadow-sm"
              >
                <CalendarDays className="w-5 h-5 text-gold-500" />
                {t.navBookTour}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
