
import React, { useState, useEffect } from 'react';
import { Page, SiteContent } from '../types';
import { Menu, X } from 'lucide-react';

interface NavBarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  content: SiteContent;
}

export const NavBar: React.FC<NavBarProps> = ({ currentPage, setPage, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Default fallbacks
  const menuSize = content.globalTypography?.navMenuSize || '12px';
  const subSize = content.globalTypography?.navSubtitleSize || '9px';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Updated labels with Chinese subtitles
  const navItems = [
    { label: 'HOME', sub: '首頁', value: Page.HOME },
    { label: 'SERVICES', sub: '服務', value: Page.SERVICES },
    { label: 'GALLERY', sub: '作品', value: Page.GALLERY },
    { label: 'RESERVATION', sub: '預約', value: Page.CONTACT },
  ];

  const handleNav = (page: Page) => {
    setPage(page);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          scrolled ? 'bg-background/95 backdrop-blur-sm border-line py-2' : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="cursor-pointer z-50"
            onClick={() => handleNav(Page.HOME)}
          >
            <h1 className="font-display text-xl tracking-[0.2em] text-primary">
              {content.logoTitle}
            </h1>
            <span className="text-[10px] tracking-[0.3em] text-secondary uppercase block mt-1">
              {content.logoSubtitle}
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNav(item.value)}
                className={`group relative flex flex-col items-center justify-center py-2 transition-colors duration-300
                  ${currentPage === item.value ? 'text-primary' : 'text-secondary hover:text-primary'}
                `}
              >
                <span 
                  className="tracking-[0.2em] font-sans mb-1"
                  style={{ fontSize: menuSize }}
                >
                  {item.label}
                </span>
                <span 
                  className="font-serif tracking-widest opacity-80"
                  style={{ fontSize: subSize }}
                >
                  {item.sub}
                </span>
                
                {/* Underline Animation */}
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-primary transform origin-left transition-transform duration-300 ${currentPage === item.value ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden z-50 p-2 text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-background z-40 transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="h-full flex flex-col items-center justify-center space-y-10">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNav(item.value)}
              className="group flex flex-col items-center"
            >
              <span className="text-2xl font-display tracking-widest text-primary group-hover:text-accent transition-colors mb-2">
                {item.label}
              </span>
              <span className="font-serif text-sm text-secondary tracking-widest">
                {item.sub}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
