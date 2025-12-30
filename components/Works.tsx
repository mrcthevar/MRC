import React, { useRef, useEffect, useState } from 'react';
import SectionWrapper from './ui/SectionWrapper';
import { Project } from '../types';
import { Play, Plus } from 'lucide-react';
import VideoModal from './ui/VideoModal';

// --- PROJECTS DATA ---
// Minimal structure: Only videoUrl.
// Thumbnails are auto-generated from the YouTube ID.
const projects: Project[] = [
  { videoUrl: 'https://www.youtube.com/embed/sNMkamS_dHE' },
  { videoUrl: 'https://www.youtube.com/embed/FgSee2uS2gs' },
  { videoUrl: 'https://www.youtube.com/embed/3hNFCTm0Q2g' },
  { videoUrl: 'https://www.youtube.com/embed/FsC9gGQ37-4' },
  { videoUrl: 'https://www.youtube.com/embed/1lZvUYygJK0' },
  { videoUrl: 'https://www.youtube.com/embed/qo7cZzYMX2w' },
  { videoUrl: 'https://www.youtube.com/embed/tvHsiObv7Pg' },
  { videoUrl: 'https://www.youtube.com/embed/Jcchz8r3UHc' },
  { videoUrl: 'https://www.youtube.com/embed/EJfKYf4mbbM' },
  { videoUrl: 'https://www.youtube.com/embed/0cQ7IyXjM_o' },
  { videoUrl: 'https://www.youtube.com/embed/SDLtS1-eXF0' },
  { videoUrl: 'https://www.youtube.com/embed/aZGTqkAzBOI' },
  { videoUrl: 'https://www.youtube.com/embed/20v_DINmWXo' },
  { videoUrl: 'https://www.youtube.com/embed/Uix8kB4TPnY' },
  { videoUrl: 'https://www.youtube.com/embed/ZaPG3oH2dOM' },
  { videoUrl: 'https://www.youtube.com/embed/g_TRqg6a2mo' },
  { videoUrl: 'https://www.youtube.com/embed/9-Wfi8UZkSQ' },
  { videoUrl: 'https://www.youtube.com/embed/zhn2aBvv2BQ' },
  { videoUrl: 'https://www.youtube.com/embed/W8jgFVgmcS4' },
  { videoUrl: 'https://www.youtube.com/embed/BIxhXnaoyrQ' },
  { videoUrl: 'https://www.youtube.com/embed/mnfIeoWDKec' },
  { videoUrl: 'https://www.youtube.com/embed/JHOVsC6a93c' },
  { videoUrl: 'https://www.youtube.com/embed/3RZHBoTEbaM' },
  { videoUrl: 'https://www.youtube.com/embed/VKnyOG1CobI' },
  { videoUrl: 'https://www.youtube.com/embed/u3COrnMzNB4' },
  { videoUrl: 'https://www.youtube.com/embed/WhS6vLMX1r0' },
  { videoUrl: 'https://www.youtube.com/embed/a-GjU5mG2HY' },
  { videoUrl: 'https://www.youtube.com/embed/A9qcl8PXlXs' },
  { videoUrl: 'https://www.youtube.com/embed/WrGI28yx_aE' },
  { videoUrl: 'https://www.youtube.com/embed/qkx93FqOijQ' },
  { videoUrl: 'https://www.youtube.com/embed/69iO9-F7gDg' }
];

const ITEMS_PER_PAGE = 6;

const ProjectCard: React.FC<{ project: Project; index: number; onClick: () => void }> = ({ project, index, onClick }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetY = useRef(0);
  const currentY = useRef(0);

  // DYNAMIC THUMBNAIL LOGIC
  // Robustly extract ID even if URL has query params
  const videoId = project.videoUrl.split('embed/')[1]?.split('?')[0] || project.videoUrl.split('/').pop()?.split('?')[0];
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const fallbackUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  useEffect(() => {
    let animationFrameId: number;
    const updateParallax = () => {
      if (!imgRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isVisible = rect.top < windowHeight && rect.bottom > 0;
      
      if (isVisible) {
        const progress = 1 - (rect.top + rect.height) / (windowHeight + rect.height);
        targetY.current = (progress - 0.5) * 16; 
      }
      
      const diff = targetY.current - currentY.current;
      currentY.current += diff * 0.05; 

      imgRef.current.style.transform = `scale(1.15) translateY(${currentY.current}%)`;
      animationFrameId = requestAnimationFrame(updateParallax);
    };
    animationFrameId = requestAnimationFrame(updateParallax);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div 
      ref={containerRef}
      onClick={onClick}
      className="group relative overflow-hidden bg-surface rounded-sm cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent/20"
    >
      <div className="aspect-[16/9] overflow-hidden relative">
        <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-transparent transition-colors duration-700 ease-cinema"></div>
        <img 
          ref={imgRef}
          src={thumbnailUrl} 
          alt="Cinematic Work"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== fallbackUrl) {
                target.src = fallbackUrl;
            }
          }}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 will-change-transform grayscale group-hover:grayscale-0 transition-all duration-[800ms] ease-cinema"
          style={{ transform: 'scale(1.15)' }} 
        />
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
           <div className="w-20 h-20 rounded-full border border-white/30 backdrop-blur-sm flex items-center justify-center pl-1 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-cinema delay-100">
              <Play fill="white" className="text-white w-8 h-8" />
           </div>
        </div>
      </div>
    </div>
  );
};

const Works: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | undefined>('');
  
  // State for Load More functionality
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const openVideo = (url?: string) => {
    if (url) {
      setCurrentVideo(url);
      setModalOpen(true);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, projects.length));
  };

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  return (
    <>
      <VideoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} videoUrl={currentVideo} />
      
      <div className="py-32 px-4 md:px-8 bg-black relative z-10">
        <div className="max-w-[90rem] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-white/10 pb-8">
            <div>
               <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 tracking-tight">SELECTED WORKS</h2>
               <p className="text-secondary/70 max-w-lg text-lg leading-relaxed">
                 A curated selection of commercial and narrative projects where lighting, composition, and emotion converge.
               </p>
            </div>
          </div>

          {/* Featured Showreel - Direct Embed */}
          <SectionWrapper delay={100} className="mb-24">
              <div className="w-full relative overflow-hidden rounded-sm border border-white/10 shadow-2xl">
                <div className="aspect-video w-full bg-surface relative">
                    <iframe 
                        src="https://www.youtube.com/embed/0mPhg9Nzr74?rel=0&modestbranding=1&showinfo=0" 
                        title="Main Showreel"
                        className="w-full h-full absolute inset-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
              </div>
          </SectionWrapper>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-16">
            {visibleProjects.map((project, index) => (
              <SectionWrapper key={project.videoUrl} delay={(index % 6) * 100}>
                  <ProjectCard 
                    project={project} 
                    index={index} 
                    onClick={() => openVideo(project.videoUrl)}
                  />
              </SectionWrapper>
            ))}
          </div>
          
          {/* Load More Button */}
          {hasMore && (
            <div className="mt-24 text-center">
                <button 
                  onClick={handleLoadMore}
                  className="group inline-flex items-center gap-3 text-sm text-white border border-white/20 px-10 py-5 hover:bg-white hover:text-black transition-all duration-500 ease-cinema uppercase tracking-[0.2em] rounded-sm cursor-pointer"
                >
                    <span>Load More Projects</span>
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Works;