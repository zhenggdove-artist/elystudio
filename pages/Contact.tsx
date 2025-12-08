
import React, { useState } from 'react';
import { SiteContent, Booking } from '../types';
import { addBooking } from '../services/storageService';
import { Send, ArrowUpRight } from 'lucide-react';

interface ContactProps {
  content: SiteContent;
}

export const Contact: React.FC<ContactProps> = ({ content }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    location: '',
    date: '',
    surfaceType: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const headerSize = content.globalTypography?.sectionTitleSize || '24px';
  const bodySize = content.globalTypography?.bodyTextSize || '16px';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: Booking = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      timestamp: Date.now()
    };
    addBooking(newBooking);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (submitted) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center space-y-8 animate-fade-in px-6">
        <h2 className="font-display text-3xl md:text-4xl text-primary tracking-widest">THANK YOU</h2>
        <p className="font-serif text-secondary">預約已送出，我們將盡快與您聯繫。</p>
        <button 
          onClick={() => setSubmitted(false)} 
          className="text-xs tracking-widest border-b border-primary pb-1 hover:text-accent transition-colors"
        >
          SEND ANOTHER MESSAGE
        </button>
      </div>
    );
  }

  return (
    <div className="w-full pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto animate-fade-in">
      <div className="grid md:grid-cols-12 gap-16 md:gap-24">
        
        {/* Info */}
        <div className="md:col-span-5 space-y-12">
          <div>
            <h2 
              className="font-display text-primary tracking-widest mb-8"
              style={{ fontSize: headerSize }}
            >
              CONTACT
            </h2>
            <div className="w-12 h-px bg-primary mb-8"></div>
            <p 
              className="font-serif text-secondary leading-loose whitespace-pre-wrap"
              style={{ fontSize: bodySize }}
            >
              {content.contactInfo}
            </p>
          </div>

          <div className="space-y-4">
             <h3 className="font-bold text-primary font-sans text-xs tracking-widest uppercase">Process</h3>
             <ul className="space-y-4 font-serif text-secondary leading-relaxed" style={{ fontSize: bodySize }}>
               <li>01. 填寫預約表單</li>
               <li>02. 提供現場牆面照片與尺寸 (Line/Email)</li>
               <li>03. 初步報價與工期確認</li>
             </ul>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-12">
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="group relative">
                <input 
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text" 
                  className="w-full bg-transparent border-b border-line py-4 text-primary outline-none focus:border-primary transition-colors font-serif placeholder-transparent"
                  id="name"
                />
                <label htmlFor="name" className={`absolute left-0 transition-all duration-300 pointer-events-none text-secondary ${formData.name ? '-top-4 text-xs tracking-widest' : 'top-4 font-serif'}`}>
                  聯絡人姓名 Name
                </label>
              </div>

              <div className="group relative">
                <input 
                  required
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  type="text" 
                  className="w-full bg-transparent border-b border-line py-4 text-primary outline-none focus:border-primary transition-colors font-serif placeholder-transparent"
                  id="contact"
                />
                <label htmlFor="contact" className={`absolute left-0 transition-all duration-300 pointer-events-none text-secondary ${formData.contact ? '-top-4 text-xs tracking-widest' : 'top-4 font-serif'}`}>
                  電話 / Line ID
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="group relative">
                <input 
                  required
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  type="text" 
                  className="w-full bg-transparent border-b border-line py-4 text-primary outline-none focus:border-primary transition-colors font-serif placeholder-transparent"
                  id="location"
                />
                <label htmlFor="location" className={`absolute left-0 transition-all duration-300 pointer-events-none text-secondary ${formData.location ? '-top-4 text-xs tracking-widest' : 'top-4 font-serif'}`}>
                  案場地點 Location
                </label>
              </div>

              <div className="group relative">
                <input 
                  required
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  type="text" 
                  className="w-full bg-transparent border-b border-line py-4 text-primary outline-none focus:border-primary transition-colors font-serif placeholder-transparent"
                  id="date"
                />
                <label htmlFor="date" className={`absolute left-0 transition-all duration-300 pointer-events-none text-secondary ${formData.date ? '-top-4 text-xs tracking-widest' : 'top-4 font-serif'}`}>
                  預計進場 Date
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-xs tracking-widest text-secondary uppercase">
                Collection
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {['Marble', 'Monet', 'Vermeer', 'Other'].map((type) => (
                   <button
                     key={type}
                     type="button"
                     onClick={() => setFormData(prev => ({ ...prev, surfaceType: type }))}
                     className={`py-3 text-sm border font-serif transition-all duration-300 ${formData.surfaceType === type ? 'border-primary bg-primary text-white' : 'border-line text-secondary hover:border-primary'}`}
                   >
                     {type}
                   </button>
                 ))}
              </div>
            </div>

            <div className="group relative pt-4">
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-transparent border-b border-line py-4 text-primary outline-none focus:border-primary transition-colors font-serif resize-none placeholder-transparent"
                id="message"
              />
              <label htmlFor="message" className={`absolute left-0 transition-all duration-300 pointer-events-none text-secondary ${formData.message ? 'top-0 text-xs tracking-widest' : 'top-8 font-serif'}`}>
                備註 / 牆面狀況簡述 Message
              </label>
            </div>

            <div className="pt-8">
               <button 
                type="submit"
                className="group flex items-center gap-4 bg-primary text-white px-12 py-4 tracking-widest text-xs hover:bg-accent transition-colors duration-500"
              >
                <span>SUBMIT REQUEST</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};