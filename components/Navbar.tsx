import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NavItem } from '../types';

// COMPLETE NAV ITEMS DEFINITION
const navItems: NavItem[] = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'WORKS', href: '#works' },
  { label: 'CONTACT', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      // Calculate scroll progress percentage
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 100; // Height of navbar + extra padding
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
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-20">
        {/* LOGO LINK */}
        <a 
          href="#home" 
          className="flex items-center gap-2 group cursor-pointer"
          onClick={(e) => handleNavClick(e, '#home')}
        >
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg tracking-widest text-white leading-none">M. RAVICHANDRAN</span>
              <span className="text-[0.6rem] tracking-[0.2em] text-secondary group-hover:text-accent transition-colors duration-300">DOP & FILMMAKER</span>
            </div>
        </a>

        {/* Desktop Nav - PLAIN ANCHOR TAGS */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm uppercase tracking-widest text-gray-300 hover:text-white transition-all duration-300 relative group cursor-pointer"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute -bottom-2 left-1/2 w-0 h-[2px] bg-accent transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white hover:text-accent transition-colors cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-accent to-[#9a8b2a] z-50 transition-all duration-100 ease-linear" style={{ width: `${scrollProgress * 100}%` }}></div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className="text-2xl font-heading uppercase tracking-widest text-white hover:text-accent transition-colors cursor-pointer"
          >
            {item.label}
          </a>
        ))}
        <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-white/50 hover:text-white cursor-pointer"
        >
            <X size={32} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;