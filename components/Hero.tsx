import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Trigger entrance animations on mount
    setLoaded(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  // --- IMAGE CONFIGURATION ---
  const heroImageSrc = "/HERO1.png";

  return (
    <div className="relative h-screen min-h-[700px] w-full overflow-hidden bg-background">
      {/* Background Image - Cinematic Grayscale Landscape with Parallax */}
      <div 
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transform: `translate3d(0, ${scrollY * 0.2}px, 0)` }}
      >
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10"></div>
          <img 
            src={heroImageSrc}
            alt="Cinematic Landscape" 
            className={`w-full h-full object-cover grayscale transition-transform duration-[2.5s] ease-cinema ${loaded ? 'scale-100' : 'scale-110'}`}
          />
      </div>

      {/* Main Content Grid */}
      <div className="relative z-20 h-full max-w-[95rem] mx-auto px-6 md:px-12 flex flex-col justify-between pt-32 pb-12 md:pb-16">
        
        {/* Top Section: Spacer on left, Content on right */}
        <div className="flex flex-col md:flex-row justify-end items-start w-full mt-4 md:mt-0">
           <div 
             className={`flex flex-col items-end text-right gap-8 md:max-w-xl transition-all duration-1000 delay-500 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
             style={{ transform: `translate3d(0, ${scrollY * -0.1}px, 0)` }}
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
                 {/* Button Glow Effect */}
                 <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              </a>
           </div>
        </div>

        {/* Bottom Section: Massive Headline */}
        <div className="w-full relative overflow-hidden">
           <h1 
             className={`font-sans font-light text-[3.5rem] leading-[1] md:text-7xl lg:text-8xl xl:text-[7rem] text-white tracking-tighter md:leading-[0.9] max-w-7xl transition-transform duration-1000 delay-300 ease-cinema will-change-transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
             style={{ transform: `translate3d(0, ${scrollY * -0.2}px, 0)` }}
           >
              Transforming stories into visual experiences
           </h1>
        </div>
      </div>

      {/* Intelligent Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-30 transition-opacity duration-500 ${scrollY > 100 ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="animate-bounce text-accent">
          <ChevronDown size={32} />
        </div>
      </div>
    </div>
  );
};

export default Hero;