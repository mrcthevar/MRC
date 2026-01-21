import React from 'react';

const brands = [
  { name: 'Viacom18', src: '/1.png' },
  { name: 'Street Smart', src: '/2.png' },
  { name: 'T-Series', src: '/3.png' },
  { name: 'Paytm', src: '/4.png' },
  { name: 'TVF', src: '/5.png' },
  { name: 'Shemaroo', src: '/6.png' },
  { name: 'Polycab', src: '/7.png' },
  { name: 'Larsen & Toubro', src: '/8.png' },
  { name: 'Eros Now', src: '/9.png' },
  { name: 'Edelweiss', src: '/10.png' },
  { name: 'Zee Studios', src: '/11.png' },
  { name: '3S Movies', src: '/12.png' },
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
                className="max-h-12 md:max-h-14 w-auto object-contain transition-all duration-500 ease-cinema"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;