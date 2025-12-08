
import React from 'react';
import { Page, SiteContent } from '../types';
import { ArrowRight } from 'lucide-react';

interface HomeProps {
  content: SiteContent;
  setPage: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ content, setPage }) => {
  // Safe defaults if heroSettings is missing (backwards compatibility)
  const settings = content.heroSettings || {
    titleFontSize: '4rem',
    titleVerticalOffset: '0px',
    subtitleFontSize: '0.875rem',
    subtitleVerticalOffset: '0px',
    buttonVerticalOffset: '32px',
    imageScale: '100',
    imagePositionY: '50',
    imagePositionX: '50',
    featheringIntensity: '80',
    overlayOpacity: '30'
  };

  const sectionTitleSize = content.globalTypography?.sectionTitleSize || '24px';
  const bodyTextSize = content.globalTypography?.bodyTextSize || '18px';

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={content.heroImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover"
            style={{
              // Use object-position for X and Y control
              objectPosition: `${settings.imagePositionX || '50'}% ${settings.imagePositionY}%`,
              transform: `scale(${parseInt(settings.imageScale) / 100})`,
              transition: 'transform 0.5s ease-out',
              // Enhanced Feathering
              maskImage: `radial-gradient(ellipse at center, black ${parseInt(settings.featheringIntensity) - 30}%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(ellipse at center, black ${parseInt(settings.featheringIntensity) - 30}%, transparent 100%)`,
            }}
          />
          <div 
            className="absolute inset-0 bg-background mix-blend-overlay"
            style={{ opacity: parseInt(settings.overlayOpacity) / 100 }}
          ></div>
        </div>

        <div className="relative z-10 text-center space-y-8 px-6 max-w-4xl fade-up">
          <p 
            className="font-sans font-light tracking-[0.4em] text-primary/80 uppercase"
            style={{ 
              fontSize: settings.subtitleFontSize,
              marginTop: settings.subtitleVerticalOffset,
              position: 'relative'
            }}
          >
            {content.heroSubtitle}
          </p>
          <h1 
            className="font-sans font-light leading-tight text-primary whitespace-pre-wrap"
            style={{ 
              fontSize: settings.titleFontSize,
              marginTop: settings.titleVerticalOffset 
            }}
          >
            {content.heroTitle}
          </h1>
          <div className="h-[1px] w-24 bg-primary/30 mx-auto my-8"></div>
          <p className="font-serif text-secondary text-sm md:text-base leading-loose max-w-lg mx-auto tracking-wide whitespace-pre-wrap">
            {content.heroDescription}
          </p>
          <div 
            className="pt-8"
            style={{ marginTop: settings.buttonVerticalOffset }}
          >
            <button 
              onClick={() => setPage(Page.SERVICES)}
              className="group relative inline-flex items-center gap-4 px-8 py-4 bg-transparent overflow-hidden"
            >
              <span className="relative z-10 font-sans text-xs tracking-[0.2em] text-primary group-hover:text-secondary transition-colors">
                VIEW COLLECTIONS
              </span>
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy / Intro */}
      <section className="py-24 md:py-40 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-24 items-start">
          <div className="md:col-span-4">
            <h3 
              className="font-sans font-light tracking-widest text-primary mb-2"
              style={{ fontSize: sectionTitleSize }}
            >
              {content.philosophyTitle}
            </h3>
            <span className="text-[10px] text-secondary tracking-[0.3em] uppercase font-sans">About Studio</span>
          </div>
          <div className="md:col-span-8 space-y-8">
            <p 
              className="font-serif text-primary/90 leading-loose whitespace-pre-wrap"
              style={{ fontSize: bodyTextSize }}
            >
              {content.aboutText}
            </p>
          </div>
        </div>
      </section>

      {/* Collections Preview Grid */}
      <section className="pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {content.services.map((service, idx) => (
             <div 
               key={service.id}
               onClick={() => setPage(Page.SERVICES)}
               className="group relative aspect-[3/4] cursor-pointer overflow-hidden"
             >
                <img 
                  src={service.imageUrl} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-colors duration-500"></div>
                <div className="absolute bottom-8 left-8 text-white z-20">
                  <span className="block text-[10px] tracking-[0.3em] mb-2 opacity-80 font-sans">0{idx + 1}</span>
                  <h4 className="font-sans font-light text-xl tracking-widest">{service.title.split(' ')[0]}</h4>
                  <p className="font-serif text-sm opacity-80 mt-1">{service.title.split(' ').slice(1).join(' ')}</p>
                </div>
             </div>
          ))}
        </div>
      </section>
    </div>
  );
};