import React from 'react';

const brands = [
  "VIACOM18", "ZEE STUDIOS", "T-SERIES", "SONY MUSIC", "NETFLIX", "AMAZON PRIME", "DISNEY+ HOTSTAR"
];

const Brands: React.FC = () => {
  return (
    <div className="py-20 border-t border-white/5 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-secondary/60 mb-10">Trusted By Brands & Studios</p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {brands.map((brand, i) => (
            <span 
              key={i} 
              className="px-6 py-3 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 cursor-default text-sm font-bold tracking-wider"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;