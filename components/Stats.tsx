import React, { useEffect, useState, useRef } from 'react';
import { Stat } from '../types';

const stats: Stat[] = [
  { id: 1, value: 12, suffix: '+', label: 'Years of Experience' },
  { id: 2, value: 200, suffix: 'M+', label: 'Video Views Count' },
  { id: 3, value: 50, suffix: '+', label: 'Feature Films & Ads' },
];

const Counter: React.FC<{ end: number; duration?: number; suffix: string }> = ({ end, duration = 2000, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      
      setCount(Math.floor(ease * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="flex items-start justify-center mb-4 leading-none">
      <span className="font-heading font-bold text-6xl md:text-8xl text-white tracking-tighter leading-none">
        {count}
      </span>
      {/* Suffix updated to match the number size exactly */}
      <span className="font-heading font-bold text-accent text-6xl md:text-8xl tracking-tighter ml-1 leading-none">
        {suffix}
      </span>
    </div>
  );
};

const Stats: React.FC = () => {
  return (
    <div className="py-24 bg-background relative z-20">
      <div className="max-w-[90rem] mx-auto px-6">
        {/* Cinematic horizontal divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {stats.map((stat, index) => (
            <div key={stat.id} className={`flex flex-col items-center justify-center text-center group ${index !== stats.length - 1 ? 'md:border-r border-white/5' : ''}`}>
              <Counter end={stat.value} suffix={stat.suffix} />
              <div className="h-1 w-12 bg-accent/30 mb-4 group-hover:w-24 transition-all duration-500"></div>
              <span className="text-secondary/60 text-xs md:text-sm tracking-[0.3em] uppercase font-medium group-hover:text-white transition-colors duration-300">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Cinematic horizontal divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-12"></div>
      </div>
    </div>
  );
};

export default Stats;