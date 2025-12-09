
import React, { useState, useEffect } from 'react';
import { SiteContent, Booking, SiteColors, HeroSettings, ServiceTypography, GlobalTypography, MobileTypography, GalleryLayout, ServicesLayout, GalleryTextPosition, GalleryTypography, GalleryImage } from '../types';
import { getContent, saveContent, getBookings } from '../services/storageService';
import { Save, LogOut, Lock, RefreshCcw, Plus, Trash2, ChevronUp, ChevronDown, Download, Copy } from 'lucide-react';

interface AdminProps {
  onLogout: () => void;
  refreshContent: () => void;
}

export const Admin: React.FC<AdminProps> = ({ onLogout, refreshContent }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'content' | 'bookings' | 'design' | 'typography' | 'gallery'>('bookings');
  const [content, setContent] = useState<SiteContent>(getContent());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportedCode, setExportedCode] = useState('');

  useEffect(() => {
    setBookings(getBookings());
    const prev = getContent();

    // Merge with defaults to ensure all fields exist
    const defaultHeroSettings = {
        titleFontSize: '64px',
        titleVerticalOffset: '0px',
        subtitleFontSize: '12px',
        subtitleVerticalOffset: '0px',
        buttonVerticalOffset: '32px',
        imageScale: '100',
        imagePositionY: '50',
        imagePositionX: '50',
        featheringIntensity: '85',
        overlayOpacity: '30'
    };
    const defaultServiceTypography = {
      titleSize: '36px',
      priceSize: '30px',
      descriptionSize: '16px'
    };
    const defaultGlobalTypography = {
      navMenuSize: '12px',
      navSubtitleSize: '9px',
      sectionTitleSize: '24px',
      bodyTextSize: '16px',
      footerTextSize: '14px',
    };
    const defaultMobileTypography = {
      navMenuSize: '10px',
      navSubtitleSize: '8px',
      sectionTitleSize: '20px',
      bodyTextSize: '14px',
      footerTextSize: '12px',
      heroTitleSize: '10px',
      heroSubtitleSize: '10px'
    };
    const defaultGalleryTypography = {
      captionSize: '14px',
      mobileCaptionSize: '12px'
    };

    setContent({
        ...prev,
        heroSettings: { ...defaultHeroSettings, ...prev.heroSettings },
        serviceTypography: { ...defaultServiceTypography, ...prev.serviceTypography },
        globalTypography: { ...defaultGlobalTypography, ...prev.globalTypography },
        globalBackgroundOpacity: prev.globalBackgroundOpacity || '40',
        galleryImages: prev.galleryImages || [],
        galleryLayout: prev.galleryLayout || 'masonry',
        mobileGalleryLayout: prev.mobileGalleryLayout || 'single',
        galleryTextPosition: prev.galleryTextPosition || 'bottom',
        galleryTypography: { ...defaultGalleryTypography, ...prev.galleryTypography },
        servicesLayout: prev.servicesLayout || 'cards',
        formspreeId: prev.formspreeId || '',
        mobileTypography: { ...defaultMobileTypography, ...prev.mobileTypography }
    });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'ely0217') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('密碼錯誤 Incorrect Password');
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    saveContent(content);
    refreshContent();
    setTimeout(() => setIsSaving(false), 1000);
  };

  const handleTextChange = (field: keyof SiteContent, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const handleHeroSettingChange = (field: keyof HeroSettings, value: string) => {
    setContent(prev => ({
        ...prev,
        heroSettings: { ...prev.heroSettings, [field]: value }
    }));
  };
  
  const handleServiceTypographyChange = (field: keyof ServiceTypography, value: string) => {
    setContent(prev => ({
        ...prev,
        serviceTypography: { ...prev.serviceTypography, [field]: value }
    }));
  };
  
  const handleGlobalTypographyChange = (field: keyof GlobalTypography, value: string) => {
    setContent(prev => ({
        ...prev,
        globalTypography: { ...prev.globalTypography, [field]: value }
    }));
  };

  const handleMobileTypographyChange = (field: keyof MobileTypography, value: string) => {
    setContent(prev => ({
        ...prev,
        mobileTypography: { ...prev.mobileTypography, [field]: value }
    }));
  };

  const handleColorChange = (field: keyof SiteColors, value: string) => {
    setContent(prev => ({
      ...prev,
      colors: { ...prev.colors, [field]: value }
    }));
  };

  const handleServiceChange = (index: number, field: string, value: string) => {
    const newServices = [...content.services];
    // @ts-ignore
    newServices[index][field] = value;
    setContent(prev => ({ ...prev, services: newServices }));
  };

  const handleAddGalleryImage = () => {
    const newImages = [...(content.galleryImages || []), { url: '', caption: '' }];
    setContent(prev => ({ ...prev, galleryImages: newImages }));
  };

  const handleDeleteGalleryImage = (index: number) => {
    const newImages = content.galleryImages.filter((_, i) => i !== index);
    setContent(prev => ({ ...prev, galleryImages: newImages }));
  };

  const handleGalleryImageChange = (index: number, field: 'url' | 'caption', value: string) => {
    const newImages = [...content.galleryImages];
    newImages[index][field] = value;
    setContent(prev => ({ ...prev, galleryImages: newImages }));
  };

  const handleMoveGalleryImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...content.galleryImages];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newImages.length) return;
    [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
    setContent(prev => ({ ...prev, galleryImages: newImages }));
  };

  const handleGalleryTypographyChange = (field: keyof GalleryTypography, value: string) => {
    setContent(prev => ({
        ...prev,
        galleryTypography: { ...prev.galleryTypography, [field]: value }
    }));
  };

  const handleExportSettings = () => {
    const code = `
import { SiteContent } from './types';

export const INITIAL_CONTENT: SiteContent = ${JSON.stringify(content, null, 2)};

export const GALLERY_IMAGES = INITIAL_CONTENT.galleryImages;
`;
    setExportedCode(code);
    setShowExportModal(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(exportedCode);
    alert('程式碼已複製到剪貼簿！');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-8 text-center">
          <div>
            <h2 className="font-sans font-light text-2xl tracking-[0.2em] text-primary mb-2">ADMIN PANEL</h2>
            <p className="font-serif text-secondary text-sm">請輸入密碼以進入後台</p>
          </div>
          <div className="relative">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent border-b border-line py-3 text-center text-primary focus:border-primary outline-none transition-colors font-sans tracking-widest"
              autoFocus
            />
            <Lock className="absolute left-0 top-3 text-secondary w-4 h-4" />
          </div>
          {loginError && <p className="text-red-800 text-xs tracking-widest">{loginError}</p>}
          <button 
            type="submit"
            className="w-full bg-primary text-white py-4 text-xs tracking-[0.2em] hover:bg-accent transition-colors"
          >
            ENTER
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 pb-32">
      <div className="flex justify-between items-center mb-12 pb-4 border-b border-line">
        <h2 className="font-sans font-light text-2xl tracking-widest text-primary">ADMIN DASHBOARD</h2>
        <button onClick={() => { setIsAuthenticated(false); onLogout(); }} className="flex items-center gap-2 text-xs tracking-widest font-sans hover:text-red-800 transition-colors">
          <LogOut size={14} /> LOGOUT
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-12">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-8 py-3 text-xs tracking-widest transition-colors ${activeTab === 'bookings' ? 'bg-primary text-white' : 'bg-transparent text-primary border border-line hover:border-primary'}`}
        >
          BOOKINGS ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`px-8 py-3 text-xs tracking-widest transition-colors ${activeTab === 'content' ? 'bg-primary text-white' : 'bg-transparent text-primary border border-line hover:border-primary'}`}
        >
          CONTENT
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-8 py-3 text-xs tracking-widest transition-colors ${activeTab === 'gallery' ? 'bg-primary text-white' : 'bg-transparent text-primary border border-line hover:border-primary'}`}
        >
          GALLERY ({content.galleryImages?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('design')}
          className={`px-8 py-3 text-xs tracking-widest transition-colors ${activeTab === 'design' ? 'bg-primary text-white' : 'bg-transparent text-primary border border-line hover:border-primary'}`}
        >
          DESIGN
        </button>
        <button
          onClick={() => setActiveTab('typography')}
          className={`px-8 py-3 text-xs tracking-widest transition-colors ${activeTab === 'typography' ? 'bg-primary text-white' : 'bg-transparent text-primary border border-line hover:border-primary'}`}
        >
          TYPOGRAPHY
        </button>
      </div>

      {activeTab === 'bookings' && (
        <div className="space-y-4 animate-fade-in">
          {bookings.length === 0 ? (
            <p className="font-serif text-secondary italic text-center py-12">目前沒有預約資料。</p>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="bg-white p-8 shadow-sm space-y-4">
                <div className="flex justify-between items-start border-b border-line pb-4">
                  <div>
                    <h3 className="font-sans text-lg tracking-wide text-primary">{booking.name}</h3>
                    <span className="text-xs font-serif text-secondary block mt-1">{booking.surfaceType}</span>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-background text-[10px] tracking-widest uppercase text-primary border border-line mb-1">
                      {booking.status}
                    </span>
                    <p className="text-[10px] text-secondary font-sans tracking-wide">{new Date(booking.timestamp).toLocaleString()}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 text-sm font-serif text-secondary">
                  <div>
                    <span className="block text-[10px] tracking-widest text-primary/50 uppercase mb-1">Contact</span>
                    {booking.contact}
                  </div>
                  <div>
                    <span className="block text-[10px] tracking-widest text-primary/50 uppercase mb-1">Location</span>
                    {booking.location}
                  </div>
                  <div>
                    <span className="block text-[10px] tracking-widest text-primary/50 uppercase mb-1">Expected Date</span>
                    {booking.date}
                  </div>
                </div>
                {booking.message && (
                  <div className="bg-background p-4 text-sm font-serif text-secondary leading-relaxed mt-4">
                    <span className="block text-[10px] tracking-widest text-primary/50 uppercase mb-2">Message</span>
                    {booking.message}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'typography' && (
         <div className="space-y-16 animate-fade-in">
           {/* Global Typography */}
           <section className="space-y-6">
             <h3 className="font-sans text-sm tracking-[0.2em] border-l-2 border-primary pl-4 text-primary uppercase">Global Typography (全站文字大小)</h3>
             <div className="grid md:grid-cols-3 gap-6">
                <div>
                   <label className="block text-xs text-secondary mb-2">選單文字大小 (Menu Size)</label>
                   <input
                     className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-sans"
                     value={content.globalTypography?.navMenuSize || '12px'}
                     onChange={(e) => handleGlobalTypographyChange('navMenuSize', e.target.value)}
                     placeholder="e.g. 12px"
                   />
                </div>
                <div>
                   <label className="block text-xs text-secondary mb-2">選單副標大小 (Menu Sub Size)</label>
                   <input
                     className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-sans"
                     value={content.globalTypography?.navSubtitleSize || '9px'}
                     onChange={(e) => handleGlobalTypographyChange('navSubtitleSize', e.target.value)}
                     placeholder="e.g. 9px"
                   />
                </div>
                <div>
                   <label className="block text-xs text-secondary mb-2">頁尾文字大小 (Footer Size)</label>
                   <input
                     className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-sans"
                     value={content.globalTypography?.footerTextSize || '14px'}
                     onChange={(e) => handleGlobalTypographyChange('footerTextSize', e.target.value)}
                     placeholder="e.g. 14px"
                   />
                </div>
                <div>
                   <label className="block text-xs text-secondary mb-2">區塊標題大小 (Section Headers)</label>
                   <input
                     className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-sans"
                     value={content.globalTypography?.sectionTitleSize || '24px'}
                     onChange={(e) => handleGlobalTypographyChange('sectionTitleSize', e.target.value)}
                     placeholder="e.g. 24px"
                   />
                </div>
                 <div>
                   <label className="block text-xs text-secondary mb-2">內文通用大小 (Body Text)</label>
                   <input
                     className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-sans"
                     value={content.globalTypography?.bodyTextSize || '16px'}
                     onChange={(e) => handleGlobalTypographyChange('bodyTextSize', e.target.value)}
                     placeholder="e.g. 16px"
                   />
                </div>
             </div>
           </section>

           {/* Services Typography */}
           <section className="space-y-6">
             <h3 className="font-sans text-sm tracking-[0.2em] border-l-2 border-primary pl-4 text-primary uppercase">Services Typography (服務頁面文字)</h3>
             <div className="grid md:grid-cols-3 gap-6">
                <div>
                   <label className="block text-xs text-secondary mb-2">商品標題大小 (Title Size)</label>
                   <input
                     className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-sans"
                     value={content.serviceTypography?.titleSize || '36px'}
                     onChange={(e) => handleServiceTypographyChange('titleSize', e.target.value)}
                     placeholder="e.g. 36px"
                   />
                </div>
                <div>
                   <label className="block text-xs text-secondary mb-2">價格文字大小 (Price Size)</label>
                   <input
                     className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-sans"
                     value={content.serviceTypography?.priceSize || '30px'}
                     onChange={(e) => handleServiceTypographyChange('priceSize', e.target.value)}
                     placeholder="e.g. 30px"
                   />
                </div>
                <div>
                   <label className="block text-xs text-secondary mb-2">描述文字大小 (Desc Size)</label>
                   <input
                     className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-sans"
                     value={content.serviceTypography?.descriptionSize || '16px'}
                     onChange={(e) => handleServiceTypographyChange('descriptionSize', e.target.value)}
                     placeholder="e.g. 16px"
                   />
                </div>
             </div>
           </section>

           {/* Mobile Typography */}
           <section className="space-y-6">
             <h3 className="font-sans text-sm tracking-[0.2em] border-l-2 border-accent pl-4 text-primary uppercase">Mobile Typography (手機版文字大小)</h3>
             <div className="grid md:grid-cols-3 gap-6">
                <div>
                   <label className="block text-xs text-secondary mb-2">選單文字大小 (Nav Size)</label>
                   <input
                     className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-sans"
                     value={content.mobileTypography?.navMenuSize || '10px'}
                     onChange={(e) => handleMobileTypographyChange('navMenuSize', e.target.value)}
                     placeholder="e.g. 10px"
                   />
                </div>
                <div>
                   <label className="block text-xs text-secondary mb-2">選單副標大小 (Nav Sub)</label>
                   <input
                     className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-sans"
                     value={content.mobileTypography?.navSubtitleSize || '8px'}
                     onChange={(e) => handleMobileTypographyChange('navSubtitleSize', e.target.value)}
                     placeholder="e.g. 8px"
                   />
                </div>
                <div>
                   <label className="block text-xs text-secondary mb-2">區塊標題大小 (Section)</label>
                   <input
                     className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-sans"
                     value={content.mobileTypography?.sectionTitleSize || '20px'}
                     onChange={(e) => handleMobileTypographyChange('sectionTitleSize', e.target.value)}
                     placeholder="e.g. 20px"
                   />
                </div>
                <div>
                   <label className="block text-xs text-secondary mb-2">內文大小 (Body)</label>
                   <input
                     className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-sans"
                     value={content.mobileTypography?.bodyTextSize || '14px'}
                     onChange={(e) => handleMobileTypographyChange('bodyTextSize', e.target.value)}
                     placeholder="e.g. 14px"
                   />
                </div>
                <div>
                   <label className="block text-xs text-secondary mb-2">頁尾文字大小 (Footer)</label>
                   <input
                     className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-sans"
                     value={content.mobileTypography?.footerTextSize || '12px'}
                     onChange={(e) => handleMobileTypographyChange('footerTextSize', e.target.value)}
                     placeholder="e.g. 12px"
                   />
                </div>
                <div>
                   <label className="block text-xs text-secondary mb-2">首頁主標題 (Hero Title)</label>
                   <input
                     className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-sans"
                     value={content.mobileTypography?.heroTitleSize || '10px'}
                     onChange={(e) => handleMobileTypographyChange('heroTitleSize', e.target.value)}
                     placeholder="e.g. 10px"
                   />
                </div>
                <div>
                   <label className="block text-xs text-secondary mb-2">首頁副標題 (Hero Subtitle)</label>
                   <input
                     className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-sans"
                     value={content.mobileTypography?.heroSubtitleSize || '10px'}
                     onChange={(e) => handleMobileTypographyChange('heroSubtitleSize', e.target.value)}
                     placeholder="e.g. 10px"
                   />
                </div>
             </div>
           </section>
         </div>
      )}

      {activeTab === 'design' && (
        <div className="space-y-16 animate-fade-in">
          {/* Logo Section */}
          <section className="space-y-6">
            <h3 className="font-sans text-sm tracking-[0.2em] border-l-2 border-primary pl-4 text-primary uppercase">Identity (Logo 設定)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-secondary mb-2">Logo 主標題 (Title)</label>
                <input
                  className="w-full p-4 bg-white border border-line focus:border-primary outline-none font-sans"
                  value={content.logoTitle}
                  onChange={(e) => handleTextChange('logoTitle', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-2">Logo 副標題 (Subtitle)</label>
                <input
                  className="w-full p-4 bg-white border border-line focus:border-primary outline-none font-sans"
                  value={content.logoSubtitle}
                  onChange={(e) => handleTextChange('logoSubtitle', e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Hero Typography Adjustments */}
          <section className="space-y-6">
             <h3 className="font-sans text-sm tracking-[0.2em] border-l-2 border-primary pl-4 text-primary uppercase">Hero Adjustments (首頁視覺調整)</h3>
             <div className="grid md:grid-cols-3 gap-6">
                <div>
                   <label className="block text-xs text-secondary mb-2">主標題字體大小 (Title Size)</label>
                   <input
                     className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-sans"
                     value={content.heroSettings?.titleFontSize || '64px'}
                     onChange={(e) => handleHeroSettingChange('titleFontSize', e.target.value)}
                     placeholder="e.g. 64px or 4rem"
                   />
                </div>
                <div>
                   <label className="block text-xs text-secondary mb-2">主標題垂直位置 (Title Offset)</label>
                   <input
                     className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-sans"
                     value={content.heroSettings?.titleVerticalOffset || '0px'}
                     onChange={(e) => handleHeroSettingChange('titleVerticalOffset', e.target.value)}
                     placeholder="e.g. 20px or -10px"
                   />
                </div>
                
                <div>
                   <label className="block text-xs text-secondary mb-2">副標題垂直位置 (Subtitle Offset)</label>
                   <input
                     className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-sans"
                     value={content.heroSettings?.subtitleVerticalOffset || '0px'}
                     onChange={(e) => handleHeroSettingChange('subtitleVerticalOffset', e.target.value)}
                     placeholder="e.g. 10px or -2rem"
                   />
                </div>
                
                <div>
                   <label className="block text-xs text-secondary mb-2">按鈕垂直位置 (Button Offset)</label>
                   <input
                     className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-sans"
                     value={content.heroSettings?.buttonVerticalOffset || '32px'}
                     onChange={(e) => handleHeroSettingChange('buttonVerticalOffset', e.target.value)}
                     placeholder="e.g. 32px or 5rem"
                   />
                </div>

                <div>
                   <label className="block text-xs text-secondary mb-2">背景圖縮放 (Image Zoom %)</label>
                   <input
                     type="range"
                     min="100"
                     max="200"
                     className="w-full"
                     value={content.heroSettings?.imageScale || '100'}
                     onChange={(e) => handleHeroSettingChange('imageScale', e.target.value)}
                   />
                   <div className="text-right text-xs text-primary">{content.heroSettings?.imageScale}%</div>
                </div>

                <div>
                   <label className="block text-xs text-secondary mb-2">垂直位置 (Position Y %)</label>
                   <input
                     type="range"
                     min="0"
                     max="100"
                     className="w-full"
                     value={content.heroSettings?.imagePositionY || '50'}
                     onChange={(e) => handleHeroSettingChange('imagePositionY', e.target.value)}
                   />
                   <div className="text-right text-xs text-primary">{content.heroSettings?.imagePositionY}%</div>
                </div>

                <div>
                   <label className="block text-xs text-secondary mb-2">水平位置 (Position X %)</label>
                   <input
                     type="range"
                     min="0"
                     max="100"
                     className="w-full"
                     value={content.heroSettings?.imagePositionX || '50'}
                     onChange={(e) => handleHeroSettingChange('imagePositionX', e.target.value)}
                   />
                   <div className="text-right text-xs text-primary">{content.heroSettings?.imagePositionX}%</div>
                </div>

                 <div>
                   <label className="block text-xs text-secondary mb-2">背景遮罩濃度 (Overlay Opacity %)</label>
                   <input
                     type="range"
                     min="0"
                     max="100"
                     className="w-full"
                     value={content.heroSettings?.overlayOpacity || '30'}
                     onChange={(e) => handleHeroSettingChange('overlayOpacity', e.target.value)}
                   />
                   <div className="text-right text-xs text-primary">{content.heroSettings?.overlayOpacity}%</div>
                </div>
                
                <div>
                   <label className="block text-xs text-secondary mb-2">圖片邊緣羽化 (Edge Softness %)</label>
                   <input
                     type="range"
                     min="0"
                     max="100"
                     className="w-full"
                     value={content.heroSettings?.featheringIntensity || '85'}
                     onChange={(e) => handleHeroSettingChange('featheringIntensity', e.target.value)}
                   />
                   <div className="text-right text-xs text-primary">{content.heroSettings?.featheringIntensity}%</div>
                   <p className="text-[9px] text-secondary">調整圖片邊緣與背景融合的程度 (越高越柔和)</p>
                </div>
             </div>
          </section>

           {/* Global Background */}
           <section className="space-y-6">
            <h3 className="font-sans text-sm tracking-[0.2em] border-l-2 border-primary pl-4 text-primary uppercase">Global Visuals (全站視覺)</h3>
            <div className="grid gap-6">
              <div>
                <label className="block text-xs text-secondary mb-2">全站背景圖片 (Website Background Image URL)</label>
                <input
                  className="w-full p-4 bg-white border border-line focus:border-primary outline-none font-sans text-sm"
                  value={content.globalBackgroundImage}
                  onChange={(e) => handleTextChange('globalBackgroundImage', e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div>
                 <label className="block text-xs text-secondary mb-2">背景圖片不透明度 (Background Opacity %)</label>
                 <input
                     type="range"
                     min="0"
                     max="100"
                     className="w-full"
                     value={content.globalBackgroundOpacity || '40'}
                     onChange={(e) => handleTextChange('globalBackgroundOpacity', e.target.value)}
                  />
                  <div className="text-right text-xs text-primary">{content.globalBackgroundOpacity}%</div>
              </div>
            </div>
          </section>

          {/* Services Layout */}
          <section className="space-y-6">
            <h3 className="font-sans text-sm tracking-[0.2em] border-l-2 border-primary pl-4 text-primary uppercase">Services Layout (服務頁面排版)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: 'cards', label: '卡片式', desc: 'Cards - 經典卡片排列' },
                { value: 'list', label: '列表式', desc: 'List - 詳細列表展示' },
                { value: 'grid', label: '網格式', desc: 'Grid - 簡潔網格排列' },
                { value: 'minimal', label: '極簡式', desc: 'Minimal - 極簡風格' }
              ].map((layout) => (
                <button
                  key={layout.value}
                  onClick={() => setContent(prev => ({ ...prev, servicesLayout: layout.value as ServicesLayout }))}
                  className={`p-4 border-2 transition-all text-left ${
                    content.servicesLayout === layout.value
                      ? 'border-primary bg-primary/5'
                      : 'border-line hover:border-secondary'
                  }`}
                >
                  <div className="font-sans text-sm tracking-wide text-primary mb-1">{layout.label}</div>
                  <div className="text-xs text-secondary">{layout.desc}</div>
                </button>
              ))}
            </div>
          </section>

          {/* Color Palette */}
          <section className="space-y-6">
            <h3 className="font-sans text-sm tracking-[0.2em] border-l-2 border-primary pl-4 text-primary uppercase">Color Scheme (配色設定)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs text-secondary mb-2">Primary Text (主要文字/黑色)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    className="w-12 h-12 p-0 border-0"
                    value={content.colors.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                  />
                  <input
                    type="text"
                    className="flex-1 p-3 bg-white border border-line font-sans uppercase"
                    value={content.colors.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-secondary mb-2">Secondary Text (次要文字/灰色)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    className="w-12 h-12 p-0 border-0"
                    value={content.colors.secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                  />
                  <input
                    type="text"
                    className="flex-1 p-3 bg-white border border-line font-sans uppercase"
                    value={content.colors.secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-secondary mb-2">Accent Color (強調色)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    className="w-12 h-12 p-0 border-0"
                    value={content.colors.accent}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                  />
                  <input
                    type="text"
                    className="flex-1 p-3 bg-white border border-line font-sans uppercase"
                    value={content.colors.accent}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-secondary mb-2">Background Color (背景色)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    className="w-12 h-12 p-0 border-0"
                    value={content.colors.background}
                    onChange={(e) => handleColorChange('background', e.target.value)}
                  />
                  <input
                    type="text"
                    className="flex-1 p-3 bg-white border border-line font-sans uppercase"
                    value={content.colors.background}
                    onChange={(e) => handleColorChange('background', e.target.value)}
                  />
                </div>
              </div>
              
               <div>
                <label className="block text-xs text-secondary mb-2">Surface/Card Color (卡片背景)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    className="w-12 h-12 p-0 border-0"
                    value={content.colors.surface}
                    onChange={(e) => handleColorChange('surface', e.target.value)}
                  />
                  <input
                    type="text"
                    className="flex-1 p-3 bg-white border border-line font-sans uppercase"
                    value={content.colors.surface}
                    onChange={(e) => handleColorChange('surface', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'gallery' && (
        <div className="space-y-8 animate-fade-in">
          {/* Desktop Layout Selection */}
          <section className="space-y-6 bg-white p-6 border border-line">
            <h3 className="font-sans text-sm tracking-[0.2em] border-l-2 border-primary pl-4 text-primary uppercase">
              桌面版 Gallery Layout (Desktop)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { value: 'masonry', label: '瀑布流', desc: 'Masonry - 自然錯落排列' },
                { value: 'grid', label: '網格', desc: 'Grid - 整齊的網格排列' },
                { value: 'single', label: '單欄', desc: 'Single Column - 大圖展示' },
                { value: 'horizontal', label: '橫向滾動', desc: 'Horizontal - 水平滑動' },
                { value: 'staggered', label: '交錯', desc: 'Staggered - 大小交錯' }
              ].map((layout) => (
                <button
                  key={layout.value}
                  onClick={() => setContent(prev => ({ ...prev, galleryLayout: layout.value as GalleryLayout }))}
                  className={`p-4 border-2 transition-all text-left ${
                    content.galleryLayout === layout.value
                      ? 'border-primary bg-primary/5'
                      : 'border-line hover:border-secondary'
                  }`}
                >
                  <div className="font-sans text-sm tracking-wide text-primary mb-1">{layout.label}</div>
                  <div className="text-xs text-secondary">{layout.desc}</div>
                </button>
              ))}
            </div>
          </section>

          {/* Mobile Layout Selection */}
          <section className="space-y-6 bg-white p-6 border border-line">
            <h3 className="font-sans text-sm tracking-[0.2em] border-l-2 border-accent pl-4 text-primary uppercase">
              手機版 Gallery Layout (Mobile)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { value: 'masonry', label: '瀑布流', desc: 'Masonry - 自然錯落排列' },
                { value: 'grid', label: '網格', desc: 'Grid - 整齊的網格排列' },
                { value: 'single', label: '單欄', desc: 'Single Column - 大圖展示' },
                { value: 'horizontal', label: '橫向滾動', desc: 'Horizontal - 水平滑動' },
                { value: 'staggered', label: '交錯', desc: 'Staggered - 大小交錯' }
              ].map((layout) => (
                <button
                  key={layout.value}
                  onClick={() => setContent(prev => ({ ...prev, mobileGalleryLayout: layout.value as GalleryLayout }))}
                  className={`p-4 border-2 transition-all text-left ${
                    content.mobileGalleryLayout === layout.value
                      ? 'border-accent bg-accent/5'
                      : 'border-line hover:border-secondary'
                  }`}
                >
                  <div className="font-sans text-sm tracking-wide text-primary mb-1">{layout.label}</div>
                  <div className="text-xs text-secondary">{layout.desc}</div>
                </button>
              ))}
            </div>
          </section>

          {/* Gallery Text Position */}
          <section className="space-y-6">
            <h3 className="font-sans text-sm tracking-[0.2em] border-l-2 border-primary pl-4 text-primary uppercase">
              Caption Position (圖片說明文字位置)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: 'overlay', label: '覆蓋', desc: 'Overlay - 覆蓋於圖片上' },
                { value: 'bottom', label: '底部', desc: 'Bottom - 圖片下方' },
                { value: 'side', label: '側邊', desc: 'Side - 圖片旁邊' },
                { value: 'hover', label: '懸停', desc: 'Hover - 滑鼠移入顯示' }
              ].map((position) => (
                <button
                  key={position.value}
                  onClick={() => setContent(prev => ({ ...prev, galleryTextPosition: position.value as GalleryTextPosition }))}
                  className={`p-4 border-2 transition-all text-left ${
                    content.galleryTextPosition === position.value
                      ? 'border-primary bg-primary/5'
                      : 'border-line hover:border-secondary'
                  }`}
                >
                  <div className="font-sans text-sm tracking-wide text-primary mb-1">{position.label}</div>
                  <div className="text-xs text-secondary">{position.desc}</div>
                </button>
              ))}
            </div>
          </section>

          {/* Gallery Typography */}
          <section className="space-y-6">
            <h3 className="font-sans text-sm tracking-[0.2em] border-l-2 border-primary pl-4 text-primary uppercase">
              Caption Typography (說明文字字體設定)
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-secondary mb-2">桌面版說明文字大小 (Desktop Caption Size)</label>
                <input
                  className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-sans"
                  value={content.galleryTypography?.captionSize || '14px'}
                  onChange={(e) => handleGalleryTypographyChange('captionSize', e.target.value)}
                  placeholder="e.g. 14px or 1rem"
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-2">手機版說明文字大小 (Mobile Caption Size)</label>
                <input
                  className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-sans"
                  value={content.galleryTypography?.mobileCaptionSize || '12px'}
                  onChange={(e) => handleGalleryTypographyChange('mobileCaptionSize', e.target.value)}
                  placeholder="e.g. 12px or 0.85rem"
                />
              </div>
            </div>
          </section>

          {/* Image Management */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-sans text-sm tracking-[0.2em] border-l-2 border-primary pl-4 text-primary uppercase">
                Gallery Images (作品集圖片管理)
              </h3>
              <button
                onClick={handleAddGalleryImage}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white text-xs tracking-widest hover:bg-accent transition-colors"
              >
                <Plus size={14} /> ADD IMAGE
              </button>
            </div>

            {!content.galleryImages || content.galleryImages.length === 0 ? (
              <div className="text-center py-16 bg-white border border-line">
                <p className="font-serif text-secondary italic mb-4">目前沒有圖片</p>
                <p className="text-xs text-secondary">點擊上方「ADD IMAGE」按鈕添加第一張作品圖片</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {content.galleryImages.map((image, index) => (
                  <div key={index} className="bg-white border border-line p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-xs text-secondary font-sans">#{index + 1}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleMoveGalleryImage(index, 'up')}
                          disabled={index === 0}
                          className={`p-1 ${index === 0 ? 'text-line cursor-not-allowed' : 'text-secondary hover:text-primary'}`}
                          title="上移"
                        >
                          <ChevronUp size={16} />
                        </button>
                        <button
                          onClick={() => handleMoveGalleryImage(index, 'down')}
                          disabled={index === content.galleryImages.length - 1}
                          className={`p-1 ${index === content.galleryImages.length - 1 ? 'text-line cursor-not-allowed' : 'text-secondary hover:text-primary'}`}
                          title="下移"
                        >
                          <ChevronDown size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteGalleryImage(index)}
                          className="p-1 text-red-600 hover:text-red-800"
                          title="刪除"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-secondary mb-2">圖片連結 (Image URL)</label>
                      <input
                        type="text"
                        className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-sans text-sm"
                        value={image.url}
                        onChange={(e) => handleGalleryImageChange(index, 'url', e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-secondary mb-2">圖片說明文字 (Caption)</label>
                      <input
                        type="text"
                        className="w-full p-3 bg-white border border-line focus:border-primary outline-none font-serif text-sm"
                        value={image.caption}
                        onChange={(e) => handleGalleryImageChange(index, 'caption', e.target.value)}
                        placeholder="輸入圖片說明..."
                      />
                    </div>

                    {image.url && (
                      <div className="relative group">
                        <img
                          src={image.url}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="hidden text-center py-12 bg-background text-secondary text-sm">
                          圖片載入失敗，請檢查 URL 是否正確
                        </div>
                        {image.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-xs">
                            {image.caption}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="bg-background p-6 text-sm text-secondary space-y-2">
              <p className="font-sans font-light tracking-wide">💡 使用提示：</p>
              <ul className="font-serif space-y-1 pl-4">
                <li>• 建議使用高解析度圖片以確保顯示品質</li>
                <li>• 可以使用圖床服務（如 Imgur、Unsplash）或自己的圖片連結</li>
                <li>• 使用「上移」「下移」按鈕調整圖片順序</li>
                <li>• 修改後記得點擊右下角的「SAVE CHANGES」儲存</li>
              </ul>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'content' && (
        <div className="space-y-16 animate-fade-in">
          {/* Content sections remain same as before, just ensuring they are rendered */}
           {/* Hero Content */}
          <section className="space-y-6">
            <h3 className="font-sans text-sm tracking-[0.2em] border-l-2 border-primary pl-4 text-primary uppercase">Hero Section (首頁主視覺)</h3>
            <div className="grid gap-6">
              <div>
                <label className="block text-xs text-secondary mb-2">主標題 (Hero Title)</label>
                <textarea
                  className="w-full p-4 bg-white border border-line focus:border-primary outline-none font-sans font-light text-lg"
                  rows={2}
                  value={content.heroTitle}
                  onChange={(e) => handleTextChange('heroTitle', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-2">副標題/年份 (Subtitle)</label>
                <input
                  className="w-full p-4 bg-white border border-line focus:border-primary outline-none font-sans"
                  value={content.heroSubtitle}
                  onChange={(e) => handleTextChange('heroSubtitle', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-2">描述 (Description)</label>
                <textarea
                  className="w-full p-4 bg-white border border-line focus:border-primary outline-none font-serif"
                  rows={3}
                  value={content.heroDescription}
                  onChange={(e) => handleTextChange('heroDescription', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-2">背景圖片連結 (Hero Image URL)</label>
                <input
                  className="w-full p-4 bg-white border border-line focus:border-primary outline-none font-sans text-sm"
                  value={content.heroImage}
                  onChange={(e) => handleTextChange('heroImage', e.target.value)}
                />
                <img src={content.heroImage} alt="Preview" className="w-32 h-20 object-cover mt-2 opacity-50" />
              </div>
            </div>
          </section>

          {/* Philosophy */}
          <section className="space-y-6">
            <h3 className="font-sans text-sm tracking-[0.2em] border-l-2 border-primary pl-4 text-primary uppercase">Philosophy (理念)</h3>
            <div className="grid gap-6">
              <div>
                 <label className="block text-xs text-secondary mb-2">標題 (Title)</label>
                 <input
                  className="w-full p-4 bg-white border border-line focus:border-primary outline-none font-sans"
                  value={content.philosophyTitle}
                  onChange={(e) => handleTextChange('philosophyTitle', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-2">內文 (About Text)</label>
                <textarea
                  className="w-full h-40 p-4 bg-white border border-line focus:border-primary outline-none font-serif leading-relaxed"
                  value={content.aboutText}
                  onChange={(e) => handleTextChange('aboutText', e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="space-y-6">
            <h3 className="font-sans text-sm tracking-[0.2em] border-l-2 border-primary pl-4 text-primary uppercase">Services (服務項目)</h3>
            {content.services.map((service, idx) => (
              <div key={service.id} className="bg-white p-6 border border-line space-y-4">
                <div className="flex justify-between">
                  <h4 className="font-sans font-light tracking-wide text-primary">{service.title}</h4>
                  <span className="text-xs text-secondary">#{idx + 1}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                   <div className="space-y-4">
                      <div>
                        <label className="block text-xs text-secondary mb-1">價格 (Price)</label>
                        <input 
                          className="w-full p-2 border border-line font-serif" 
                          value={service.price} 
                          onChange={(e) => handleServiceChange(idx, 'price', e.target.value)} 
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-secondary mb-1">描述 (Description)</label>
                        <textarea 
                          className="w-full p-2 border border-line font-serif" 
                          rows={3}
                          value={service.description} 
                          onChange={(e) => handleServiceChange(idx, 'description', e.target.value)} 
                        />
                      </div>
                   </div>
                   <div>
                      <label className="block text-xs text-secondary mb-1">圖片連結 (Image URL)</label>
                      <input 
                          className="w-full p-2 border border-line font-sans text-sm mb-2" 
                          value={service.imageUrl} 
                          onChange={(e) => handleServiceChange(idx, 'imageUrl', e.target.value)} 
                      />
                      <img src={service.imageUrl} alt="Service" className="w-full h-32 object-cover opacity-80" />
                   </div>
                </div>
              </div>
            ))}
          </section>

          {/* Formspree Integration */}
          <section className="space-y-6">
            <h3 className="font-sans text-sm tracking-[0.2em] border-l-2 border-primary pl-4 text-primary uppercase">Formspree Integration (預約表單設定)</h3>
            <div className="bg-background p-6 space-y-4">
              <div>
                <label className="block text-xs text-secondary mb-2">Formspree Form ID</label>
                <input
                  className="w-full p-4 bg-white border border-line focus:border-primary outline-none font-mono text-sm"
                  value={content.formspreeId || ''}
                  onChange={(e) => handleTextChange('formspreeId', e.target.value)}
                  placeholder="例如: abc123def"
                />
              </div>
              <div className="text-sm text-secondary space-y-2 font-serif">
                <p>💡 <strong>什麼是 Formspree？</strong></p>
                <p>Formspree 是一個表單服務，可以將網站的預約表單直接發送到您的郵箱。</p>
                <p className="text-xs mt-4">
                  📌 <strong>如何獲取 Form ID？</strong><br/>
                  請參考下方的詳細設定說明。
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Fixed Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
        <button
          onClick={handleExportSettings}
          className="bg-accent text-white px-6 py-3 shadow-xl flex items-center gap-3 hover:bg-primary transition-all text-xs tracking-widest"
        >
          <Download size={16} /> EXPORT SETTINGS
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary text-white px-8 py-4 shadow-2xl flex items-center gap-4 hover:bg-accent transition-all text-xs tracking-widest disabled:opacity-50"
        >
          <Save size={16} />
          {isSaving ? 'SAVING...' : 'SAVE CHANGES'}
        </button>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-6">
          <div className="bg-white max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-line flex justify-between items-center">
              <h3 className="font-sans text-lg tracking-widest text-primary">匯出網站設定 (方案 1)</h3>
              <button onClick={() => setShowExportModal(false)} className="text-secondary hover:text-primary">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              <div className="bg-background p-6 space-y-4">
                <h4 className="font-sans text-sm tracking-wide text-primary">📋 使用說明：</h4>
                <ol className="font-serif text-sm text-secondary space-y-2 pl-5 list-decimal">
                  <li>點擊下方「複製程式碼」按鈕</li>
                  <li>開啟專案中的 <code className="bg-white px-2 py-1 text-xs">constants.ts</code> 檔案</li>
                  <li>將整個檔案內容替換成複製的程式碼</li>
                  <li>儲存檔案</li>
                  <li>執行 <code className="bg-white px-2 py-1 text-xs">git add .</code></li>
                  <li>執行 <code className="bg-white px-2 py-1 text-xs">git commit -m "更新網站設定"</code></li>
                  <li>執行 <code className="bg-white px-2 py-1 text-xs">git push origin main</code></li>
                  <li>等待 GitHub Actions 自動部署（約 2 分鐘）</li>
                  <li>完成！所有訪客都能看到更新了 ✅</li>
                </ol>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-sans text-xs text-secondary">constants.ts 新內容：</label>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs tracking-widest hover:bg-accent transition-colors"
                  >
                    <Copy size={14} /> 複製程式碼
                  </button>
                </div>
                <pre className="bg-black text-green-400 p-4 rounded text-xs overflow-x-auto max-h-96">
                  <code>{exportedCode}</code>
                </pre>
              </div>
            </div>

            <div className="p-6 border-t border-line flex justify-end gap-4">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-6 py-3 border border-line text-primary hover:border-primary text-xs tracking-widest transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
