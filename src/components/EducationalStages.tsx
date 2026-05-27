import React from 'react';
import { ShieldAlert, BookOpenCheck, Landmark, Check } from 'lucide-react';
import { EDUCATION_STAGES } from '../data';

export default function EducationalStages() {
  const mapIcon = (idx: number) => {
    if (idx === 0) return ShieldAlert;
    if (idx === 1) return BookOpenCheck;
    return Landmark;
  };

  return (
    <section id="stages-section" className="py-20 bg-linear-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content styling */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-mono font-bold tracking-widest text-gold-600 uppercase block">Curriculum Core</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
            Academic Pathways & Holistics
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-500">
            A comprehensive overview of how learning unfolds under our 'Beyond the Syllabus' developmental parameters at Cuddalore.
          </p>
        </div>

        {/* Bento/Column grid list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EDUCATION_STAGES.map((stage, idx) => {
            const IconComponent = mapIcon(idx);
            return (
              <div 
                key={stage.title}
                className="bg-white border text-left border-gray-150 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl transition-all hover:-translate-y-1 group"
                id={`curriculum-stage-card-${idx}`}
              >
                <div className="space-y-6">
                  {/* Icon Block */}
                  <div className="h-12 w-12 rounded-xl bg-navy-50 flex items-center justify-center text-navy-800 border border-navy-100 group-hover:bg-[#9c1e22] group-hover:text-white group-hover:border-transparent transition-all">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-gold-600">
                      {stage.grades}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-navy-950">
                      {stage.title}
                    </h3>
                    <p className="font-sans text-sm text-gray-600 leading-relaxed pt-2">
                      {stage.description}
                    </p>
                  </div>

                  {/* Highlights section */}
                  <div className="space-y-2.5 pt-4 border-t border-gray-100">
                    <p className="text-[11px] font-mono uppercase tracking-widest text-[#9c1e22] font-bold">Key Highlights</p>
                    <ul className="space-y-2">
                      {stage.highlights.map((hlt) => (
                        <li key={hlt} className="flex items-center gap-2 text-xs font-sans text-gray-605">
                          <div className="p-0.5 bg-green-50 rounded-full border border-green-200">
                            <Check className="w-3.5 h-3.5 text-green-600" />
                          </div>
                          <span className="font-medium text-gray-700">{hlt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 text-left">
                  <span className="text-xs text-navy-900 font-bold tracking-wider font-sans group-hover:text-gold-600 transition-colors inline-flex items-center gap-1.5">
                    View Classroom Formats →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
