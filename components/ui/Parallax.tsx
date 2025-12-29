import React, { useEffect, useRef } from 'react';

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; 
  className?: string;
  horizontal?: boolean;
  easing?: number; // 0.05 (slow/heavy) to 1 (instant)
}

const Parallax: React.FC<ParallaxProps> = ({ 
  children, 
  speed = 0.1, 
  className = "", 
  horizontal = false,
  easing = 0.08 // The "Framer feel" sweet spot
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  
  // We track "target" (where it should be based on scroll) 
  // and "current" (where it actually is right now)
  const targetOffset = useRef(0);
  const currentOffset = useRef(0);

  useEffect(() => {
    let animationFrameId: number;

    const updatePosition = () => {
      if (!containerRef.current || !targetRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate visibility
      const top = rect.top;
      const height = rect.height;
      const isVisible = top < windowHeight + 100 && top + height > -100;

      if (isVisible) {
        // 1. Calculate the Target Position
        const elementCenter = top + height / 2;
        const viewportCenter = windowHeight / 2;
        const distFromCenter = elementCenter - viewportCenter;
        
        // This is where we want to be
        targetOffset.current = distFromCenter * speed * -1;
      }
      
      // 2. Interpolate Current to Target (The "Smoothness")
      // Formula: current = current + (target - current) * easing
      const diff = targetOffset.current - currentOffset.current;
      
      // Stop calculation if close enough to save resources
      if (Math.abs(diff) > 0.01 || isVisible) {
        currentOffset.current += diff * easing;
        
        const transform = horizontal 
          ? `translate3d(${currentOffset.current}px, 0, 0)` 
          : `translate3d(0, ${currentOffset.current}px, 0)`;

        targetRef.current.style.transform = transform;
      }
      
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    // Start the loop
    animationFrameId = requestAnimationFrame(updatePosition);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [speed, horizontal, easing]);

  return (
    <div ref={containerRef} className={`${className} relative overflow-visible`}>
      <div ref={targetRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
};

export default Parallax;