
import React from 'react';
import { SiteContent, GalleryImage } from '../types';

interface GalleryProps {
  content: SiteContent;
}

export const Gallery: React.FC<GalleryProps> = ({ content }) => {
  const headerSize = content?.globalTypography?.sectionTitleSize || '24px';
  const subSize = content?.globalTypography?.bodyTextSize || '16px';
  const galleryImages = content?.galleryImages || [];
  const desktopLayout = content?.galleryLayout || 'masonry';
  const mobileLayout = content?.mobileGalleryLayout || 'single';
  const textPosition = content?.galleryTextPosition || 'bottom';
  const captionSize = content?.galleryTypography?.captionSize || '14px';
  const mobileCaptionSize = content?.galleryTypography?.mobileCaptionSize || '12px';
  const spacing = content?.galleryTypography?.spacing || '16px';
  const mobileSpacing = content?.galleryTypography?.mobileSpacing || '16px';

  const renderCaption = (image: GalleryImage, position: string) => {
    if (!image.caption) return null;

    const baseClasses = "font-serif text-white transition-all duration-300";

    switch (position) {
      case 'overlay':
        // 覆蓋於圖片上（底部）
        return (
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6 ${baseClasses}`}
            style={{ fontSize: mobileCaptionSize }}
          >
            <p className="md:hidden">{image.caption}</p>
            <p className="hidden md:block" style={{ fontSize: captionSize }}>{image.caption}</p>
          </div>
        );

      case 'hover':
        // 滑鼠移入顯示
        return (
          <div
            className={`absolute inset-0 bg-black/80 p-4 md:p-6 flex items-center justify-center opacity-0 group-hover:opacity-100 ${baseClasses}`}
            style={{ fontSize: mobileCaptionSize }}
          >
            <p className="md:hidden text-center">{image.caption}</p>
            <p className="hidden md:block text-center" style={{ fontSize: captionSize }}>{image.caption}</p>
          </div>
        );

      case 'bottom':
        // 圖片下方
        return (
          <div
            className={`mt-3 text-secondary ${baseClasses.replace('text-white', '')}`}
            style={{ fontSize: mobileCaptionSize }}
          >
            <p className="md:hidden">{image.caption}</p>
            <p className="hidden md:block" style={{ fontSize: captionSize }}>{image.caption}</p>
          </div>
        );

      case 'side':
        // 側邊顯示（在 wrapper 層級處理）
        return null;

      default:
        return null;
    }
  };

  const imageElement = (image: GalleryImage, index: number, className: string = '') => {
    const isSideLayout = textPosition === 'side';

    const imageContent = (
      <div className={`relative group cursor-pointer overflow-hidden ${className}`}>
        <img
          src={image.url}
          alt={image.caption || `Gallery ${index + 1}`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        {textPosition !== 'bottom' && textPosition !== 'side' && renderCaption(image, textPosition)}
      </div>
    );

    // 如果是 side 佈局，需要包裝在 flex 容器中
    if (isSideLayout && image.caption) {
      return (
        <div key={index} className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
          <div className="w-full md:w-2/3">
            {imageContent}
          </div>
          <div
            className="w-full md:w-1/3 font-serif text-secondary"
            style={{ fontSize: mobileCaptionSize }}
          >
            <p className="md:hidden">{image.caption}</p>
            <p className="hidden md:block" style={{ fontSize: captionSize }}>{image.caption}</p>
          </div>
        </div>
      );
    }

    // 其他佈局
    return (
      <div key={index}>
        {imageContent}
        {textPosition === 'bottom' && renderCaption(image, 'bottom')}
      </div>
    );
  };

  const renderGalleryLayout = (layout: string) => {
    if (galleryImages.length === 0) {
      return (
        <p className="text-center text-secondary font-serif italic py-12">
          目前沒有作品。請在後台添加圖片。
        </p>
      );
    }

    switch (layout) {
      case 'masonry':
        // 瀑布流排列
        return (
          <div
            className="columns-1 md:columns-2 lg:columns-3"
            style={{
              gap: `var(--gallery-spacing, ${spacing})`,
              columnGap: `var(--gallery-spacing, ${spacing})`
            }}
          >
            {galleryImages.map((image, index) => (
              <div key={index} className="break-inside-avoid" style={{ marginBottom: `var(--gallery-spacing, ${spacing})` }}>
                {imageElement(image, index)}
              </div>
            ))}
          </div>
        );

      case 'grid':
        // 整齊的網格排列
        return (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{ gap: `var(--gallery-spacing, ${spacing})` }}
          >
            {galleryImages.map((image, index) => (
              <div key={index} className={textPosition === 'side' ? '' : 'aspect-square'}>
                {imageElement(image, index, textPosition === 'side' ? '' : '')}
              </div>
            ))}
          </div>
        );

      case 'single':
        // 單欄大圖展示
        return (
          <div className="max-w-4xl mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: `var(--gallery-spacing, ${spacing})` }}>
            {galleryImages.map((image, index) => (
              <div key={index} className="w-full">
                {imageElement(image, index)}
              </div>
            ))}
          </div>
        );

      case 'horizontal':
        // 橫向滾動
        return (
          <div className="overflow-x-auto pb-8">
            <div className="flex min-w-max" style={{ gap: `var(--gallery-spacing, ${spacing})` }}>
              {galleryImages.map((image, index) => (
                <div key={index} className="w-[80vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0">
                  {imageElement(image, index)}
                </div>
              ))}
            </div>
          </div>
        );

      case 'staggered':
        // 交錯大小排列
        return (
          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ gap: `var(--gallery-spacing, ${spacing})` }}
          >
            {galleryImages.map((image, index) => {
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
                  {imageElement(image, index, textPosition === 'side' ? '' : 'aspect-square')}
                </div>
              );
            })}
          </div>
        );

      default:
        return (
          <div
            className="columns-1 md:columns-2 lg:columns-3"
            style={{
              gap: `var(--gallery-spacing, ${spacing})`,
              columnGap: `var(--gallery-spacing, ${spacing})`
            }}
          >
            {galleryImages.map((image, index) => (
              <div key={index} className="break-inside-avoid" style={{ marginBottom: `var(--gallery-spacing, ${spacing})` }}>
                {imageElement(image, index)}
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="w-full pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto animate-fade-in">
      <style>{`
        @media (max-width: 768px) {
          .gallery-container {
            --gallery-spacing: ${mobileSpacing};
          }
        }
        @media (min-width: 769px) {
          .gallery-container {
            --gallery-spacing: ${spacing};
          }
        }
      `}</style>

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

      {/* Desktop Layout */}
      <div className="hidden md:block gallery-container">
        {renderGalleryLayout(desktopLayout)}
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden gallery-container">
        {renderGalleryLayout(mobileLayout)}
      </div>
    </div>
  );
};
