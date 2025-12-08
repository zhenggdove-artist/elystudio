
import React, { useState, useEffect } from 'react';
import { SiteContent, Booking, SiteColors, HeroSettings, ServiceTypography, GlobalTypography } from '../types';
import { getContent, saveContent, getBookings } from '../services/storageService';
import { Save, LogOut, Lock, RefreshCcw } from 'lucide-react';

interface AdminProps {
  onLogout: () => void;
  refreshContent: () => void;
}

export const Admin: React.FC<AdminProps> = ({ onLogout, refreshContent }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'content' | 'bookings' | 'design' | 'typography'>('bookings');
  const [content, setContent] = useState<SiteContent>(getContent());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isSaving, setIsSaving] = useState(false);

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
        featheringIntensity: '80',
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

    setContent({
        ...prev,
        heroSettings: { ...defaultHeroSettings, ...prev.heroSettings },
        serviceTypography: { ...defaultServiceTypography, ...prev.serviceTypography },
        globalTypography: { ...defaultGlobalTypography, ...prev.globalTypography },
        globalBackgroundOpacity: prev.globalBackgroundOpacity || '50'
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
                     value={content.heroSettings?.featheringIntensity || '80'}
                     onChange={(e) => handleHeroSettingChange('featheringIntensity', e.target.value)}
                   />
                   <div className="text-right text-xs text-primary">{content.heroSettings?.featheringIntensity}%</div>
                   <p className="text-[9px] text-secondary">調整圖片邊緣與背景融合的程度</p>
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
                     value={content.globalBackgroundOpacity || '50'}
                     onChange={(e) => handleTextChange('globalBackgroundOpacity', e.target.value)}
                  />
                  <div className="text-right text-xs text-primary">{content.globalBackgroundOpacity}%</div>
              </div>
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

      {activeTab === 'content' && (
        <div className="space-y-16 animate-fade-in">
          
          {/* Hero Section */}
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

          {/* Requirements */}
          <section className="space-y-6">
            <h3 className="font-sans text-sm tracking-[0.2em] border-l-2 border-primary pl-4 text-primary uppercase">Requirements (施工規範)</h3>
            <textarea
              className="w-full h-48 p-4 bg-white border border-line focus:border-primary outline-none font-serif leading-relaxed"
              value={content.constructionRequirements}
              onChange={(e) => handleTextChange('constructionRequirements', e.target.value)}
            />
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
        </div>
      )}
      
       <button 
        onClick={handleSave}
        disabled={isSaving}
        className="fixed bottom-8 right-8 bg-primary text-white px-8 py-4 shadow-2xl flex items-center gap-4 hover:bg-accent transition-all z-50 text-xs tracking-widest"
      >
        <Save size={16} />
        {isSaving ? 'SAVING...' : 'SAVE CHANGES'}
      </button>

    </div>
  );
};