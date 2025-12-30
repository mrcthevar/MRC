import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl }) => {
  const [show, setShow] = useState(false);
  // We track whether to render the iframe separate from the modal visibility
  // This allows us to unmount the iframe immediately on close (stopping audio)
  // while keeping the modal visible during the fade-out animation.
  const [shouldRenderVideo, setShouldRenderVideo] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setShouldRenderVideo(true);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      setShouldRenderVideo(false); // Stop video immediately
      const timer = setTimeout(() => setShow(false), 500); // Wait for fade out
      document.body.style.overflow = 'auto';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!show && !isOpen) return null;

  // Construct safe URL handling existing query parameters
  const getSafeUrl = (url: string) => {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}autoplay=1&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&theme=dark&color=white`;
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ease-cinema ${
        isOpen ? 'bg-black/95 backdrop-blur-xl opacity-100' : 'bg-transparent opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 text-white/50 hover:text-accent transition-colors duration-300 z-[101] group cursor-pointer"
      >
        <span className="text-sm uppercase tracking-widest mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Close</span>
        <X size={40} />
      </button>

      <div 
        className={`w-full max-w-7xl aspect-video bg-black shadow-2xl relative overflow-hidden transform transition-all duration-700 ease-cinema ${
            isOpen ? 'scale-100 translate-y-0' : 'scale-90 translate-y-12'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {shouldRenderVideo && videoUrl ? (
          <iframe 
            src={getSafeUrl(videoUrl)} 
            title="Video Player"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-secondary bg-surface">
            {/* Placeholder during transition or empty state */}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoModal;