import React from 'react';
import Parallax from './ui/Parallax';

const About: React.FC = () => {
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

  // Using a movie poster collage style image to match the user's request.
  // Ideally, this should be replaced with the specific image URL the user has.
  const aboutImageSrc = "/MRC1.jpeg";

  return (
    <div className="py-24 md:py-32 px-6 bg-background relative z-10">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-start">
        <div className="w-full md:w-1/3 relative">
             <Parallax speed={0.05}>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 relative inline-block z-10 mix-blend-difference">
                  I am...
                  <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-accent"></span>
                </h2>
             </Parallax>
             <Parallax speed={-0.05} className="relative z-0">
               {/* 
                  UPDATED IMAGE: Poster Wall / Collage 
                  Replace 'aboutImageSrc' with your custom uploaded image URL if needed.
               */}
               <img 
                src={aboutImageSrc}
                alt="Cinematic Works Collage" 
                className="w-full h-auto rounded-lg grayscale hover:grayscale-0 transition-all duration-700 opacity-90 hover:opacity-100 shadow-2xl border border-white/10"
              />
            </Parallax>
        </div>
       
        <div className="w-full md:w-2/3 md:pt-20">
          <Parallax speed={0.02}>
            <div className="space-y-6 text-lg text-secondary leading-relaxed">
              <p>
                I am a dedicated cinematographer based in Mumbai, with a passion that transcends the mere technicalities of the camera. For me, cinematography is about the emotional resonance of light, the deliberate composition of a frame, and the subtle dance of shadows that breathe life into a story.
              </p>
              <p>
                I have honed my craft across feature films, commercials, and music videos. My approach is deeply collaborative; I believe in understanding the director's vision and elevating it through visual language.
              </p>
              <p>
                I strive to create visuals that are not just seen, but felt.
              </p>
            </div>
            <div className="mt-10">
              <a 
                href="#works" 
                onClick={(e) => handleScrollTo(e, 'works')}
                className="inline-flex items-center gap-2 text-accent font-bold tracking-widest uppercase hover:text-white transition-colors group"
              >
                See My Works 
                <span className="block h-[1px] w-8 bg-accent group-hover:w-16 transition-all duration-300"></span>
              </a>
            </div>
          </Parallax>
        </div>
      </div>
    </div>
  );
};

export default About;