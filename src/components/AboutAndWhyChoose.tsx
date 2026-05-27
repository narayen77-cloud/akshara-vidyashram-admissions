import React from 'react';
import { TRANSLATIONS } from '../translations';
import { Shield, Sparkles, Award, Heart, CheckCircle2 } from 'lucide-react';

interface AboutAndWhyChooseProps {
  lang: 'en' | 'ta';
}

export default function AboutAndWhyChoose({ lang }: AboutAndWhyChooseProps) {
  const t = TRANSLATIONS[lang];

  // Map representation for icons
  const iconList = [
    <Heart className="w-8 h-8 text-rose-600" />,
    <Award className="w-8 h-8 text-gold-500" />,
    <Shield className="w-8 h-8 text-green-600" />,
    <Sparkles className="w-8 h-8 text-[#9c1e22]" />,
    <CheckCircle2 className="w-8 h-8 text-blue-600" />
  ];

  return (
    <section id="about-and-why-sections" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* About Section */}
        <div id="about-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-4 border-solid border-white shadow-2xl aspect-square">
              <img 
                src="/images/125.jpeg" 
                alt="Akshara Vidyaashram Assembly Courtyard Layout" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-xs font-mono text-gold-400 font-bold uppercase tracking-widest">Est. 1993</p>
                  <p className="font-heading text-lg font-bold">25-Acres of Psychological Safety</p>
                </div>
              </div>
            </div>
            {/* Soft background shape */}
            <div className="absolute -bottom-6 -left-6 h-48 w-48 bg-gray-50 rounded-full blur-2xl -z-10" />
          </div>

          <div className="lg:col-span-7 space-y-6" id="about-text">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#9c1e22]/10 text-[#9c1e22] text-xs font-semibold uppercase tracking-wider font-mono rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.aboutHeaderTag}</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight leading-tight">
              {t.aboutHeaderTitle}
            </h2>
            <div className="h-1 w-20 bg-gold-500 rounded-full" />
            <p className="font-sans text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              {t.aboutDescription}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm font-semibold text-navy-800">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span>CBSE Syllabus Registered</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span>Regulated 1:15 Mentorship Ratio</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span>Olympic-Sized Swimming Complex</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span>No simulated or Stock imagery used</span>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Section (5 Cards Layout) */}
        <div id="why-choose-section" className="space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-sm font-mono font-bold tracking-widest text-[#9c1e22] uppercase block">
              {lang === 'en' ? 'Core Institution Values' : 'முன்னணி மாண்புகள்'}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
              {t.whyChooseTitle}
            </h2>
            <div className="h-1 w-16 bg-gold-500 mx-auto rounded-full" />
            <p className="font-sans text-sm sm:text-base text-gray-500">
              {t.whyChooseSub}
            </p>
          </div>

          {/* 5-Column/Grid Card Layout designed purposefully */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {t.whyCards.map((card, idx) => (
              <div 
                key={idx}
                className="bg-gray-50 border border-gray-150 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:bg-white hover:shadow-xl hover:border-gold-400 group cursor-default"
              >
                <div className="space-y-5">
                  <div className="h-16 w-16 rounded-2xl bg-white shadow-2xs border border-gray-100 flex items-center justify-center transition-transform group-hover:scale-105">
                    {iconList[idx] || <Sparkles className="w-8 h-8 text-gold-500" />}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-heading text-base font-bold text-navy-900 group-hover:text-[#9c1e22] transition-colors leading-snug">
                      {card.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>
                </div>
                {/* Visual link/card indicator */}
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs text-navy-800 font-mono font-semibold">
                  <span>Pillar #0{idx + 1}</span>
                  <span className="h-1.5 w-1.5 bg-[#9c1e22] rounded-full group-hover:w-8 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
