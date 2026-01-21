import React, { useState } from 'react';
import SectionWrapper from './ui/SectionWrapper';
import { Project } from '../types';
import { Plus } from 'lucide-react';

// --- PROJECTS DATA ---
// Minimal structure: Only videoUrl.
const projects: Project[] = [
  { videoUrl: 'https://www.youtube.com/embed/sNMkamS_dHE' },
  { videoUrl: 'https://www.youtube.com/embed/FgSee2uS2gs' },
  { videoUrl: 'https://www.youtube.com/embed/3hNFCTm0Q2g' },
  { videoUrl: 'https://www.youtube.com/embed/FsC9gGQ37-4' },
  { videoUrl: 'https://www.youtube.com/embed/1lZvUYygJK0' },
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

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  // Helper to ensure clean YouTube embed params
  const getEmbedUrl = (url: string) => {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}rel=0&modestbranding=1&showinfo=0`;
  };

  return (
    <div className="group w-full relative overflow-hidden rounded-sm border border-white/10 bg-surface transition-all duration-500 ease-cinema hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.1)] hover:border-accent/40">
      <div className="aspect-video w-full relative">
        <iframe 
          src={getEmbedUrl(project.videoUrl)}
          title="Cinematic Work"
          className="w-full h-full absolute inset-0 transition-opacity duration-500 opacity-90 group-hover:opacity-100"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
        {/* Shine effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      </div>
    </div>
  );
};

const Works: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, projects.length));
  };

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  return (
    <div className="py-32 px-4 md:px-8 bg-black relative z-10">
      <div className="max-w-[90rem] mx-auto">
        <div className="flex flex-col items-center justify-center text-center mb-20 border-b border-white/10 pb-8">
             <h2 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight">WORKS</h2>
        </div>

        {/* Featured Showreel - Direct Embed */}
        <SectionWrapper delay={100} className="mb-24">
            <div className="group w-full relative overflow-hidden rounded-sm border border-white/10 shadow-2xl transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
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
                <ProjectCard project={project} />
            </SectionWrapper>
          ))}
        </div>
        
        {/* Load More Button */}
        {hasMore && (
          <div className="mt-24 text-center">
              <button 
                onClick={handleLoadMore}
                className="group inline-flex items-center gap-3 text-sm text-white border border-white/20 px-10 py-5 hover:bg-white hover:text-black transition-all duration-500 ease-cinema uppercase tracking-[0.2em] rounded-sm cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                  <span>Load More Projects</span>
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Works;