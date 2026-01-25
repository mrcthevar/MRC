import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  
  // Refs for direct DOM manipulation (no re-renders on scroll)
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(true);

    let rafId: number;

    const animate = () => {
      const scrollY = window.scrollY;
      
      // Parallax calculations
      // Background moves slower (0.2)
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${scrollY * 0.2}px, 0)`;
      }
      
      // Text moves opposite or slower for depth
      if (textRef.current) {
        textRef.current.style.transform = `translate3d(0, ${scrollY * -0.1}px, 0)`;
      }

      if (headlineRef.current) {
        headlineRef.current.style.transform = `translate3d(0, ${scrollY * -0.2}px, 0)`;
      }

      // Fade out scroll indicator
      if (scrollIndicatorRef.current) {
         if (scrollY > 100) {
            scrollIndicatorRef.current.style.opacity = '0';
         } else {
            scrollIndicatorRef.current.style.opacity = '1';
         }
      }

      rafId = requestAnimationFrame(animate);
    };

    // Start loop
    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const heroImageSrc = "/HERO1.png";

  return (
    // Changed h-screen to h-[100dvh] for better mobile address bar handling
    <div className="relative h-[100dvh] min-h-[500px] md:min-h-[700px] w-full overflow-hidden bg-background">
      {/* Background Image - Cinematic Grayscale Landscape with Parallax */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      >
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10"></div>
          <img 
            src={heroImageSrc}
            alt="Cinematic Landscape" 
            loading="eager"
            fetchPriority="high"
            className={`w-full h-full object-cover grayscale transition-transform duration-[2.5s] ease-cinema ${loaded ? 'scale-100' : 'scale-110'}`}
          />
      </div>

      {/* Main Content Grid */}
      <div className="relative z-20 h-full max-w-[95rem] mx-auto px-6 md:px-12 flex flex-col justify-between pt-32 pb-12 md:pb-16">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-end items-start w-full mt-4 md:mt-0">
           <div 
             ref={textRef}
             className={`flex flex-col items-end text-right gap-8 md:max-w-xl transition-all duration-1000 delay-500 ease-out will-change-transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
           >
              <p className="text-sm md:text-base font-sans font-medium tracking-wide leading-relaxed text-gray-200 uppercase drop-shadow-md">
                Hello, I'm M. Ravichandran.<br />
                Cinematographer based<br />
                in Mumbai, a visual storyteller<br />
                capturing the essence of each scene,<br />
                frame by frame, to create lasting<br />
                cinematic moments.
              </p>
              
              <a 
                href="#contact" 
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="group relative flex items-stretch border border-white/40 bg-white/5 backdrop-blur-sm hover:bg-accent/10 hover:border-accent transition-all duration-500 cursor-pointer overflow-hidden"
              >
                 <span className="flex items-center px-6 py-4 font-bold tracking-[0.1em] text-xs md:text-sm uppercase whitespace-nowrap text-white group-hover:text-white z-10">
                    Let's Connect
                 </span>
                 <div className="flex items-center justify-center px-4 border-l border-white/40 group-hover:border-accent/50 transition-colors z-10">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-rotate-45 transition-transform duration-500 text-white" />
                 </div>
                 <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              </a>
           </div>
        </div>

        {/* Bottom Section: Massive Headline */}
        <div className="w-full relative overflow-hidden">
           <h1 
             ref={headlineRef}
             className={`font-sans font-light text-[3.5rem] leading-[1] md:text-7xl lg:text-8xl xl:text-[7rem] text-white tracking-tighter md:leading-[0.9] max-w-7xl transition-transform duration-1000 delay-300 ease-cinema will-change-transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
           >
              Transforming stories into visual experiences
           </h1>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 transition-opacity duration-500"
      >
        <div className="animate-bounce text-accent">
          <ChevronDown size={32} />
        </div>
      </div>
    </div>
  );
};

export default Hero;