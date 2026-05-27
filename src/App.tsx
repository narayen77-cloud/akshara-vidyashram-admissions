import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DirectLeadForm from './components/DirectLeadForm';
import AboutAndWhyChoose from './components/AboutAndWhyChoose';
import AdmissionFlyers from './components/AdmissionFlyers';
import InteractiveGallery from './components/InteractiveGallery';
import EducationalStages from './components/EducationalStages';
import AgeEligibilityCalculator from './components/AgeEligibilityCalculator';
import EnquiryForm from './components/EnquiryForm';
import StickyBottomCTA from './components/StickyBottomCTA';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import AICounselor from './components/AICounselor';
import AdminPanel from './components/AdminPanel';
import AnalyticsAndMetaPixel from './components/AnalyticsAndMetaPixel';

export default function App() {
  const [lang, setLang] = useState<'en' | 'ta'>('en');
  const [prefilledGrade, setPrefilledGrade] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleEligibleGradeSelected = (grade: string) => {
    setPrefilledGrade(grade);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-gold-500 selection:text-navy-900 scroll-smooth pb-16 sm:pb-0">
      {/* Google Analytics & Meta Pixel Tracker script emulation */}
      <AnalyticsAndMetaPixel />

      {/* Header bar layout */}
      <Navbar 
        onScrollToSection={handleScrollToSection} 
        onOpenAdmin={() => setIsAdminOpen(true)}
        lang={lang}
        onLangChange={setLang}
      />

      <main id="main-content">
        {/* Real Campus Visuals Hero banner with stats elements */}
        <Hero onScrollToSection={handleScrollToSection} lang={lang} />

        {/* Premium admission enquiry direct campaign lead form */}
        <DirectLeadForm lang={lang} />

        {/* Why Choose and About Akshara Trust Sections */}
        <AboutAndWhyChoose lang={lang} />

        {/* Direct Admissions Visual Posters section */}
        <AdmissionFlyers lang={lang} onScrollToSection={handleScrollToSection} />

        {/* Specialized Facilities selector & pedagogical content */}
        <InteractiveGallery onScrollToSection={handleScrollToSection} />

        {/* Educational divisions (Curricular divisions) */}
        <EducationalStages />

        {/* Core Conversion widgets section */}
        <div className="py-20 bg-[#f9fafb] border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            
            {/* Admissions Banner Header */}
            <div className="max-w-2xl mx-auto space-y-4">
              <span className="text-sm font-mono font-bold tracking-widest text-[#9c1e22] uppercase block">Start Journey Here</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
                Two Steps to Campus Enrollment
              </h2>
              <div className="h-1 w-16 bg-gold-500 mx-auto rounded-full" />
              <p className="font-sans text-xs sm:text-sm text-gray-500">
                Determine your statutory grade pathway using our <strong>Age eligibility evaluator</strong>, then proceed directly to schedule your custom physical walkthrough ticket below.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              
              {/* Step 1: Age Eli Widget */}
              <div className="space-y-4">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-navy-800 text-gold-400 font-mono text-sm font-black">1</span>
                <p className="text-sm font-mono uppercase tracking-wider text-gray-500 font-bold">Check Academic Grade Stage</p>
                <AgeEligibilityCalculator onEligibleGradeSelected={handleEligibleGradeSelected} />
              </div>

              {/* Showcase graphic representation of 1993 statutory reliability */}
              <div className="space-y-4 flex flex-col justify-between h-full bg-white border border-gray-150 p-6 sm:p-8 rounded-2xl shadow-xl lg:min-h-[460px] text-left">
                <div className="space-y-5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-navy-800 text-gold-400 font-mono text-sm font-black">2</span>
                  <p className="text-sm font-mono uppercase tracking-wider text-gray-500 font-bold">The Aksharaa Admissions Advantage</p>
                  <h3 className="font-heading text-2xl font-bold text-navy-900 leading-snug">
                    Securing Admissions Offline with Zero Friction
                  </h3>
                  <div className="h-0.5 w-12 bg-[#9c1e22]" />
                  <p className="font-sans text-sm text-gray-650 leading-relaxed">
                    By scheduling a walkthrough slot, your physical entry passes are fully prepared. During the visit, parents attend a structured educational counseling session under our canopy assembly structures, while children perform sensory and motor skills evaluations under trusted supervisors.
                  </p>
                  
                  {/* High contrast point list */}
                  <div className="space-y-3 pt-4">
                    <p className="text-xs font-semibold text-navy-950 uppercase tracking-wider font-mono">Walkthrough inclusions:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 bg-[#9c1e22] rounded-full" />
                        <span>Interactive swimming session review</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 bg-[#9c1e22] rounded-full" />
                        <span>Archery court demonstration play</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 bg-[#9c1e22] rounded-full" />
                        <span>Classroom seating ergonomic inspects</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 bg-[#9c1e22] rounded-full" />
                        <span>Curricular and syllabus fee lists</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-100 mt-6 text-center sm:text-left">
                  <button 
                    onClick={() => handleScrollToSection('booking-section')}
                    className="inline-flex bg-[#9c1e22] hover:bg-red-800 text-white font-heading text-xs font-extrabold px-6 py-3.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Proceed to Reserve Spot Now
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Multi-step high-conversion scheduler / lead capturer */}
        <EnquiryForm prefilledGrade={prefilledGrade} lang={lang} />

        {/* FAQs */}
        <FaqSection />
      </main>

      {/* Footer bar */}
      <Footer onScrollToSection={handleScrollToSection} />

      {/* Persistent Mobile Sticky Dock */}
      <StickyBottomCTA lang={lang} onScrollToSection={handleScrollToSection} />

      {/* Floating dynamic Gemini admissions assistant */}
      <AICounselor onScrollToSection={handleScrollToSection} />

      {/* Admin dashboard Console Workspace modal */}
      {isAdminOpen && (
        <AdminPanel onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
}
