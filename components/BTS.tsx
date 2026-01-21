import React from 'react';

// --- CONFIGURATION ---
// To add your own images:
// 1. Upload your image files to the 'public' folder.
// 2. Replace the 'src' URLs below with your filenames (e.g., '/my-bts-image.jpg').
const btsImages = [
  { 
    id: 1, 
    src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop', 
    alt: 'Cinematography Set', 
    className: 'md:col-span-2 md:row-span-2' 
  },
  { 
    id: 2, 
    src: 'https://images.unsplash.com/photo-1478720568477-152d9b164e63?q=80&w=1000&auto=format&fit=crop', 
    alt: 'Camera Rig', 
    className: 'md:col-span-1 md:row-span-1' 
  },
  { 
    id: 3, 
    src: 'https://images.unsplash.com/photo-1533519897368-80e227878d05?q=80&w=1000&auto=format&fit=crop', 
    alt: 'Lighting Setup', 
    className: 'md:col-span-1 md:row-span-1' 
  },
  { 
    id: 4, 
    src: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop', 
    alt: 'Director Monitor', 
    className: 'md:col-span-1 md:row-span-2' 
  },
  { 
    id: 5, 
    src: 'https://images.unsplash.com/photo-1598518141892-06ba05f87bbe?q=80&w=1000&auto=format&fit=crop', 
    alt: 'Filming Action', 
    className: 'md:col-span-1 md:row-span-1' 
  },
  { 
    id: 6, 
    src: 'https://images.unsplash.com/photo-1585675100412-167822453ebf?q=80&w=1000&auto=format&fit=crop', 
    alt: 'Production Crew', 
    className: 'md:col-span-1 md:row-span-1' 
  },
];

const BTS: React.FC = () => {
  return (
    <div className="py-24 bg-background relative z-10 border-t border-white/5">
         {/* Section Header */}
         <div className="max-w-[90rem] mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
             <div>
                <span className="text-accent text-sm font-bold tracking-[0.4em] uppercase mb-2 block">Gallery</span>
                <h2 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight">LIFE ON SET</h2>
             </div>
             <p className="text-secondary text-lg max-w-md text-right md:text-right">
                Behind the scenes, where the magic happens. <br/>The chaos, the calm, and the craft.
             </p>
         </div>

         {/* Bento Grid Gallery */}
         <div className="max-w-[90rem] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
             {btsImages.map((img) => (
                 <div 
                    key={img.id} 
                    className={`relative group overflow-hidden rounded-sm ${img.className} border border-white/5`}
                 >
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                     <img 
                        src={img.src} 
                        alt={img.alt} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-cinema transform group-hover:scale-105"
                     />
                     <div className="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 translate-y-2 group-hover:translate-y-0">
                        <span className="text-white text-xs font-bold tracking-widest uppercase bg-black/50 backdrop-blur-md px-2 py-1">
                            {img.alt}
                        </span>
                     </div>
                 </div>
             ))}
         </div>
    </div>
  );
};

export default BTS;