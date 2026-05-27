import React, { useState, useEffect } from 'react';
import { CalendarDays, ArrowRight, ShieldCheck, Milestone, MapPin, Award } from 'lucide-react';
import { SCHOOL_NAME } from '../data';
import { TRANSLATIONS } from '../translations';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
  lang: 'en' | 'ta';
}

const getHeroImages = (lang: 'en' | 'ta') => [
  {
    path: "/images/123.jpeg",
    caption: lang === 'en' 
      ? "Interactive, student-centric classrooms designed to inspire curiosity and active inquiry" 
      : "விசாரணை மற்றும் கூட்டு கற்றலை ஊக்குவிக்கும் அதிநவீன வகுப்பறைகள்"
  },
  {
    path: "/images/133.jpeg",
    caption: lang === 'en' 
      ? "World-class sports infrastructure promoting physical fitness, discipline, and teamwork" 
      : "விளையாட்டு மற்றும் உடற்திறனை மேம்படுத்தும் உலகத்தரம் வாய்ந்த விளையாட்டு மைதானங்கள்"
  },
  {
    path: "/images/134.jpeg",
    caption: lang === 'en' 
      ? "Our spectacular 25-acre green sanctuary blending nature with discovery-led learning" 
      : "இயற்கையோடு இணைந்த 25 ஏக்கர் பரந்த பசுமையான பள்ளி வளாகம்"
  }
];

export default function Hero({ onScrollToSection, lang }: HeroProps) {
  const t = TRANSLATIONS[lang];
  const heroImages = getHeroImages(lang);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section id="hero-section" className="relative bg-white pt-6 pb-20 sm:pb-28 overflow-hidden">
      {/* Decorative organic layout hints to mirror a 'Spacious Sanctuary' */}
      <div className="absolute top-0 right-0 h-96 w-96 bg-gray-50 rounded-full blur-3xl -z-10 opacity-70" />
      <div className="absolute bottom-0 left-0 h-96 w-96 bg-gold-50 rounded-full blur-3xl -z-10 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text content column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left" id="hero-text-content">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy-50 border border-navy-100 rounded-full text-navy-800 text-xs sm:text-sm font-semibold tracking-wider uppercase font-mono shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-gold-500 animate-pulse" />
              <span>{t.heroTagline}</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 tracking-tight leading-tight">
                {SCHOOL_NAME}
                <span className="block mt-2 text-[#9c1e22] font-semibold text-3xl sm:text-4xl lg:text-5xl font-sans italic leading-tight">
                  {t.heroHeadline}
                </span>
              </h1>
              <p className="font-sans text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t.heroSubheadline}
              </p>
            </div>

            {/* Crucial interactive attributes displaying transparency and trust */}
            <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start text-xs sm:text-sm font-mono text-gray-500 font-semibold">
              <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
                <MapPin className="w-4 h-4 text-gold-500" /> Cuddalore, TN
              </span>
              <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
                <Milestone className="w-4 h-4 text-gold-500" /> {lang === 'en' ? 'Established 1993' : 'நிறுவனம் 1993'}
              </span>
              <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
                <Award className="w-4 h-4 text-gold-500" /> CBSE Curriculum
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button
                onClick={() => onScrollToSection('booking-section')}
                className="w-full sm:w-auto bg-navy-800 hover:bg-navy-900 text-white hover:text-gold-400 font-heading text-base font-bold px-8 py-4.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group border border-transparent hover:border-gold-500 cursor-pointer"
                id="hero-book-cta"
              >
                <CalendarDays className="w-5 h-5 text-gold-500 group-hover:scale-110 transition-transform" />
                <span>{t.heroTourCta}</span>
                <ArrowRight className="w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onScrollToSection('experience-section')}
                className="w-full sm:w-auto bg-white border-2 border-gray-200 text-navy-800 hover:text-gold-600 hover:border-gold-500 font-heading text-base font-semibold px-8 py-4.5 rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-gray-50/75 cursor-pointer"
                id="hero-explore-cta"
              >
                <span>{t.heroExploreCta}</span>
              </button>
            </div>

            {/* Real Stats Board */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 sm:pt-8 border-t border-gray-100 text-center lg:text-left">
              <div>
                <span className="block font-heading text-3xl sm:text-4xl font-bold text-navy-950">{t.statLegacyNum}</span>
                <span className="text-xs text-gray-500 font-medium font-mono uppercase tracking-wider block mt-1">{t.statLegacyLabel}</span>
              </div>
              <div>
                <span className="block font-heading text-3xl sm:text-4xl font-bold text-[#9c1e22]">{t.statCampusNum}</span>
                <span className="text-xs text-gray-500 font-medium font-mono uppercase tracking-wider block mt-1">{t.statCampusLabel}</span>
              </div>
              <div>
                <span className="block font-heading text-3xl sm:text-4xl font-bold text-navy-950">{t.statRatioNum}</span>
                <span className="text-xs text-gray-500 font-medium font-mono uppercase tracking-wider block mt-1">{t.statRatioLabel}</span>
              </div>
              <div>
                <span className="block font-heading text-3xl sm:text-4xl font-bold text-gold-600">{t.statLeadersNum}</span>
                <span className="text-xs text-gray-500 font-medium font-mono uppercase tracking-wider block mt-1">{t.statLeadersLabel}</span>
              </div>
            </div>
          </div>

          {/* Real Campus Visuals Slider column */}
          <div className="lg:col-span-5 relative w-full flex flex-col items-center justify-center">
            {/* Aspect constraints & design framing to reflect premium feel */}
            <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(16,42,67,0.15)] border-4 border-solid border-white bg-gray-50 group transition-all duration-300">
              {heroImages.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === currentIdx ? 'opacity-100 z-10 scale-105' : 'opacity-0 z-0 scale-100'
                  }`}
                >
                  <img
                    src={img.path}
                    alt={img.caption}
                    className="w-full h-full object-cover transition-all duration-[5000ms] ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {/* Cinematic gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-900/30 to-transparent z-20" />
                </div>
              ))}

              {/* Glassmorphic Caption Card */}
              <div className="absolute bottom-4 left-4 right-4 z-30 bg-navy-900/85 backdrop-blur-md border border-white/10 p-4 rounded-2xl text-white transition-all duration-500 shadow-xl">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase font-bold">
                    Real Campus View
                  </span>
                  <span className="text-[11px] font-mono text-gray-400 font-semibold">
                    {String(currentIdx + 1).padStart(2, '0')} / {String(heroImages.length).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-sm font-sans font-medium text-gray-100 leading-snug transition-all duration-300">
                  {heroImages[currentIdx].caption}
                </p>
                {/* Visual Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 rounded-b-2xl overflow-hidden">
                  <div
                    key={currentIdx}
                    className="h-full bg-gradient-to-r from-gold-500 to-gold-600 animate-slide-progress"
                  />
                </div>
              </div>
            </div>

            {/* Slider Dots indicators */}
            <div className="flex items-center gap-3 mt-5 z-20">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className="group relative flex items-center justify-center p-2 cursor-pointer"
                  aria-label={`Go to slide ${i+1}`}
                >
                  <span className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === currentIdx ? 'bg-navy-900 w-8' : 'bg-gray-300 group-hover:bg-navy-400 w-2.5'
                  }`} />
                </button>
              ))}
            </div>

            {/* Trust and reassurance stamp to explicitly address parent concerns */}
            <div className="absolute -bottom-6 -right-2 sm:-right-4 bg-white/95 backdrop-blur-sm border border-gray-100 px-4.5 py-3 rounded-2xl shadow-xl flex items-center gap-3.5 max-w-xs z-30 transition-transform hover:scale-[1.02]">
              <div className="h-10 w-10 shrink-0 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-navy-900 leading-tight">100% Verified Legacy</p>
                <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed font-sans">
                  {t.heroLegacyDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
