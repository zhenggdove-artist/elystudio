
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Page, SiteContent } from './types';
import { getContent } from './services/storageService';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Gallery } from './pages/Gallery'; 
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';

// --- MAIN APP COMPONENT ---
function App() {
  const [page, setPage] = useState<Page>(Page.HOME);
  const [content, setContent] = useState<SiteContent>(getContent());

  // Refresh content from storage (e.g. after Admin save)
  const refreshContent = () => {
    setContent(getContent());
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case Page.HOME:
        return <Home content={content} setPage={setPage} />;
      case Page.SERVICES:
      case Page.ABOUT: 
        return <Services content={content} setPage={setPage} />;
      case Page.GALLERY: 
        return <Gallery content={content} />;
      case Page.CONTACT:
        return <Contact content={content} />;
      case Page.ADMIN:
        return (
          <Admin 
            onLogout={() => setPage(Page.HOME)} 
            refreshContent={refreshContent} 
          />
        );
      default:
        return <Home content={content} setPage={setPage} />;
    }
  };

  // Inject user-defined colors as CSS variables
  const appStyle = {
    '--color-primary': content.colors.primary,
    '--color-secondary': content.colors.secondary,
    '--color-accent': content.colors.accent,
    '--color-background': content.colors.background,
    '--color-surface': content.colors.surface,
    '--color-line': content.colors.line,
  } as React.CSSProperties;

  return (
    <div 
      className="min-h-screen flex flex-col bg-background font-serif selection:bg-accent/30 relative"
      style={appStyle}
    >
      {/* Global Background Layer with Feathering */}
      {content.globalBackgroundImage && (
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `url(${content.globalBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: parseInt(content.globalBackgroundOpacity || '40') / 100,
            // Feather edges to transparent using a radial mask (vignette effect)
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)',
          }}
        />
      )}

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <NavBar currentPage={page} setPage={setPage} content={content} />
        
        <main className="flex-grow">
          {renderPage()}
        </main>

        <Footer setPage={setPage} content={content} />
      </div>
    </div>
  );
}

// --- MOUNT ROOT ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
