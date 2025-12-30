import React from 'react';

const brands = [
  { name: 'Viacom18', src: 'https://placehold.co/300x150/050507/ffffff?text=VIACOM18' },
  { name: 'Street Smart', src: 'https://placehold.co/300x150/050507/ffffff?text=STREET+SMART' },
  { name: 'T-Series', src: 'https://placehold.co/300x150/050507/ffffff?text=T-SERIES' },
  { name: 'Paytm', src: 'https://placehold.co/300x150/050507/ffffff?text=PAYTM' },
  { name: 'TVF', src: 'https://placehold.co/300x150/050507/ffffff?text=TVF' },
  { name: 'Shemaroo', src: 'https://placehold.co/300x150/050507/ffffff?text=SHEMAROO' },
  { name: 'Polycab', src: 'https://placehold.co/300x150/050507/ffffff?text=POLYCAB' },
  { name: 'Larsen & Toubro', src: 'https://placehold.co/300x150/050507/ffffff?text=L%26T' },
  { name: 'Eros Now', src: 'https://placehold.co/300x150/050507/ffffff?text=EROS+NOW' },
  { name: 'Edelweiss', src: 'https://placehold.co/300x150/050507/ffffff?text=EDELWEISS' },
  { name: 'Zee Studios', src: 'https://placehold.co/300x150/050507/ffffff?text=ZEE+STUDIOS' },
  { name: '3S', src: 'https://placehold.co/300x150/050507/ffffff?text=3S' },
];

const Brands: React.FC = () => {
  return (
    <div className="py-24 border-t border-white/5 bg-background relative z-10">
      <div className="max-w-[90rem] mx-auto px-6">
        <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight uppercase mb-4">
              Brands I have worked with
            </h2>
            <div className="h-1 w-24 bg-accent rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 md:gap-16 items-center justify-items-center">
          {brands.map((brand, i) => (
            <div 
              key={i} 
              className="w-full flex items-center justify-center group opacity-40 hover:opacity-100 transition-opacity duration-500"
            >
              <img 
                src={brand.src} 
                alt={`${brand.name} Logo`}
                className="max-h-12 md:max-h-14 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500 ease-cinema"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;