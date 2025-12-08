
import React from 'react';
import { GALLERY_IMAGES } from '../constants';

export const Gallery: React.FC = () => {
  return (
    <div className="w-full pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto animate-fade-in">
      <div className="text-center mb-24">
        <h2 className="font-display text-3xl md:text-4xl tracking-[0.2em] text-primary mb-4">GALLERY</h2>
        <p className="font-serif text-secondary italic">Selected Works</p>
      </div>
      
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {GALLERY_IMAGES.map((src, index) => (
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
    </div>
  );
};
