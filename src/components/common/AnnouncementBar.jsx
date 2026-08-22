import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, X } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const announcements = siteConfig.announcements || [];

  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  if (!isVisible || announcements.length === 0) return null;

  const currentAnnouncement = announcements[currentIndex];

  return (
    <aside aria-label="Announcement" className="relative bg-luxury-black text-[#F4F2EB] py-2 px-4 text-[11px] font-medium tracking-widest uppercase transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center pr-6">
        <Link
          to={currentAnnouncement.link || '/shop'}
          className="inline-flex items-center gap-1.5 hover:text-white transition-colors duration-200"
        >
          <span className="truncate">{currentAnnouncement.text}</span>
          <ChevronRight className="w-3 h-3 flex-shrink-0 opacity-70" />
        </Link>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        aria-label="Dismiss announcement bar"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};

export default AnnouncementBar;
