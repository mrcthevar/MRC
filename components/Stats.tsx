import React, { useEffect, useState, useRef } from 'react';
import { Stat } from '../types';
import { Film, Clapperboard } from 'lucide-react';

const stats: Stat[] = [
  { id: 2, value: 200, suffix: 'M+', label: 'Video Views Count' },
  { id: 3, value: 50, suffix: '+', label: 'Feature Films & Ads' },
];

const Counter: React.FC<{ end: number; duration?: number; suffix: string }> = ({ end, duration = 2500, suffix }) => {
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
      
      // Improved easing: cubic-bezier(0.25, 0.46, 0.45, 0.94) implementation
      // simple approximation: easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(ease * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="flex items-start justify-center leading-none">
        <div className="flex items-baseline gap-1">
            <span className="font-heading font-bold text-6xl md:text-8xl text-white tracking-tighter leading-none">
                {count}
            </span>
            <span className="font-heading font-bold text-accent text-6xl md:text-8xl tracking-tighter leading-none">
                {suffix}
            </span>
        </div>
    </div>
  );
};

const Stats: React.FC = () => {
  return (
    <div className="py-24 bg-background relative z-20">
      <div className="max-w-[90rem] mx-auto px-6">
        {/* Cinematic horizontal divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-16"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = index === 0 ? Film : Clapperboard;
            
            return (
                <div key={stat.id} className={`flex flex-col items-center justify-center text-center group ${index !== stats.length - 1 ? 'md:border-r border-white/5' : ''}`}>
                <div className="mb-6 opacity-0 translate-y-4 animate-[fadeIn_0.6s_ease-out_forwards] group-hover:text-accent transition-colors duration-300 text-white/50">
                    <Icon size={32} strokeWidth={1.5} />
                </div>
                <Counter end={stat.value} suffix={stat.suffix} />
                <div className="h-1 w-12 bg-accent/30 my-6 group-hover:w-24 transition-all duration-500"></div>
                <span className="text-secondary/60 text-xs md:text-sm tracking-[0.3em] uppercase font-medium group-hover:text-white transition-colors duration-300">
                    {stat.label}
                </span>
                </div>
            );
          })}
        </div>

        {/* Cinematic horizontal divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-16"></div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Stats;