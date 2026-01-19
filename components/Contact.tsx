import React from 'react';
import { Instagram, Facebook, Linkedin, Mail, Phone } from 'lucide-react';

// Custom X (Twitter) Icon
const XIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

// Custom IMDB Icon
const ImdbIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22 4v16c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zM9.5 17.5h-2v-9h2v9zm5.5-9h-3.5v9h2v-2.5h1.5c.8 0 1.5-.7 1.5-1.5v-3.5c0-.8-.7-1.5-1.5-1.5zm6.5 0h-3.5v9h2v-2.5h.5v2.5h1v-9zm-5.5 1.5h1v4h-1v-4zm5.5 0h.5v4h-.5v-4z"/>
  </svg>
);

const Contact: React.FC = () => {
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

  return (
    <div className="bg-surface pt-24 pb-12 px-6 border-t border-white/5 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-accent text-sm font-bold tracking-[0.4em] uppercase mb-4 block">Get In Touch</span>
        <h2 className="text-5xl md:text-8xl font-heading font-bold text-white mb-8 tracking-tighter">LET'S TALK</h2>
        <p className="text-secondary text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
          Have a project in mind? Looking for a visual partner to tell your story? 
          Drop me a line and let's create something cinematic together.
        </p>

        <div className="flex flex-col items-center gap-6 mb-16">
          <a 
            href="mailto:mravichandran.thevar@gmail.com" 
            className="inline-flex items-center gap-3 text-xl md:text-3xl text-white hover:text-accent transition-all duration-300 border-b border-white/20 hover:border-accent pb-2"
          >
            <Mail className="w-6 h-6 md:w-8 md:h-8" />
            mravichandran.thevar@gmail.com
          </a>

          <a 
            href="tel:+917506017666" 
            className="inline-flex items-center gap-3 text-xl md:text-3xl text-white hover:text-accent transition-all duration-300 border-b border-white/20 hover:border-accent pb-2"
          >
            <Phone className="w-6 h-6 md:w-8 md:h-8" />
            +91 75060 17666
          </a>
        </div>

        <div className="flex justify-center gap-6 md:gap-8 mb-20 flex-wrap">
          {[
            { icon: Instagram, href: "https://www.instagram.com/mravichandran.t/", label: "Instagram" },
            { icon: Linkedin, href: "https://in.linkedin.com/in/m-ravichandran-thevar-bb498214", label: "LinkedIn" },
            { icon: XIcon, href: "https://x.com/mrcthevar?lang=en", label: "X (Twitter)" },
            { icon: Facebook, href: "https://www.facebook.com/mravichandran.thevar", label: "Facebook" },
            { icon: ImdbIcon, href: "https://www.imdb.com/name/nm4393993/?ref_=nv_sr_srsg_0_tt_0_nm_8_in_0_q_m%2520ravichandran%2520t", label: "IMDB" }
          ].map((social, i) => (
            <a 
              key={i} 
              href={social.href} 
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-white/5 text-white hover:bg-accent hover:text-black transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              aria-label={social.label}
            >
              <social.icon size={24} />
            </a>
          ))}
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-secondary/60">
          <div className="flex gap-6 uppercase tracking-wider font-bold text-xs">
            <a href="#home" onClick={(e) => handleScrollTo(e, 'home')} className="hover:text-white transition-colors cursor-pointer">Home</a>
            <a href="#about" onClick={(e) => handleScrollTo(e, 'about')} className="hover:text-white transition-colors cursor-pointer">About</a>
            <a href="#works" onClick={(e) => handleScrollTo(e, 'works')} className="hover:text-white transition-colors cursor-pointer">Works</a>
            <a href="#contact" onClick={(e) => handleScrollTo(e, 'contact')} className="hover:text-white transition-colors cursor-pointer">Contact</a>
          </div>
          <p className="text-xs tracking-widest">© {new Date().getFullYear()} M. Ravichandran</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;