import React, { useState, useEffect } from 'react';
import aksharaLogo from '../../assets/akshara-logo.png';
import talentriaFlyer from '../../assets/talentria-flyer.jpg';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  Users, 
  Music, 
  Shirt, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Mic2, 
  Palette, 
  Guitar, 
  BookOpen, 
  Theater, 
  ChevronRight, 
  FileText, 
  ExternalLink, 
  Phone, 
  Mail, 
  MapPin, 
  Share2, 
  ArrowUp,
  X,
  Maximize2
} from 'lucide-react';

export default function TalentriaPage() {
  const [flyerModalOpen, setFlyerModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Dynamic page title & meta
    document.title = "TALENTRIA 26 – Open Talent Competition | Akshara Vidyaashram";
    
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "TALENTRIA 26 – Akshara Vidyaashram",
        text: "TALENTRIA 26: Open Talent Competition for Grades 1–9. It's your time to shine! Registration closes 4 November 2026.",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  // Google Calendar link generator for Sat Nov 21 2026
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("TALENTRIA 26 - Open Talent Competition")}&dates=20261121T033000Z/20261121T113000Z&details=${encodeURIComponent("TALENTRIA 26: Open Talent Competition at Akshara Vidyaashram for Grades 1–9. It's your time to shine!")}&location=${encodeURIComponent("Akshara Vidyaashram, Cuddalore")}`;

  return (
    <div className="min-h-screen bg-[#faf8f5] text-gray-900 font-sans selection:bg-[#fbd38d] selection:text-[#742a2a]">
      
      {/* ─────────────────────────────────────────────────────────────
          TOP BRANDING & NAVIGATION HEADER
      ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* School Official Logo & Brand */}
            <a 
              href="/" 
              title="Akshara Vidyaashram Home" 
              className="flex items-center gap-3 group focus:outline-hidden"
            >
              <img 
                src={aksharaLogo} 
                alt="Akshara Vidyaashram Official Logo" 
                onError={(e) => { e.currentTarget.src = '/images/124.png'; }}
                className="h-13 w-13 sm:h-15 sm:w-15 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-heading text-lg sm:text-xl font-extrabold tracking-tight text-[#0c2340] leading-none">
                  AKSHARA
                </span>
                <span className="font-heading text-[11px] sm:text-xs font-bold tracking-widest text-[#9c1e22] uppercase leading-none mt-1">
                  VIDYAASHRAM
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-gray-500 uppercase tracking-wider leading-none mt-1">
                  beyond the syllabus...
                </span>
              </div>
            </a>

            {/* Event Header Pill & Quick Links */}
            <div className="flex items-center gap-2 sm:gap-4">
              <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-gray-700">
                <button 
                  onClick={() => scrollToSection('event-overview')} 
                  className="hover:text-[#9c1e22] transition-colors cursor-pointer py-1"
                >
                  Overview
                </button>
                <button 
                  onClick={() => scrollToSection('event-details')} 
                  className="hover:text-[#9c1e22] transition-colors cursor-pointer py-1"
                >
                  Details
                </button>
                <button 
                  onClick={() => scrollToSection('registration-section')} 
                  className="hover:text-[#9c1e22] transition-colors cursor-pointer py-1"
                >
                  Registration
                </button>
                <button 
                  onClick={() => scrollToSection('approvals-section')} 
                  className="hover:text-[#9c1e22] transition-colors cursor-pointer py-1"
                >
                  Approvals
                </button>
                <button 
                  onClick={() => scrollToSection('rehearsals-judges')} 
                  className="hover:text-[#9c1e22] transition-colors cursor-pointer py-1"
                >
                  Rehearsals & Judges
                </button>
              </nav>

              <button
                onClick={() => scrollToSection('registration-section')}
                className="inline-flex items-center gap-1.5 bg-linear-to-r from-[#9c1e22] to-[#c5282e] hover:from-[#801015] hover:to-[#9c1e22] text-white font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Register</span>
              </button>

              <button
                onClick={handleShare}
                title="Share Event Link"
                className="p-2 sm:p-2.5 text-gray-600 hover:text-[#9c1e22] hover:bg-amber-50 rounded-full transition-colors cursor-pointer"
                aria-label="Share page"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Share toast feedback */}
        {copiedLink && (
          <div className="bg-emerald-600 text-white text-xs font-medium text-center py-1.5">
            Event page link copied to clipboard!
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (WITH OFFICIAL FLYER INTEGRATED DIRECTLY)
          Inspired by the vibrant, creative paper-craft flyer design
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#e8f3fc] via-[#fdf7ee] to-[#faf8f5] pt-6 sm:pt-10 pb-14 sm:pb-20 border-b border-amber-200/60">
        
        {/* Playful background decorative shapes */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden select-none opacity-40">
          <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-[#fbd38d]/40 blur-2xl" />
          <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-[#fed7d7]/40 blur-3xl" />
          <div className="absolute bottom-10 left-1/4 w-72 h-72 rounded-full bg-[#c6f6d5]/40 blur-2xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Side-by-side Hero on Tablet/Desktop, Stacked on Mobile with Flyer Front & Center */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center">
            
            {/* Left Column: Headlines, Ribbons, Badges & Details (md:col-span-7) */}
            <div className="md:col-span-7 text-center md:text-left space-y-4">

              {/* Ribbon Badge: "IT'S YOUR TIME TO SHINE!" */}
              <div className="inline-flex items-center justify-center md:justify-start">
                <div className="bg-linear-to-r from-[#e53e3e] via-[#dd6b20] to-[#d69e2e] text-white font-black text-xs sm:text-sm tracking-wider uppercase px-4 sm:px-7 py-1.5 sm:py-2 rounded-full shadow-md transform -rotate-1 hover:rotate-0 transition-transform">
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-200 fill-amber-200" />
                    IT&apos;S YOUR TIME TO SHINE!
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-200 fill-amber-200" />
                  </span>
                </div>
              </div>

              {/* Main Event Title: TALENTRIA 26 */}
              <div className="space-y-1 sm:space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-[#0c2340] leading-none">
                  TALENTRIA <span className="text-[#9c1e22]">26</span>
                </h1>
                
                <div className="flex items-center justify-center md:justify-start gap-1 sm:gap-1.5 flex-wrap pt-0.5">
                  <div className="inline-flex items-center gap-1 sm:gap-1.5 px-3 py-1 bg-white/90 rounded-xl border border-amber-200 shadow-2xs font-extrabold text-xs sm:text-sm uppercase tracking-wider">
                    <span className="text-[#e53e3e]">O</span>
                    <span className="text-[#319795]">P</span>
                    <span className="text-[#dd6b20]">E</span>
                    <span className="text-[#3182ce]">N</span>
                    <span className="text-gray-400 mx-0.5">·</span>
                    <span className="text-[#dd6b20]">T</span>
                    <span className="text-[#38a169]">A</span>
                    <span className="text-[#4c51bf]">L</span>
                    <span className="text-[#e53e3e]">E</span>
                    <span className="text-[#805ad5]">N</span>
                    <span className="text-[#d53f8c]">T</span>
                    <span className="text-gray-400 mx-0.5">·</span>
                    <span className="text-[#e53e3e]">C</span>
                    <span className="text-[#319795]">O</span>
                    <span className="text-[#dd6b20]">M</span>
                    <span className="text-[#3182ce]">P</span>
                    <span className="text-[#805ad5]">E</span>
                    <span className="text-[#38a169]">T</span>
                    <span className="text-[#d53f8c]">I</span>
                    <span className="text-[#e53e3e]">T</span>
                    <span className="text-[#319795]">I</span>
                    <span className="text-[#dd6b20]">O</span>
                    <span className="text-[#3182ce]">N</span>
                  </div>
                </div>
              </div>

              {/* MOBILE / NARROW SCREEN FLYER (Visible on screens < md so it appears above the fold immediately!) */}
              <div className="md:hidden flex flex-col items-center justify-center pt-2 pb-1">
                <div 
                  onClick={() => setFlyerModalOpen(true)}
                  className="relative group cursor-pointer max-w-[270px] bg-white p-2 rounded-2xl border-3 border-amber-300 shadow-lg overflow-hidden transform active:scale-95 transition-transform"
                >
                  <div className="absolute top-3 right-3 z-10 bg-linear-to-r from-red-600 to-[#9c1e22] text-white font-mono text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                    <span>Official Flyer</span>
                  </div>
                  <img 
                    src={talentriaFlyer} 
                    alt="TALENTRIA 26 Official Poster" 
                    className="w-full h-auto object-contain rounded-xl"
                  />
                  <div className="pt-1.5 flex justify-between items-center text-[10px] text-gray-500 font-mono px-1">
                    <span>Sat, 21 Nov 2026</span>
                    <span className="text-[#9c1e22] font-bold flex items-center gap-0.5">
                      <Maximize2 className="w-2.5 h-2.5" /> Tap to zoom
                    </span>
                  </div>
                </div>
              </div>

              {/* Supporting Message Badge: OPEN TO ALL THE GRADES OF AKSHARITES */}
              <div>
                <span className="inline-block bg-[#fef08a] border-2 border-[#ca8a04] text-[#854d0e] font-black text-xs sm:text-sm md:text-base uppercase tracking-wider px-3.5 sm:px-5 py-1.5 rounded-xl shadow-xs">
                  OPEN TO ALL THE GRADES OF AKSHARITES
                </span>
                <p className="text-xs font-semibold text-gray-600 mt-1 font-mono uppercase tracking-wider">
                  Students from Grades 1–9 · Open Talent Competition
                </p>
              </div>

              {/* Patterned Banner Box: SHOW YOUR TALENT. SHARE YOUR PASSION. */}
              <div className="pt-0.5 max-w-xl mx-auto md:mx-0">
                <div className="p-1 rounded-2xl bg-linear-to-r from-amber-400 via-orange-400 to-rose-400 shadow-md">
                  <div className="bg-[#fef9c3] border border-amber-300 py-2.5 sm:py-3 px-4 rounded-xl text-center">
                    <p className="font-heading text-sm sm:text-lg md:text-xl font-black text-[#713f12] tracking-wide">
                      SHOW YOUR TALENT. SHARE YOUR PASSION.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Hero Event Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-left">
                
                <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-amber-200/80 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[#9c1e22] mb-0.5">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[10px] font-mono uppercase font-bold text-gray-500">Date</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-[#0c2340] leading-tight">21 Nov 2026</p>
                  <p className="text-[10px] text-gray-500">Saturday</p>
                </div>

                <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-amber-200/80 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-amber-700 mb-0.5">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[10px] font-mono uppercase font-bold text-gray-500">Timing</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-amber-900 leading-tight">To be announced</p>
                  <p className="text-[10px] text-gray-500">Communicated later</p>
                </div>

                <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-amber-200/80 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-blue-700 mb-0.5">
                    <Users className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[10px] font-mono uppercase font-bold text-gray-500">Grades</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-[#0c2340] leading-tight">Grades 1 – 9</p>
                  <p className="text-[10px] text-gray-500">Primary &amp; Middle</p>
                </div>

                <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-amber-200/80 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-emerald-700 mb-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[10px] font-mono uppercase font-bold text-gray-500">Deadline</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-emerald-800 leading-tight">4 Nov 2026</p>
                  <p className="text-[10px] text-emerald-600 font-semibold">Registration cut-off</p>
                </div>

              </div>

              {/* Hero CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2.5 pt-1">
                <button
                  onClick={() => scrollToSection('registration-section')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#9c1e22] hover:bg-[#801015] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>View Registration Process</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setFlyerModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-amber-50 text-[#0c2340] border-2 border-amber-300 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4 text-amber-700" />
                  <span>View Fullsize Flyer</span>
                </button>
              </div>

            </div>

            {/* Right Column: Prominent Flyer Poster on Desktop / Tablet (md:col-span-5) */}
            <div className="hidden md:flex md:col-span-5 flex-col items-center justify-center">
              <div className="relative group max-w-sm sm:max-w-md w-full">
                
                {/* Layered decorative paper-cut border matching flyer borders */}
                <div className="absolute -inset-2 bg-linear-to-tr from-amber-400 via-orange-500 to-emerald-500 rounded-3xl blur-xs opacity-70 group-hover:opacity-100 transition duration-300" />
                
                <div 
                  onClick={() => setFlyerModalOpen(true)}
                  className="relative bg-white p-2.5 sm:p-3 rounded-2xl border-4 border-amber-300 shadow-xl overflow-hidden cursor-pointer transform group-hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Top Flyer Ribbon Tag */}
                  <div className="absolute top-4 right-4 z-20 bg-linear-to-r from-red-600 to-[#9c1e22] text-white font-mono text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Official Flyer</span>
                  </div>

                  {/* Flyer Image Asset */}
                  <img 
                    src={talentriaFlyer} 
                    alt="TALENTRIA 26 Official Poster - Open to all the grades of Aksharites" 
                    className="w-full h-auto object-contain rounded-xl shadow-xs select-none"
                  />

                  {/* Hover Overlay with 1-click Enlarge */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white p-4 backdrop-blur-2xs rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
                      <Maximize2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-heading font-extrabold text-sm sm:text-base">Click to Enlarge / Download</span>
                    <span className="text-[11px] font-mono text-amber-200 mt-1">Full High-Resolution Poster</span>
                  </div>
                </div>

                <div className="flex justify-between items-center px-2 pt-2 text-[11px] text-gray-500 font-mono">
                  <span>Saturday, 21 November 2026</span>
                  <button 
                    onClick={() => setFlyerModalOpen(true)} 
                    className="text-[#9c1e22] font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Click to Zoom</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. EVENT INTRODUCTION
      ───────────────────────────────────────────────────────────── */}
      <section id="event-overview" className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-[#9c1e22] uppercase">
              Welcome to the Grand Stage
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0c2340]">
              An Opportunity to Showcase Talent &amp; Passion
            </h2>
            <div className="h-1 w-20 bg-amber-400 mx-auto rounded-full" />
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed pt-2">
              <strong>TALENTRIA 26</strong> is Akshara Vidyaashram&apos;s marquee open talent competition, specially designed for school children from <strong>Grades 1 through 9</strong>. It is a celebratory platform where confidence takes flight, artistic passions are celebrated, and every child discovers their moment in the spotlight.
            </p>
          </div>

          {/* Talent Domains Visual Strip (Inspired by the 6 flyer tiles) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pt-12">
            
            <div className="bg-[#fff5f5] border border-rose-200 p-4 rounded-2xl text-center space-y-2 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto rounded-xl bg-rose-100 flex items-center justify-center text-rose-700">
                <Mic2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-[#0c2340]">Vocal &amp; Singing</h3>
              <p className="text-[11px] text-gray-500">Solo, Classical, Folk &amp; Contemporary</p>
            </div>

            <div className="bg-[#f0fff4] border border-emerald-200 p-4 rounded-2xl text-center space-y-2 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Guitar className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-[#0c2340]">Instrumental</h3>
              <p className="text-[11px] text-gray-500">Keyboard, Guitar, Percussion &amp; Rhythm</p>
            </div>

            <div className="bg-[#fffaf0] border border-amber-200 p-4 rounded-2xl text-center space-y-2 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-[#0c2340]">Dance</h3>
              <p className="text-[11px] text-gray-500">Classical, Semi-Classical &amp; Freestyle</p>
            </div>

            <div className="bg-[#faf5ff] border border-purple-200 p-4 rounded-2xl text-center space-y-2 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-[#0c2340]">Fine Arts</h3>
              <p className="text-[11px] text-gray-500">Painting, Sketching &amp; Creative Craft</p>
            </div>

            <div className="bg-[#ebf8ff] border border-blue-200 p-4 rounded-2xl text-center space-y-2 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-[#0c2340]">Elocution</h3>
              <p className="text-[11px] text-gray-500">Storytelling, Poetry &amp; Oratory</p>
            </div>

            <div className="bg-[#f7fafc] border border-slate-200 p-4 rounded-2xl text-center space-y-2 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <Theater className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-[#0c2340]">Dramatic Arts</h3>
              <p className="text-[11px] text-gray-500">Mime, Monoact &amp; Creative Expressions</p>
            </div>

          </div>

          {/* Event Philosophy & Stage Values */}
          <div className="mt-14 max-w-4xl mx-auto bg-linear-to-br from-amber-50 via-white to-orange-50 border-2 border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              <div className="md:col-span-7 space-y-3 text-left">
                <div className="inline-flex items-center gap-2 bg-[#9c1e22]/10 text-[#9c1e22] font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-[#9c1e22]" />
                  <span>The Akshara Vidyaashram Spirit</span>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0c2340]">
                  A Stage for Every Passion, A Celebration for Every Child
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  TALENTRIA 26 is designed to foster courage, poise, and uninhibited creative expression. Whether performing a solo piece, reciting poetry, showcasing artwork, or playing an instrument — every participant is recognized, appreciated, and cheered on by our school family.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => scrollToSection('registration-section')}
                    className="inline-flex items-center gap-1.5 bg-[#9c1e22] hover:bg-[#801015] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Register Before 4 Nov 2026</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => scrollToSection('approvals-section')}
                    className="inline-flex items-center gap-1.5 bg-white hover:bg-amber-50 text-[#0c2340] border border-amber-300 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>View Music &amp; Costume Approvals</span>
                  </button>
                </div>
              </div>

              {/* Inclusions pill checklist */}
              <div className="md:col-span-5 bg-white p-5 rounded-2xl border border-amber-200 shadow-2xs space-y-3 text-xs">
                <p className="font-mono uppercase font-bold text-gray-500 tracking-wider text-[10px]">What Participants Receive:</p>
                
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>Certificate of Commendation</strong> for every participant</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>Stage exposure</strong> under auditorium lighting and acoustics</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>Faculty guidance</strong> during dedicated rehearsal sessions</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>Constructive feedback</strong> from our esteemed panel of judges</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. EVENT DETAILS (CLEAN INFORMATION BLOCKS)
      ───────────────────────────────────────────────────────────── */}
      <section id="event-details" className="py-16 bg-[#f7f5f0] border-y border-amber-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-[#9c1e22] uppercase">
              Key Event Specifications
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0c2340]">
              Event Details at a Glance
            </h2>
            <div className="h-1 w-16 bg-amber-400 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Date */}
            <div className="bg-white rounded-2xl p-6 border-2 border-rose-100 shadow-xs flex flex-col justify-between hover:border-rose-300 transition-colors">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#fff5f5] text-[#9c1e22] flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <p className="text-xs font-mono uppercase tracking-wider font-bold text-gray-500">Date of Event</p>
                <h3 className="font-heading text-2xl font-black text-[#0c2340]">
                  Saturday, 21 Nov 2026
                </h3>
              </div>
              <p className="text-xs text-gray-500 pt-4 border-t border-gray-100 mt-4">
                Mark your calendar for this grand celebration of student potential.
              </p>
            </div>

            {/* Card 2: Timing */}
            <div className="bg-white rounded-2xl p-6 border-2 border-amber-200 shadow-xs flex flex-col justify-between hover:border-amber-400 transition-colors">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <p className="text-xs font-mono uppercase tracking-wider font-bold text-gray-500">Event Timing</p>
                <h3 className="font-heading text-2xl font-black text-amber-900">
                  To Be Announced
                </h3>
              </div>
              <div className="pt-4 border-t border-gray-100 mt-4">
                <span className="inline-block text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
                  Final schedule will be shared soon
                </span>
              </div>
            </div>

            {/* Card 3: Eligibility */}
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-100 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-colors">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <p className="text-xs font-mono uppercase tracking-wider font-bold text-gray-500">Eligibility</p>
                <h3 className="font-heading text-2xl font-black text-[#0c2340]">
                  Grades 1 – 9
                </h3>
              </div>
              <p className="text-xs text-gray-500 pt-4 border-t border-gray-100 mt-4">
                Structured in two competitive brackets: Grades 1–5 and Grades 6–9.
              </p>
            </div>

            {/* Card 4: Registration Deadline */}
            <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200 shadow-xs flex flex-col justify-between hover:border-emerald-400 transition-colors">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <p className="text-xs font-mono uppercase tracking-wider font-bold text-gray-500">Registration Deadline</p>
                <h3 className="font-heading text-2xl font-black text-emerald-800">
                  4 November 2026
                </h3>
              </div>
              <p className="text-xs text-emerald-700 font-semibold pt-4 border-t border-gray-100 mt-4">
                Mandatory deadline to secure participant entry slot.
              </p>
            </div>

          </div>

          {/* Highlighted Notice on Timing (Do not invent time) */}
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="bg-amber-100/80 border-l-4 border-amber-500 p-4 rounded-r-xl flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-amber-900">
                <strong className="font-bold">Official Note on Event Timing:</strong> Event timing will be finalised and communicated later to all registered participants and their parents.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. HOW TO REGISTER (PROMINENT SECTION)
      ───────────────────────────────────────────────────────────── */}
      <section id="registration-section" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-[#9c1e22] uppercase">
              Participation Procedure
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0c2340]">
              How to Register
            </h2>
            <div className="h-1 w-20 bg-amber-400 mx-auto rounded-full" />
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Registrations are coordinated through designated faculty teachers based on grade levels. Please enroll before the deadline.
            </p>
          </div>

          {/* Deadline Alert Banner */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="bg-linear-to-r from-red-600 to-[#9c1e22] text-white p-4 sm:p-5 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <p className="text-xs uppercase font-mono tracking-wider text-amber-200 font-bold">Important Cut-off Date</p>
                  <p className="font-heading text-lg sm:text-xl font-black">Last Date for Registration: 4 November 2026</p>
                </div>
              </div>
              <span className="bg-white text-[#9c1e22] font-black text-xs uppercase px-4 py-2 rounded-full tracking-wider shadow-xs">
                Enrol Early
              </span>
            </div>
          </div>

          {/* Two distinct Registration Blocks: Grades 1–5 vs Grades 6–9 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Grades 1–5 Registration Card */}
            <div className="bg-[#fff9f5] border-2 border-orange-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-orange-500 text-white font-mono text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl tracking-wider">
                Primary Wing
              </div>
              
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="inline-block text-xs font-mono font-bold text-orange-600 uppercase tracking-widest">
                    Category A
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#0c2340]">
                    Grades 1 – 5
                  </h3>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-orange-200/80 shadow-2xs space-y-3">
                  <p className="text-xs uppercase font-mono text-gray-500 font-bold">Registration Coordinator</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-heading font-extrabold text-lg">
                      ML
                    </div>
                    <div>
                      <h4 className="text-lg font-extrabold text-[#0c2340]">Miss Mona Lisa</h4>
                      <p className="text-xs text-gray-600">Faculty Coordinator · Grades 1–5</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Contact <strong>Miss Mona Lisa</strong> during school hours.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Specify your performance category and item title.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Submit participant details before <strong>4 November 2026</strong>.</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-orange-200">
                <div className="bg-orange-100/80 text-orange-900 text-xs font-medium px-4 py-2.5 rounded-xl text-center">
                  Registration Desk: School Primary Coordinator Office
                </div>
              </div>
            </div>

            {/* Grades 6–9 Registration Card */}
            <div className="bg-[#f0f9ff] border-2 border-sky-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-sky-600 text-white font-mono text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl tracking-wider">
                Middle Wing
              </div>

              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="inline-block text-xs font-mono font-bold text-sky-700 uppercase tracking-widest">
                    Category B
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#0c2340]">
                    Grades 6 – 9
                  </h3>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-sky-200/80 shadow-2xs space-y-3">
                  <p className="text-xs uppercase font-mono text-gray-500 font-bold">Registration Coordinator</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-heading font-extrabold text-lg">
                      MG
                    </div>
                    <div>
                      <h4 className="text-lg font-extrabold text-[#0c2340]">Miss Gowri</h4>
                      <p className="text-xs text-gray-600">Faculty Coordinator · Grades 6–9</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Contact <strong>Miss Gowri</strong> during school hours.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Specify your performance track, music, or equipment needs.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Submit participant details before <strong>4 November 2026</strong>.</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-sky-200">
                <div className="bg-sky-100/80 text-sky-900 text-xs font-medium px-4 py-2.5 rounded-xl text-center">
                  Registration Desk: School Middle School Staff Room
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. IMPORTANT APPROVALS (TWO DISTINCT CARDS)
      ───────────────────────────────────────────────────────────── */}
      <section id="approvals-section" className="py-16 bg-[#faf5ee] border-y border-amber-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-[#9c1e22] uppercase">
              Quality &amp; Standards Verification
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0c2340]">
              Mandatory Performance Approvals
            </h2>
            <div className="h-1 w-20 bg-amber-400 mx-auto rounded-full" />
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              To uphold age-appropriate, positive, and dignified standards, all music tracks and stage costumes must be pre-approved by the assigned faculty coordinators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Music Approval Card */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-indigo-200 shadow-sm flex flex-col justify-between hover:border-indigo-400 hover:shadow-md transition-all">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0">
                    <Music className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                      Step 1 of Verification
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-[#0c2340] mt-1">
                      Music Approval
                    </h3>
                  </div>
                </div>

                <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-5 space-y-2">
                  <p className="text-xs font-mono uppercase tracking-wider font-bold text-gray-500">
                    Authorised Faculty In-Charge
                  </p>
                  <p className="text-xl font-extrabold text-indigo-950">
                    Miss Priya C.
                  </p>
                  <p className="text-xs text-indigo-800">
                    Faculty Coordinator · Music &amp; Performing Arts
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span><strong>All songs or music tracks</strong> selected for performances must be vetted and approved.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>Audio tracks should be submitted via USB/pen drive or official coordinator email in clean MP3 format.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>Songs must feature wholesome, inspiring, and school-appropriate lyrics.</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-indigo-100 text-xs text-indigo-700 font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Approval required prior to rehearsal commencement</span>
              </div>
            </div>

            {/* Costume Approval Card */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-rose-200 shadow-sm flex flex-col justify-between hover:border-rose-400 hover:shadow-md transition-all">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 shrink-0">
                    <Shirt className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">
                      Step 2 of Verification
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-[#0c2340] mt-1">
                      Costume Approval
                    </h3>
                  </div>
                </div>

                <div className="bg-rose-50/60 border border-rose-100 rounded-2xl p-5 space-y-2">
                  <p className="text-xs font-mono uppercase tracking-wider font-bold text-gray-500">
                    Authorised Faculty In-Charge
                  </p>
                  <p className="text-xl font-extrabold text-rose-950">
                    Miss Subashree
                  </p>
                  <p className="text-xs text-rose-800">
                    Faculty Coordinator · Creative Arts &amp; Costumes
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span><strong>All costumes planned</strong> for stage performances must be reviewed and approved.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>Costumes must be comfortable, age-appropriate, and well-tailored for safe stage mobility.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>Share a photograph or physical sample of the attire during the rehearsal window.</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-rose-100 text-xs text-rose-700 font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Approval required prior to final dress rehearsal</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6 & 7. REHEARSALS & JUDGES SECTION
      ───────────────────────────────────────────────────────────── */}
      <section id="rehearsals-judges" className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* REHEARSALS SUBSECTION */}
          <div className="space-y-8">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="text-xs font-mono font-bold tracking-widest text-[#9c1e22] uppercase">
                Stage Preparation
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0c2340]">
                Rehearsal Schedule &amp; Team
              </h2>
              <div className="h-1 w-20 bg-amber-400 mx-auto rounded-full" />
              <p className="text-base text-gray-600">
                Practice makes performance effortless! Structured rehearsals allow participants to acclimatize to stage lighting, sound balance, and performance duration.
              </p>
            </div>

            {/* Rehearsal Notice Banner */}
            <div className="max-w-2xl mx-auto bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 text-center shadow-xs">
              <p className="text-xs uppercase font-mono tracking-wider font-bold text-amber-800">Commencement Notice</p>
              <p className="font-heading text-xl sm:text-2xl font-black text-amber-950 mt-1">
                &ldquo;Rehearsals will begin five days before the event.&rdquo;
              </p>
              <p className="text-xs text-amber-800 mt-2">
                Coordinators will assign specific rehearsal slots to ensure every participant gets adequate stage time.
              </p>
            </div>

            {/* Coordinators for Grades 1–5 */}
            <div className="max-w-4xl mx-auto bg-[#faf8f5] border border-amber-200 rounded-3xl p-6 sm:p-8">
              <div className="text-center sm:text-left mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-[#9c1e22] font-bold">Primary Stage Team</span>
                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#0c2340] mt-0.5">
                  Rehearsal Coordinators for Grades 1 – 5
                </h3>
                <p className="text-xs text-gray-500">Dedicated guidance and choreography support for younger participants</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div className="bg-white p-5 rounded-2xl border border-amber-200/70 shadow-2xs text-center space-y-2 hover:border-amber-400 transition-colors">
                  <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-heading font-black text-lg">
                    SW
                  </div>
                  <h4 className="font-bold text-base text-[#0c2340]">Miss Swetha</h4>
                  <p className="text-xs text-gray-500">Rehearsal Coordinator</p>
                  <span className="inline-block text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
                    Grades 1–5
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-amber-200/70 shadow-2xs text-center space-y-2 hover:border-amber-400 transition-colors">
                  <div className="w-14 h-14 mx-auto rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-heading font-black text-lg">
                    SR
                  </div>
                  <h4 className="font-bold text-base text-[#0c2340]">Miss Sivaranjani</h4>
                  <p className="text-xs text-gray-500">Rehearsal Coordinator</p>
                  <span className="inline-block text-[10px] font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-full">
                    Grades 1–5
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-amber-200/70 shadow-2xs text-center space-y-2 hover:border-amber-400 transition-colors">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-heading font-black text-lg">
                    ST
                  </div>
                  <h4 className="font-bold text-base text-[#0c2340]">Miss Swathi</h4>
                  <p className="text-xs text-gray-500">Rehearsal Coordinator</p>
                  <span className="inline-block text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Grades 1–5
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* JUDGES SUBSECTION (GRADES 6–9) */}
          <div className="pt-8 border-t border-gray-100 space-y-8">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="text-xs font-mono font-bold tracking-widest text-[#9c1e22] uppercase">
                Panel of Evaluators
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0c2340]">
                Judges – Grades 6 – 9
              </h2>
              <div className="h-1 w-20 bg-amber-400 mx-auto rounded-full" />
              <p className="text-base text-gray-600">
                Performances for Grades 6 through 9 will be evaluated by an esteemed panel of educators and artistic mentors.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              
              {/* Judge 1 */}
              <div className="bg-linear-to-b from-white to-[#fdfbf7] p-6 sm:p-7 rounded-3xl border-2 border-amber-200 shadow-sm text-center space-y-3 hover:shadow-md hover:border-amber-400 transition-all">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-linear-to-br from-[#9c1e22] to-[#c5282e] text-white flex items-center justify-center font-heading font-black text-xl shadow-xs">
                  MA
                </div>
                <div>
                  <h4 className="font-heading text-xl font-extrabold text-[#0c2340]">Miss Anitha</h4>
                  <p className="text-xs text-[#9c1e22] font-semibold mt-0.5">Judge · Grades 6–9</p>
                </div>
                <p className="text-xs text-gray-500 pt-2 border-t border-amber-100">
                  Panel Evaluator for Stage Confidence, Originality &amp; Artistic Precision.
                </p>
              </div>

              {/* Judge 2 */}
              <div className="bg-linear-to-b from-white to-[#fdfbf7] p-6 sm:p-7 rounded-3xl border-2 border-amber-200 shadow-sm text-center space-y-3 hover:shadow-md hover:border-amber-400 transition-all">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-linear-to-br from-[#0c2340] to-[#1a365d] text-amber-300 flex items-center justify-center font-heading font-black text-xl shadow-xs">
                  SP
                </div>
                <div>
                  <h4 className="font-heading text-xl font-extrabold text-[#0c2340]">Miss Shanmuga Priya</h4>
                  <p className="text-xs text-[#9c1e22] font-semibold mt-0.5">Judge · Grades 6–9</p>
                </div>
                <p className="text-xs text-gray-500 pt-2 border-t border-amber-100">
                  Panel Evaluator for Expression, Choreography &amp; Presentation Delivery.
                </p>
              </div>

              {/* Judge 3 */}
              <div className="bg-linear-to-b from-white to-[#fdfbf7] p-6 sm:p-7 rounded-3xl border-2 border-amber-200 shadow-sm text-center space-y-3 hover:shadow-md hover:border-amber-400 transition-all">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-linear-to-br from-[#d97706] to-[#b45309] text-white flex items-center justify-center font-heading font-black text-xl shadow-xs">
                  PK
                </div>
                <div>
                  <h4 className="font-heading text-xl font-extrabold text-[#0c2340]">Miss Priya K.</h4>
                  <p className="text-xs text-[#9c1e22] font-semibold mt-0.5">Judge · Grades 6–9</p>
                </div>
                <p className="text-xs text-gray-500 pt-2 border-t border-amber-100">
                  Panel Evaluator for Musicality, Creative Depth &amp; Stage Impact.
                </p>
              </div>

            </div>

            {/* Judging Criteria Highlights */}
            <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 text-xs text-slate-600">
              <p className="font-bold text-slate-800 uppercase font-mono tracking-wider mb-2 text-center sm:text-left">
                Key Judging Principles:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-left">
                <div>
                  <span className="font-bold text-slate-900 block">1. Creativity</span>
                  <span>Uniqueness &amp; expression</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">2. Confidence</span>
                  <span>Stage composure &amp; poise</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">3. Execution</span>
                  <span>Skill, rhythm &amp; clarity</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">4. Impact</span>
                  <span>Audience connection</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. EVENT TIMING NOTICE BLOCK
      ───────────────────────────────────────────────────────────── */}
      <section className="py-12 bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-xs px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase">
            <Clock className="w-3.5 h-3.5 text-amber-200" />
            <span>Event Schedule Notice</span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Event timing will be finalised and communicated later.
          </h3>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl mx-auto">
            The detailed schedule with grade-wise slots and call times will be provided by coordinators following the registration close on 4 November 2026.
          </p>
          <div className="pt-2">
            <a 
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#0c2340] hover:bg-amber-50 font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#9c1e22]" />
              <span>Save 21 Nov 2026 to Google Calendar</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. FINAL STUDENT-FOCUSED CTA SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#0c2340] text-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#9c1e22]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-amber-300 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>Celebrate Your Potential</span>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
              YOUR TALENT. YOUR PASSION.<br />
              <span className="text-amber-400">YOUR STAGE.</span>
            </h2>
            <p className="font-heading text-xl sm:text-2xl text-amber-200/90 font-medium">
              Get ready to shine at TALENTRIA 26!
            </p>
            <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
              Every participant receives encouragement, applause, and a certificate of commendation. Take the leap, practice your craft, and inspire your peers.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => scrollToSection('registration-section')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-navy-950 font-black text-sm sm:text-base px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-navy-900" />
              <span>Connect with Your Coordinator</span>
            </button>

            <button
              onClick={() => setFlyerModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white border-2 border-white/30 font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>View Official Poster</span>
            </button>
          </div>

          {/* Quick contact reminder */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400" />
              Event: Sat, 21 Nov 2026
            </span>
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              Deadline: 4 Nov 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-sky-400" />
              Grades 1 – 9
            </span>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. DEDICATED EVENT FOOTER
      ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#051424] text-white border-t border-navy-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-navy-800">
            
            {/* School Brand column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src={aksharaLogo} 
                  alt="Akshara Vidyaashram Logo" 
                  onError={(e) => { e.currentTarget.src = '/images/124.png'; }}
                  className="h-14 w-14 object-contain bg-white rounded-lg p-1"
                />
                <div>
                  <h4 className="font-heading text-lg font-extrabold text-white">AKSHARA VIDYAASHRAM</h4>
                  <p className="text-xs text-amber-400 font-mono">beyond the syllabus...</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 max-w-sm">
                A premium educational sanctuary where freedom meets responsibility, and children grow into confident, future-ready leaders.
              </p>
              <div className="text-xs font-mono text-gray-400 space-y-1">
                <p>CBSE Affiliation #1930438 · Established 1993</p>
                <p>Cuddalore, Tamil Nadu, India</p>
              </div>
            </div>

            {/* Quick links */}
            <div className="md:col-span-3 space-y-3">
              <h5 className="text-xs uppercase font-mono font-bold tracking-widest text-amber-400">
                TALENTRIA 26 Quick Links
              </h5>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                <li>
                  <button onClick={() => scrollToSection('event-overview')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                    Event Overview
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('event-details')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                    Event Details &amp; Date
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('registration-section')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                    How to Register (Grades 1–9)
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('approvals-section')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                    Music &amp; Costume Approvals
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('rehearsals-judges')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                    Rehearsals &amp; Judges Panel
                  </button>
                </li>
              </ul>
            </div>

            {/* Admissions & Main Portal link */}
            <div className="md:col-span-4 space-y-3">
              <h5 className="text-xs uppercase font-mono font-bold tracking-widest text-amber-400">
                School Admissions
              </h5>
              <p className="text-xs text-gray-400">
                Looking for academic admissions or campus walkthroughs? Visit the main Akshara Vidyaashram admissions portal.
              </p>
              <div>
                <a 
                  href="/" 
                  className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#9c1e22] hover:bg-[#801015] px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Visit Admissions Gateway</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 text-center sm:text-left">
            <p>© 2026 Akshara Vidyaashram. All rights reserved. TALENTRIA 26 – Open Talent Competition.</p>
            <p>Dedicated Event Showcase Page · /talentria-26/</p>
          </div>

        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          FLYER LIGHTBOX / MODAL
      ───────────────────────────────────────────────────────────── */}
      {flyerModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setFlyerModalOpen(false)}
        >
          <div 
            className="relative bg-white rounded-3xl max-w-xl w-full p-4 sm:p-6 shadow-2xl my-8 text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div className="text-left">
                <h3 className="font-heading font-black text-lg text-[#0c2340]">TALENTRIA 26 Event Flyer</h3>
                <p className="text-xs text-gray-500">Official Creative Event Poster</p>
              </div>
              <button 
                onClick={() => setFlyerModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-amber-200 bg-amber-50 shadow-inner">
              <img 
                src={talentriaFlyer} 
                alt="TALENTRIA 26 Official Flyer Poster" 
                className="w-full h-auto max-h-[75vh] object-contain mx-auto"
              />
            </div>

            <div className="pt-2 flex justify-between items-center text-xs text-gray-500">
              <span>Saturday, 21 November 2026</span>
              <a 
                href={talentriaFlyer} 
                download="Talentria-26-Flyer.jpg"
                className="font-bold text-[#9c1e22] hover:underline cursor-pointer"
              >
                Download Poster
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          FLOATING SCROLL TO TOP & MOBILE STICKY REGISTRATION BAR
      ───────────────────────────────────────────────────────────── */}
      {/* Mobile Sticky CTA Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-amber-200 p-3 shadow-lg flex items-center justify-between gap-3">
        <div className="leading-tight">
          <p className="text-[10px] font-mono uppercase text-gray-500 font-bold">TALENTRIA 26</p>
          <p className="text-xs font-black text-[#9c1e22]">Ends: 4 Nov 2026</p>
        </div>
        <button
          onClick={() => scrollToSection('registration-section')}
          className="bg-[#9c1e22] text-white font-extrabold text-xs px-5 py-2.5 rounded-full shadow-md flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Register Now</span>
        </button>
      </div>

      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-30 p-3 bg-white hover:bg-amber-50 text-[#0c2340] border border-amber-300 rounded-full shadow-lg transition-all cursor-pointer"
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-[#9c1e22]" />
        </button>
      )}

    </div>
  );
}
