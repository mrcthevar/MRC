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
                I am a Mumbai-based cinematographer with a foundation rooted in both technology and storytelling. My journey began in Computer Science and evolved into filmmaking during the early rise of digital cameras in India.
              </p>
              
              <p>
                “I gained early exposure to cutting-edge digital workflows and went on to work on feature films during a transformative period in Indian cinema, as digital cameras reshaped the filmmaking landscape. I had the opportunity to work closely under the mentorship of Ram Gopal Varma, as a cinematographer —including his acclaimed film <span className="italic text-gray-300">The Attacks of 26/11</span>.
              </p>
              
              <p>
                My work spans 50+ feature films, commercials, and advertising projects, with cumulative viewership exceeding 200 million+ views.
              </p>
              
              <p>
                I believe cinematography is more than capturing images—it’s about crafting emotion through light, composition, and movement. I thrive in collaborative environments and focus on creating visuals that elevate the director’s vision and connect deeply with audiences.
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