
import React from 'react';
import { Page, SiteContent } from '../types';

interface FooterProps {
  setPage: (page: Page) => void;
  content: SiteContent;
}

export const Footer: React.FC<FooterProps> = ({ setPage, content }) => {
  const footerSize = content.globalTypography?.footerTextSize || '14px';

  return (
    <footer className="bg-background border-t border-line py-12 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-4">
            <h2 className="font-display text-lg tracking-[0.1em] text-primary">ELY MURAL ART STUDIO</h2>
            <p className="font-serif text-secondary tracking-wide" style={{ fontSize: footerSize }}>將藝術帶入日常</p>
          </div>
          
          <div 
            className="flex flex-col md:items-end space-y-4 tracking-widest text-secondary"
            style={{ fontSize: '12px' }} // Keep small or make dynamic if needed, mainly links
          >
             <div className="flex gap-6">
                <a href="https://www.facebook.com/Elymuralartstudio" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  FACEBOOK
                </a>
                <button onClick={() => setPage(Page.ADMIN)} className="hover:text-primary transition-colors">
                  LOGIN
                </button>
             </div>
             <p>© {new Date().getFullYear()} ELY MURAL ART. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};