import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    const moveCursor = (e: MouseEvent) => {
      // Main dot follows instantly
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Follower trails with delay (handled via CSS transition or RAF for physics)
      // Here we use a slight delay via RAF for the "lag" feel
      if (followerRef.current) {
         // We'll let CSS handle the smooth transition for the follower
         followerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || 
          target.tagName.toLowerCase() === 'button' ||
          target.closest('a') || 
          target.closest('button') ||
          target.classList.contains('cursor-hover')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main small dot */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference -ml-1 -mt-1 will-change-transform"
      />
      
      {/* Trailing circle */}
      <div 
        ref={followerRef}
        className={`fixed top-0 left-0 border border-white/30 rounded-full pointer-events-none z-[9998] -ml-6 -mt-6 will-change-transform transition-all duration-300 ease-out ${
          hovered ? 'w-20 h-20 bg-white/5 border-accent/50 scale-100 -ml-10 -mt-10 backdrop-blur-[2px]' : 'w-12 h-12 scale-100'
        }`}
      />
    </>
  );
};

export default CustomCursor;