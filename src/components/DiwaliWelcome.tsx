import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const DISPLAY_DURATION = 4800; // Visible for ~4.8 seconds before smoothly disappearing
const FADE_OUT_DURATION = 700; // Smooth 0.7s fade-out transition

interface Particle {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  type: 'confetti' | 'sparkle' | 'ember';
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  tilt: number;
  tiltSpeed: number;
  alpha: number;
  alphaSpeed: number;
}

export default function DiwaliWelcome() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Show welcome animation for all visitors
  useEffect(() => {
    // Check reduced motion accessibility preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(motionQuery.matches);
    }

    // Always show for all visitors
    setIsVisible(true);
  }, []);

  // Timer to initiate smooth fade-out after ~4.8 seconds
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      dismissGreeting();
    }, DISPLAY_DURATION);

    // Escape key listener for accessibility
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dismissGreeting();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  // Smooth dismiss handler
  const dismissGreeting = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, FADE_OUT_DURATION);
  };

  // Rich golden confetti flakes, sparkles & warm light particles
  useEffect(() => {
    if (!isVisible || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setupCanvasSize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setupCanvasSize();

    const handleResize = () => {
      setupCanvasSize();
    };
    window.addEventListener('resize', handleResize);

    // Festive golden palette: metallic gold, amber, champagne, warm yellow
    const goldPalette = [
      '#FFDF00', // Royal Gold
      '#F59E0B', // Warm Amber
      '#D4AF37', // Metallic Gold
      '#FBBF24', // Amber 400
      '#FDE047', // Radiant Gold
      '#FFF3B0', // Champagne Cream
      '#E6A100', // Deep Gold
    ];

    const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const typeRand = Math.random();
      const type: 'confetti' | 'sparkle' | 'ember' = 
        typeRand < 0.55 ? 'confetti' : typeRand < 0.85 ? 'sparkle' : 'ember';

      return {
        x: Math.random() * width,
        y: Math.random() * height - height * 0.2,
        w: Math.random() * 6 + 5,
        h: Math.random() * 8 + 6,
        color: goldPalette[Math.floor(Math.random() * goldPalette.length)],
        type,
        vx: (Math.random() - 0.5) * 1.2,
        vy: type === 'confetti' ? Math.random() * 1.4 + 1.2 : Math.random() * 0.8 + 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() * 0.04 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
        tilt: Math.random() * Math.PI * 2,
        tiltSpeed: Math.random() * 0.06 + 0.03,
        alpha: Math.random() * 0.4 + 0.6,
        alphaSpeed: Math.random() * 0.02 + 0.01,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Motion physics
        p.rotation += p.rotationSpeed;
        p.tilt += p.tiltSpeed;
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.tilt) * 0.8;

        // Wrap around bottom/sides
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.globalAlpha = p.alpha;

        if (p.type === 'confetti') {
          // 3D flipping metallic golden foil confetti ribbon/flake
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          const currentTilt = Math.sin(p.tilt);

          ctx.fillStyle = p.color;
          ctx.beginPath();
          // Draw rotated, 3D-compressed rectangle for fluttering paper foil effect
          ctx.fillRect(-p.w / 2, (-p.h / 2) * currentTilt, p.w, p.h * Math.abs(currentTilt));

          // Subtle reflective shine highlight on face
          if (Math.abs(currentTilt) > 0.5) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.fillRect(-p.w / 2, (-p.h / 4) * currentTilt, p.w, (p.h / 4) * Math.abs(currentTilt));
          }
        } else if (p.type === 'sparkle') {
          // 4-point golden twinkling star
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.4;
          const s = p.w * 0.85;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.lineTo(0, s);
          ctx.moveTo(-s, 0);
          ctx.lineTo(s, 0);
          ctx.stroke();

          // Center bright white spark
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(0, 0, 1.8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Glowing warm golden light orb
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.w * 1.5);
          gradient.addColorStop(0, '#FFFFFF');
          gradient.addColorStop(0.35, p.color);
          gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.w * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isVisible, prefersReducedMotion]);

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Diwali Welcome Greeting"
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 select-none ${
        isFadingOut ? 'diwali-overlay-exit' : 'diwali-overlay-enter'
      }`}
      style={{
        backgroundColor: 'rgba(5, 20, 36, 0.88)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      onClick={(e) => {
        // Dismiss if user clicks outside the modal card
        if (e.target === e.currentTarget) dismissGreeting();
      }}
    >
      {/* Background ambient golden aura */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 48%, rgba(212, 175, 55, 0.22) 0%, rgba(184, 146, 41, 0.1) 40%, transparent 75%)',
        }}
      />

      {/* Golden Festive Confetti & Light Particle Canvas */}
      {!prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none w-full h-full"
        />
      )}

      {/* Centered Welcome Card */}
      <div
        className={`relative w-full max-w-lg rounded-2xl sm:rounded-3xl border border-amber-400/40 p-6 sm:p-10 text-center shadow-2xl ${
          isFadingOut ? 'diwali-card-exit' : 'diwali-card-enter'
        }`}
        style={{
          background: 'linear-gradient(180deg, rgba(16, 42, 67, 0.96) 0%, rgba(12, 35, 64, 0.98) 50%, rgba(5, 20, 36, 0.99) 100%)',
          boxShadow: '0 0 60px rgba(212, 175, 55, 0.28), inset 0 1px 1px rgba(254, 243, 199, 0.3)',
        }}
      >
        {/* Top-Right Discreet Dismiss Button */}
        <button
          onClick={dismissGreeting}
          aria-label="Skip welcome message"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-amber-200/80 hover:text-amber-100 hover:bg-amber-500/20 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/50 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Traditional Diya with Flickering Radiant Light */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <div className="relative">
            {/* Soft radiant ambient glow ring behind Diya */}
            <div
              className={`absolute -inset-4 rounded-full bg-amber-400/25 blur-xl ${
                prefersReducedMotion ? '' : 'animate-pulse'
              }`}
              style={{ animationDuration: '3s' }}
            />

            {/* Stylized Golden Brass Diya SVG */}
            <svg
              className="w-20 h-20 sm:w-24 sm:h-24 relative drop-shadow-[0_4px_22px_rgba(245,158,11,0.6)]"
              viewBox="0 0 120 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Radiating Light Aura Wave */}
              <circle cx="60" cy="30" r="24" fill="url(#radianceGlow)" opacity="0.45" />

              {/* Flame Outer Halo */}
              <path
                d="M60 8 C65 20, 72 28, 60 44 C48 28, 55 20, 60 8 Z"
                fill="url(#outerFlame)"
                className={prefersReducedMotion ? '' : 'diwali-flame-pulse'}
              />

              {/* Flame Inner Core */}
              <path
                d="M60 16 C63 24, 67 29, 60 40 C53 29, 57 24, 60 16 Z"
                fill="url(#innerFlame)"
              />

              {/* Flame Center White Spark */}
              <ellipse cx="60" cy="32" rx="2.5" ry="5" fill="#FFFFFF" opacity="0.95" />

              {/* Diya Base / Oil Lamp Body */}
              <path
                d="M20 48 Q60 56 100 48 Q60 42 20 48 Z"
                fill="url(#brassLip)"
                stroke="#d4af37"
                strokeWidth="1"
              />

              {/* Lamp Bowl */}
              <path
                d="M22 48 C28 72, 92 72, 98 48 C85 64, 35 64, 22 48 Z"
                fill="url(#brassBowl)"
                stroke="#b89229"
                strokeWidth="1.2"
              />

              {/* Ornate Gold Engraving on Bowl */}
              <path
                d="M36 57 Q60 66 84 57"
                stroke="#fef3c7"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.85"
              />
              <circle cx="60" cy="62" r="1.5" fill="#fef3c7" />
              <circle cx="48" cy="59" r="1.2" fill="#fef3c7" />
              <circle cx="72" cy="59" r="1.2" fill="#fef3c7" />

              {/* Diya Pedestal Stand */}
              <path
                d="M45 68 L50 78 Q60 80 70 78 L75 68 Z"
                fill="url(#brassStand)"
              />
              <ellipse cx="60" cy="78" rx="14" ry="3.5" fill="#b89229" stroke="#d4af37" strokeWidth="0.8" />

              {/* SVG Gradients */}
              <defs>
                <radialGradient id="radianceGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.85" />
                  <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                </radialGradient>

                <linearGradient id="outerFlame" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="35%" stopColor="#f59e0b" />
                  <stop offset="85%" stopColor="#ea580c" />
                  <stop offset="100%" stopColor="#c2410c" />
                </linearGradient>

                <linearGradient id="innerFlame" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="40%" stopColor="#fef08a" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>

                <linearGradient id="brassBowl" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#eab308" />
                  <stop offset="40%" stopColor="#ca8a04" />
                  <stop offset="75%" stopColor="#a16207" />
                  <stop offset="100%" stopColor="#78350f" />
                </linearGradient>

                <linearGradient id="brassLip" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>

                <linearGradient id="brassStand" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ca8a04" />
                  <stop offset="100%" stopColor="#78350f" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* 1. Centred Heading: "Happy Diwali" */}
        <h2
          className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide mb-3"
          style={{
            background: 'linear-gradient(135deg, #FFFBEB 0%, #FDE68A 30%, #F59E0B 70%, #D4AF37 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 20px rgba(245, 158, 11, 0.35)',
          }}
        >
          Happy Diwali
        </h2>

        {/* Elegant Gold Divider with Floral/Diamond Motif */}
        <div className="flex items-center justify-center gap-3 my-4 sm:my-5 opacity-85">
          <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent via-amber-400 to-amber-300" />
          <div className="w-1.5 h-1.5 rotate-45 bg-amber-300 shadow-[0_0_8px_#fbbf24]" />
          <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent via-amber-400 to-amber-300" />
        </div>

        {/* 2. Centred Welcome Message Blessing */}
        <p className="font-sans text-sm sm:text-base md:text-lg text-amber-50/95 leading-relaxed max-w-md mx-auto font-light px-2">
          “May the light of Diwali illuminate every child’s journey of learning, discovery and growth.”
        </p>

        {/* 3. School Signature: "— Akshara Vidyaashram" */}
        <p className="font-heading text-sm sm:text-base text-amber-300 font-semibold tracking-wider mt-4 sm:mt-5 opacity-95">
          — Akshara Vidyaashram
        </p>

        {/* Discreet Continue / Skip Action */}
        <div className="mt-6 sm:mt-8 pt-4 border-t border-amber-500/20">
          <button
            onClick={dismissGreeting}
            className="text-xs sm:text-sm font-sans tracking-wider text-amber-200/80 hover:text-amber-100 transition-colors uppercase cursor-pointer py-1.5 px-4 rounded-full hover:bg-amber-400/10 focus:outline-none focus:ring-1 focus:ring-amber-300/40"
          >
            Enter Website →
          </button>
        </div>

        {/* Subtle timer progress hairline at bottom */}
        <div className="absolute bottom-0 left-6 right-6 h-[1.5px] bg-amber-500/15 overflow-hidden rounded-full">
          <div
            className={`h-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400 ${
              prefersReducedMotion ? 'w-full' : 'diwali-progress-bar'
            }`}
            style={{
              animationDuration: `${DISPLAY_DURATION}ms`,
            }}
          />
        </div>
      </div>

      {/* Scoped CSS for Diwali fade entrance, exit, flame flicker, and progress animation */}
      <style>{`
        @keyframes diwaliOverlayFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes diwaliCardFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .diwali-overlay-enter {
          animation: diwaliOverlayFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .diwali-card-enter {
          animation: diwaliCardFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .diwali-overlay-exit {
          opacity: 0 !important;
          transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1) !important;
          pointer-events: none !important;
        }
        .diwali-card-exit {
          opacity: 0 !important;
          transform: scale(0.96) translateY(6px) !important;
          transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        @keyframes diwaliFlamePulse {
          0%, 100% {
            transform: scale(1) translateY(0);
            transform-origin: 60px 44px;
            filter: drop-shadow(0 0 12px rgba(245, 158, 11, 0.75));
          }
          50% {
            transform: scale(1.08, 0.94) translateY(-1px);
            transform-origin: 60px 44px;
            filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.95));
          }
        }
        .diwali-flame-pulse {
          animation: diwaliFlamePulse 1.8s ease-in-out infinite;
        }
        @keyframes diwaliProgressBar {
          0% {
            width: 0%;
            opacity: 0.85;
          }
          100% {
            width: 100%;
            opacity: 0.2;
          }
        }
        .diwali-progress-bar {
          animation: diwaliProgressBar linear forwards;
        }
      `}</style>
    </div>
  );
}
