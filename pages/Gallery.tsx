
import React from 'react';
import { SiteContent } from '../types';

interface GalleryProps {
  content: SiteContent;
}

export const Gallery: React.FC<GalleryProps> = ({ content }) => {
  const headerSize = content?.globalTypography?.sectionTitleSize || '24px';
  const subSize = content?.globalTypography?.bodyTextSize || '16px';
  const galleryImages = content?.galleryImages || [];

  return (
    <div className="w-full pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto animate-fade-in">
      <div className="text-center mb-24">
        <h2
          className="font-display tracking-[0.2em] text-primary mb-4"
          style={{ fontSize: headerSize }}
        >
          GALLERY
        </h2>
        <p
          className="font-serif text-secondary italic"
          style={{ fontSize: subSize }}
        >
          Selected Works
        </p>
      </div>

      {galleryImages.length === 0 ? (
        <p className="text-center text-secondary font-serif italic py-12">
          目前沒有作品。請在後台添加圖片。
        </p>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryImages.map((src, index) => (
            <div key={index} className="break-inside-avoid relative group cursor-pointer overflow-hidden">
               <img
                 src={src}
                 alt={`Gallery ${index + 1}`}
                 className="w-full h-auto grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
               />
               <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
