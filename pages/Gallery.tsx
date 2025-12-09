
import React from 'react';
import { SiteContent } from '../types';

interface GalleryProps {
  content: SiteContent;
}

export const Gallery: React.FC<GalleryProps> = ({ content }) => {
  const headerSize = content?.globalTypography?.sectionTitleSize || '24px';
  const subSize = content?.globalTypography?.bodyTextSize || '16px';
  const galleryImages = content?.galleryImages || [];
  const layout = content?.galleryLayout || 'masonry';

  const renderGalleryLayout = () => {
    if (galleryImages.length === 0) {
      return (
        <p className="text-center text-secondary font-serif italic py-12">
          目前沒有作品。請在後台添加圖片。
        </p>
      );
    }

    const imageElement = (src: string, index: number, className: string = '') => (
      <div key={index} className={`relative group cursor-pointer overflow-hidden ${className}`}>
        <img
          src={src}
          alt={`Gallery ${index + 1}`}
          className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    );

    switch (layout) {
      case 'masonry':
        // 瀑布流排列（原本的樣式）
        return (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((src, index) => (
              <div key={index} className="break-inside-avoid">
                {imageElement(src, index)}
              </div>
            ))}
          </div>
        );

      case 'grid':
        // 整齊的網格排列
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((src, index) => (
              <div key={index} className="aspect-square">
                {imageElement(src, index)}
              </div>
            ))}
          </div>
        );

      case 'single':
        // 單欄大圖展示
        return (
          <div className="max-w-4xl mx-auto space-y-12">
            {galleryImages.map((src, index) => (
              <div key={index} className="w-full">
                {imageElement(src, index)}
              </div>
            ))}
          </div>
        );

      case 'horizontal':
        // 橫向滾動
        return (
          <div className="overflow-x-auto pb-8">
            <div className="flex gap-6 min-w-max">
              {galleryImages.map((src, index) => (
                <div key={index} className="w-[80vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0">
                  {imageElement(src, index)}
                </div>
              ))}
            </div>
          </div>
        );

      case 'staggered':
        // 交錯大小排列
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((src, index) => {
              // 每3張中有1張大圖（佔2列2欄）
              const isLarge = index % 3 === 0;
              return (
                <div
                  key={index}
                  className={`${
                    isLarge
                      ? 'col-span-2 row-span-2'
                      : 'col-span-1 row-span-1'
                  }`}
                >
                  {imageElement(src, index, isLarge ? 'aspect-square' : 'aspect-square')}
                </div>
              );
            })}
          </div>
        );

      default:
        return (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((src, index) => (
              <div key={index} className="break-inside-avoid">
                {imageElement(src, index)}
              </div>
            ))}
          </div>
        );
    }
  };

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

      {renderGalleryLayout()}
    </div>
  );
};
