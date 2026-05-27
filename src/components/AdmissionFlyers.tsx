import React from 'react';
import { TRANSLATIONS } from '../translations';
import { ShieldCheck, Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { LOGO_PATH } from '../data';

interface AdmissionFlyersProps {
  lang: 'en' | 'ta';
  onScrollToSection: (sectionId: string) => void;
}

export default function AdmissionFlyers({ lang, onScrollToSection }: AdmissionFlyersProps) {
  const t = TRANSLATIONS[lang];

  return (
    <section id="flyers-section" className="py-20 bg-[#f9fafb] border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#9c1e22] block">
            {t.flyersTag}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
            {t.flyersTitle}
          </h2>
          <div className="h-1 w-16 bg-gold-400 mx-auto rounded-full" />
          <p className="font-sans text-sm sm:text-base text-gray-500">
            {t.flyersSub}
          </p>
        </div>

        {/* Two Interactive Premium Flyers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Flyer 1 */}
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative group overflow-hidden">
            <span className="absolute top-4 right-4 bg-navy-800 text-gold-400 font-mono text-[9px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
              {lang === 'en' ? 'Core Program 1' : 'இலக்கு 1'}
            </span>
            
            <div className="space-y-6">
              {/* Branding Header inside flyer */}
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="h-12 w-12 rounded-xl bg-navy-50 overflow-hidden flex items-center justify-center">
                  <img src={LOGO_PATH} alt="Aksharaa Logo" className="h-10 w-auto object-contain" referrerPolicy="no-referrer" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">{lang === 'en' ? 'Admissions Open 2026-27' : 'சேர்க்கை விவரம்'}</h4>
                  <p className="font-sans text-sm font-black text-navy-900">{t.flyer1Title}</p>
                </div>
              </div>

              {/* Photo Area with visual caption */}
              <div className="relative rounded-2xl overflow-hidden aspect-16/10 bg-gray-150">
                <img 
                  src="/images/126.jpeg" 
                  alt="Academic Courtyard assembly" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white px-2.5 py-1 text-[10px] font-mono rounded-md">
                  {lang === 'en' ? 'Assembly Courtyard Area' : 'வளாக வழிபாட்டு இடம்'}
                </div>
              </div>

              {/* Text content details */}
              <div className="space-y-3 text-left">
                <span className="inline-block bg-[#9c1e22]/10 text-[#9c1e22] text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm">
                  {t.flyer1Tag}
                </span>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  {t.flyer1Desc}
                </p>
                
                {/* Specific bullets inside flyer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-navy-950 pt-2">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{lang === 'en' ? 'KG to Grade 10 CBSE' : 'கேஜி முதல் 10 வரை'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{lang === 'en' ? 'Smart Audio-Visual classes' : 'நவீன வகுப்பறைகள்'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{lang === 'en' ? 'Olympic Pool training' : 'நீச்சல் பயிற்சி'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{lang === 'en' ? 'Full scale science lab' : 'அறிவியல் ஆய்வகம்'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom action block / QR Code frame within the flyer */}
            <div className="pt-6 mt-6 border-t border-gray-150 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
              <div className="flex items-center gap-3">
                {/* Mock QR code container matching authentic look */}
                <div className="h-14 w-14 shrink-0 bg-gray-50 border-2 border-navy-800 p-1 flex flex-col justify-between">
                  <div className="flex justify-between h-4">
                    <div className="w-3.5 h-3.5 bg-navy-950" />
                    <div className="w-3.5 h-3.5 bg-navy-950" />
                  </div>
                  <div className="text-[6px] font-mono font-black text-center text-navy-800">SCAN</div>
                  <div className="flex justify-between h-4">
                    <div className="w-3.5 h-3.5 bg-navy-950" />
                    <div className="w-3.5 h-1.5 bg-navy-950 mt-2" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-wider font-extrabold text-navy-800 uppercase">{lang === 'en' ? 'Instant Access' : 'உடனடி விபரம்'}</p>
                  <p className="text-xs text-gray-500 leading-tight">{lang === 'en' ? 'Scan to request brochure' : 'கையேட்டைப் பெற ஸ்கேன் செய்க'}</p>
                </div>
              </div>
              <button 
                onClick={() => onScrollToSection('booking-section')}
                className="w-full sm:w-auto bg-navy-800 hover:bg-navy-900 text-white font-heading text-xs font-extrabold px-5 py-3 rounded-xl transition-colors cursor-pointer text-center"
              >
                {t.flyerCtaBtn}
              </button>
            </div>
          </div>

          {/* Flyer 2 */}
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative group overflow-hidden">
            <span className="absolute top-4 right-4 bg-navy-800 text-gold-400 font-mono text-[9px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
              {lang === 'en' ? 'Core Program 2' : 'இலக்கு 2'}
            </span>

            <div className="space-y-6">
              {/* Branding Header inside flyer */}
              <div className="flex items-center gap-3 border-b border-b-gray-100 pb-4">
                <div className="h-12 w-12 rounded-xl bg-[#9c1e22]/5 overflow-hidden flex items-center justify-center">
                  <img src={LOGO_PATH} alt="Aksharaa Logo" className="h-10 w-auto object-contain" referrerPolicy="no-referrer" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">{lang === 'en' ? 'Sports & Care Cores' : 'விளையாட்டு & பாதுகாப்பு'}</h4>
                  <p className="font-sans text-sm font-black text-navy-900">{t.flyer2Title}</p>
                </div>
              </div>

              {/* Photo Area with visual caption */}
              <div className="relative rounded-2xl overflow-hidden aspect-16/10 bg-gray-150">
                <img 
                  src="/images/127.jpeg" 
                  alt="Sports and eco classes pool" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white px-2.5 py-1 text-[10px] font-mono rounded-md">
                  {lang === 'en' ? 'Olympic-sized Swimming Arena' : 'சர்வதேச நீச்சல் விளையாட்டரங்கு'}
                </div>
              </div>

              {/* Text content details */}
              <div className="space-y-3 text-left">
                <span className="inline-block bg-gold-500/10 text-gold-700 text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm">
                  {t.flyer2Tag}
                </span>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  {t.flyer2Desc}
                </p>

                {/* Specific bullets inside flyer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-navy-950 pt-2">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{t.flyerPromoItem1}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{t.flyerPromoItem2}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{t.flyerPromoItem3}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{t.flyerPromoItem4}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom action block / QR Code frame within the flyer */}
            <div className="pt-6 mt-6 border-t border-gray-150 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
              <div className="flex items-center gap-3">
                {/* Mock QR code container matching authentic look */}
                <div className="h-14 w-14 shrink-0 bg-gray-50 border-2 border-navy-800 p-1 flex flex-col justify-between">
                  <div className="flex justify-between h-4">
                    <div className="w-3.5 h-3.5 bg-navy-950" />
                    <div className="w-3.5 h-3.5 bg-navy-950" />
                  </div>
                  <div className="text-[6px] font-mono font-black text-center text-navy-800">SCAN</div>
                  <div className="flex justify-between h-4">
                    <div className="w-3.5 h-3.5 bg-navy-950" />
                    <div className="w-3.5 h-1.5 bg-navy-950 mt-2" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-wider font-extrabold text-navy-800 uppercase">{lang === 'en' ? 'Verified Campus' : 'அங்கீகரிக்கப்பட்டது'}</p>
                  <p className="text-xs text-gray-500 leading-tight">{lang === 'en' ? 'Scan to view virtual layout' : 'மெய்நிகர் கையேட்டைப் பார்க்கவும்'}</p>
                </div>
              </div>
              <button 
                onClick={() => onScrollToSection('booking-section')}
                className="w-full sm:w-auto bg-navy-800 hover:bg-navy-900 text-white font-heading text-xs font-extrabold px-5 py-3 rounded-xl transition-colors cursor-pointer text-center"
              >
                {t.flyerCtaBtn}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
