import React, { useState } from 'react';
import { Sparkles, ArrowRight, Activity, BookOpen, Layers, GraduationCap } from 'lucide-react';
import { FACILITIES } from '../data';
import { Facility } from '../types';

interface InteractiveGalleryProps {
  onScrollToSection: (sectionId: string) => void;
}

const CATEGORIES = [
  { id: 'All', icon: Sparkles },
  { id: 'Academics', icon: BookOpen },
  { id: 'Sports', icon: Activity },
  { id: 'Primary / Kindergarten', icon: GraduationCap },
  { id: 'Infrastructure', icon: Layers }
] as const;

export default function InteractiveGallery({ onScrollToSection }: InteractiveGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]['id']>('All');
  const [activeFacility, setActiveFacility] = useState<Facility>(FACILITIES[0]);

  const filteredFacilities = selectedCategory === 'All'
    ? FACILITIES
    : FACILITIES.filter(f => f.category === selectedCategory);

  return (
    <section id="experience-section" className="py-20 bg-gray-50/70 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with high-contrast elegant layouts */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14" id="gallery-header">
          <span className="text-sm font-mono font-bold tracking-widest text-gold-600 uppercase block">The 25-Acre Sanctuary</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight">
            Explore Our Specialized Environments
          </h2>
          <div className="h-1 w-20 bg-[#9c1e22] mx-auto rounded-full" />
          <p className="font-sans text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Review actual photography from Cuddalore's ultimate educational ecosystem. Every single component in this gallery operates physically inside our private campus grounds.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10" id="gallery-categories-tab">
          {CATEGORIES.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedCategory(tab.id);
                  const list = tab.id === 'All' ? FACILITIES : FACILITIES.filter(f => f.category === tab.id);
                  if (list.length > 0) setActiveFacility(list[0]);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-heading font-semibold transition-all shadow-2xs border cursor-pointer ${
                  isActive 
                    ? 'bg-navy-800 border-navy-800 text-white hover:text-gold-400' 
                    : 'bg-white border-gray-200 text-gray-600 hover:text-navy-800 hover:border-gray-300'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-gray-400'}`} />
                <span>{tab.id}</span>
              </button>
            );
          })}
        </div>

        {/* Multi-tier interactive split screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start" id="gallery-interactive-split">
          
          {/* Sidebar selector matching selected tab */}
          <div className="lg:col-span-4 space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
            <p className="text-xs font-mono text-gray-400 uppercase tracking-wider pl-1 mb-2">Available Facilities ({filteredFacilities.length})</p>
            {filteredFacilities.map((facility) => {
              const isActive = activeFacility.id === facility.id;
              return (
                <button
                  key={facility.id}
                  onClick={() => setActiveFacility(facility)}
                  className={`w-full text-left p-4.5 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? 'bg-white border-gold-500 shadow-md ring-2 ring-gold-200'
                      : 'bg-white/80 border-gray-100 hover:border-gray-200 hover:bg-white hover:shadow-xs'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gold-600">
                      {facility.category}
                    </span>
                    <h3 className={`font-heading text-sm sm:text-base font-bold transition-colors ${
                      isActive ? 'text-[#9c1e22]' : 'text-navy-800 group-hover:text-[#9c1e22]'
                    }`}>
                      {facility.title}
                    </h3>
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive ? 'text-[#9c1e22] translate-x-1' : 'text-gray-300 group-hover:translate-x-1 group-hover:text-gray-500'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Majestic display panel for active facility details */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[460px]">
            
            {/* Real photography visual block */}
            <div className="md:col-span-6 relative bg-gray-100 aspect-16/10 md:aspect-auto">
              <img
                src={activeFacility.imagePath}
                alt={activeFacility.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 bg-navy-900/90 text-gold-400 font-mono text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider border border-gold-500">
                {activeFacility.category}
              </span>
            </div>

            {/* Comprehensive pedagogical highlight block */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-navy-800 leading-tight">
                  {activeFacility.title}
                </h3>
                <div className="h-0.5 w-12 bg-gold-500" />
                <p className="font-sans text-sm text-[#9c1e22] font-semibold italic">
                  {activeFacility.description}
                </p>
                <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {activeFacility.detailedDescription}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 mt-6 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => onScrollToSection('booking-section')}
                  className="w-full sm:w-auto text-center bg-navy-800 hover:bg-navy-950 text-white font-heading text-xs font-bold px-5 py-3 rounded-lg border border-transparent shadow-xs transition-colors cursor-pointer"
                >
                  Request Customized Fee
                </button>
                <button
                  onClick={() => onScrollToSection('booking-section')}
                  className="w-full sm:w-auto text-center bg-transparent border border-navy-800 text-navy-800 hover:bg-navy-50 font-heading text-xs font-semibold px-5 py-3 rounded-lg transition-colors cursor-pointer"
                >
                  Schedule Tour
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Authentic Shared Folders Section */}
        <div className="mt-16 bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs max-w-5xl mx-auto" id="gallery-authentic-drives">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#9c1e22] text-xs font-bold font-sans">
              ★ Authentic Live Folders
            </span>
            <h3 className="font-heading text-lg font-bold text-navy-900 leading-tight">
              View Verified Live Media Albums
            </h3>
            <p className="font-sans text-xs text-gray-500 max-w-xl">
              Take an unedited look at real-life daily student operations, pristine swimming sessions, and high-energy athletic clubs hosted inside our 25-acre sanctuary.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full md:w-auto">
            <a 
              href="https://share.google/Y2PePP7sNCLIlQwkL" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-navy-800 font-heading text-xs font-bold px-5 py-3.5 rounded-xl border border-gray-250 transition-all cursor-pointer text-center"
            >
              <span>Classrooms & Activities Drive ↗</span>
            </a>
            <a 
              href="https://share.google/3vhxNbv0RJbcLT2yd" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2 bg-[#9c1e22] hover:bg-red-900 text-white font-heading text-xs font-bold px-5 py-3.5 rounded-xl transition-all cursor-pointer text-center"
            >
              <span>Olympic Pool & Sports Drive ↗</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
