import React, { useState, useEffect, useRef } from 'react';
import { useTypewriter } from './useTypewriter';

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showPills, setShowPills] = useState<boolean>(false);

  const typewriterText = "Glad you stopped in. Good taste tends to find us. Now, what are we building?";
  const { displayed, done } = useTypewriter(typewriterText, 38, 600);

  // Trigger pill animations 400ms after load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPills(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Mouse scrubbing algorithm for background video
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      const SENSITIVITY = 0.8;
      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      let nextTarget = targetTimeRef.current + timeOffset;

      // Clamp between 0 and duration
      nextTarget = Math.max(0, Math.min(video.duration, nextTarget));
      targetTimeRef.current = nextTarget;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = nextTarget;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) return;

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.05) {
      video.currentTime = targetTimeRef.current;
    } else {
      isSeekingRef.current = false;
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@mainframe.co");
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-white selection:text-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4"
        muted
        playsInline
        preload="auto"
        onSeeked={handleSeeked}
        className="fixed inset-0 z-0 h-full w-full object-cover object-[70%_center]"
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 z-10 flex w-full items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span 
            className="text-[21px] tracking-tight text-white sm:text-[26px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Mainframe®
          </span>
          <span className="select-none text-[25px] leading-none text-white sm:text-[30px]" style={{ letterSpacing: '-0.02em' }}>
            ✳︎
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden items-center text-[23px] text-white md:flex">
          {["Labs", "Studio", "Openings", "Shop"].map((item, idx, arr) => (
            <React.Fragment key={item}>
              <a href={`#${item.toLowerCase()}`} className="transition-opacity hover:opacity-60">
                {item}
              </a>
              {idx < arr.length - 1 && <span>,&nbsp;</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Desktop CTA */}
        <a 
          href="#contact" 
          className="hidden text-[23px] text-white underline underline-offset-2 transition-opacity hover:opacity-60 md:block"
        >
          Get in touch
        </a>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative z-20 flex flex-col items-center justify-center gap-[5px] focus:outline-none md:hidden"
          aria-label="Toggle Navigation"
        >
          <span className={`h-[2px] w-6 bg-white transition-all duration-300 ${mobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`h-[2px] w-6 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`h-[2px] w-6 bg-white transition-all duration-300 ${mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[9] flex flex-col justify-center gap-8 bg-black/90 px-8 backdrop-blur-md transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {["Labs", "Studio", "Openings", "Shop"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setMobileMenuOpen(false)}
            className="text-[32px] font-medium text-white"
          >
            {item}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMobileMenuOpen(false)}
          className="text-[32px] font-medium text-white underline underline-offset-4"
        >
          Get in touch
        </a>
      </div>

      {/* Hero Section */}
      <main className="relative z-[1] flex h-screen flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0">
        <div className="relative z-10 max-w-xl">
          {/* Blurred Intro Label */}
          <div 
            className="pointer-events-none mb-5 select-none sm:mb-6"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.3,
              fontWeight: 400,
              color: '#fff',
              filter: 'blur(4px)'
            }}
          >
            Hey there, meet A.R.I.A,<br />
            Mainframe's Adaptive Response Interface Agent
          </div>

          {/* Typewriter Text */}
          <p 
            className="mb-5 text-white sm:mb-6"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.35,
              fontWeight: 400,
              minHeight: '54px'
            }}
          >
            {displayed}
            {!done && (
              <span className="ml-[2px] inline-block h-[1.1em] w-[2px] align-middle bg-white animate-blink" />
            )}
          </p>

          {/* Action Pills */}
          <div 
            className="flex flex-wrap gap-y-1 transition-all duration-400 ease-out"
            style={{
              opacity: showPills ? 1 : 0,
              transform: showPills ? 'translateY(0)' : 'translateY(8px)'
            }}
          >
            {[
              "Pitch us an idea",
              "Come work here",
              "Send a brief hello",
              "See how we operate"
            ].map((label) => (
              <button
                key={label}
                className="mx-[0.2em] mb-[0.4em] inline-flex whitespace-nowrap items-center justify-center rounded-full border border-black/10 bg-white px-4 py-[0.3em] text-[13px] text-black transition-colors duration-200 hover:bg-black hover:text-white sm:px-5 sm:text-[15px]"
              >
                {label}
              </button>
            ))}

            {/* Email Copy Pill */}
            <button
              onClick={copyEmail}
              className="mx-[0.2em] mb-[0.4em] inline-flex whitespace-nowrap items-center justify-center gap-2 rounded-full border border-white bg-transparent px-4 py-[0.3em] text-[13px] text-white transition-colors duration-200 hover:bg-white hover:text-black sm:gap-3 sm:px-5 sm:text-[15px]"
            >
              <span>
                Reach us: <span className="underline underline-offset-1">hello@mainframe.co</span>
              </span>
              <svg 
                width="12" 
                height="12" 
                viewBox="0 0 12 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 stroke-current"
              >
                <rect x="1.5" y="3.5" width="7" height="7" rx="1" strokeWidth="1.2" />
                <path d="M3.5 1.5H9.5V7.5" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
