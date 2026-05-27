import React from 'react';
import { Mail, Phone, MapPin, Milestone, ShieldAlert, Award, Globe, Instagram, BookOpen, FolderOpen } from 'lucide-react';
import { SCHOOL_NAME, LOGO_PATH, CORE_POSITIONING } from '../data';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  return (
    <footer id="app-footer" className="bg-navy-950 text-white border-t border-navy-800">
      
      {/* Prime Footer Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-8 font-sans">
        
        {/* Brand visual coordinates */}
        <div className="md:col-span-4 space-y-6 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start cursor-pointer" onClick={() => onScrollToSection('hero-section')}>
            <img 
              src={LOGO_PATH} 
              alt={`${SCHOOL_NAME} Secondary Logo`}
              className="h-14 w-auto object-contain border border-gold-400 bg-white p-1 rounded-md"
              referrerPolicy="no-referrer"
            />
            <div className="text-left flex flex-col">
              <span className="font-heading text-lg font-extrabold tracking-tight text-white leading-none">AKSHARA</span>
              <span className="font-heading text-xs font-bold tracking-widest text-gold-400 uppercase leading-normal">VIDYAASHRAM</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm mx-auto md:mx-0">
            {CORE_POSITIONING}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start text-xs font-mono text-gray-400 font-medium">
            <span className="flex items-center gap-1.5 bg-navy-900 px-3 py-1.5 rounded-lg border border-navy-850">
              <Milestone className="w-3.5 h-3.5 text-gold-400" /> CBSE #1930438
            </span>
            <span className="flex items-center gap-1.5 bg-navy-900 px-3 py-1.5 rounded-lg border border-navy-850">
              <Award className="w-3.5 h-3.5 text-gold-400" /> Since 1993
            </span>
          </div>
        </div>

        {/* Navigation columns */}
        <div className="md:col-span-2 text-center md:text-left space-y-4">
          <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-gold-400 border-b border-navy-800 pb-2">Jump</h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
            <li>
              <button onClick={() => onScrollToSection('hero-section')} className="hover:text-gold-400 transition-colors cursor-pointer text-left">
                Admissions Home
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection('experience-section')} className="hover:text-gold-400 transition-colors cursor-pointer text-left">
                The Campus Sanctuary
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection('stages-section')} className="hover:text-gold-400 transition-colors cursor-pointer text-left">
                Curriculum Cores
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection('calculator-section')} className="hover:text-gold-400 transition-colors cursor-pointer text-left">
                Grade Calculator
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection('faq-section')} className="hover:text-gold-400 transition-colors cursor-pointer text-left">
                General FAQs
              </button>
            </li>
          </ul>
        </div>

        {/* Brand new Official Channels column from User's real links */}
        <div className="md:col-span-3 text-center md:text-left space-y-4">
          <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-gold-400 border-b border-navy-800 pb-2">Official Channels</h4>
          <ul className="space-y-3 text-xs sm:text-sm text-gray-400">
            <li>
              <a 
                href="https://www.aksharavidyaashram.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 justify-center md:justify-start hover:text-gold-400 transition-colors"
              >
                <Globe className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Official Web Portal</span>
              </a>
            </li>
            <li>
              <a 
                href="https://www.instagram.com/aksharavidyaashram_cbse_school?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 justify-center md:justify-start hover:text-gold-400 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-500 shrink-0" />
                <span>Instagram Community</span>
              </a>
            </li>
            <li>
              <a 
                href="https://www.aksharavidyaashram.com/blogs.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 justify-center md:justify-start hover:text-gold-400 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Akshara Publications & Blogs</span>
              </a>
            </li>
            <li>
              <a 
                href="https://share.google/Y2PePP7sNCLIlQwkL" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 justify-center md:justify-start hover:text-gold-400 transition-colors"
                title="Google Share drive for academic classrooms visual archives"
              >
                <FolderOpen className="w-4 h-4 text-[#9c1e22] shrink-0" />
                <span className="text-left leading-tight font-medium">Classrooms & Academics Shared Album</span>
              </a>
            </li>
            <li>
              <a 
                href="https://share.google/3vhxNbv0RJbcLT2yd" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 justify-center md:justify-start hover:text-gold-400 transition-colors"
                title="Google Share drive for swimming pool and sports achievements"
              >
                <FolderOpen className="w-4 h-4 text-green-500 shrink-0" />
                <span className="text-left leading-tight font-medium">Olympic Swimming Pool & Sports Album</span>
              </a>
            </li>
          </ul>
        </div>

        {/* School location parameters */}
        <div className="md:col-span-3 text-center md:text-left space-y-4">
          <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-gold-400 border-b border-navy-800 pb-2">Reach the Sanctuary</h4>
          <ul className="space-y-3 text-xs sm:text-sm text-gray-400">
            <li className="flex items-start gap-2.5 justify-center md:justify-start">
              <MapPin className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
              <div className="text-left">
                <span className="block font-semibold text-white">Main Campus Location</span>
                <span className="block text-xs text-gray-400 mt-1">25-Acres Estate, Cuddalore Municipal Limits, Tamil Nadu - 607001, India</span>
              </div>
            </li>
            <li className="flex items-center gap-2.5 justify-center md:justify-start">
              <Phone className="w-4 h-4 text-gold-400 shrink-0" />
              <div className="text-left font-mono">
                <a href="tel:+914142227000" className="hover:text-gold-400 transition-colors block font-semibold">+91 4142 227 000</a>
              </div>
            </li>
            <li className="flex items-center gap-2.5 justify-center md:justify-start">
              <Mail className="w-4 h-4 text-gold-400 shrink-0" />
              <div className="text-left text-xs uppercase font-mono tracking-wide">
                <a href="mailto:admissions@aksharavidyaashram.edu" className="hover:text-gold-400 transition-colors block font-semibold">admissions@aksharavidyaashram.com</a>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Auxiliary Statutory Footnote bar */}
      <div className="bg-navy-950 border-t border-navy-900/60 py-6 text-center text-xs text-gray-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {SCHOOL_NAME}. All Rights Reserved. Private School Admission Gateway.</p>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-gold-500" />
            <span>Beyond The Syllabus Campaign — Verification Desk Authority</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
