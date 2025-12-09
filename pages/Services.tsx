
import React from 'react';
import { SiteContent, Page } from '../types';
import { ArrowRight } from 'lucide-react';

interface ServicesProps {
  content: SiteContent;
  setPage: (page: Page) => void;
}

export const Services: React.FC<ServicesProps> = ({ content, setPage }) => {
  const typography = content.serviceTypography || {
    titleSize: '36px',
    priceSize: '30px',
    descriptionSize: '16px'
  };

  // Services Page Content
  const pageContent = content.servicesPageContent || {
    introText: '我們提供多種藝術岩面與塗裝服務，從材質的選擇到最終的呈現，都致力於將歐洲工藝與現代美學結合。',
    additionalServicesTitle: 'ADDITIONAL SERVICES',
    additionalServicesSubtitle: '客製化加工與外縣市服務',
    workflowTitle: 'WORKFLOW',
    workflowSteps: [],
    requirementsTitle: 'REQUIREMENTS',
    requirementsIntro: '為確保最佳的施作效果與品質，請務必詳閱施工前置需求與注意事項。良好的底材處理是完美藝術牆面的基礎。',
    requirementsButtonText: '立即預約'
  };

  // Desktop Typography
  const desktopTypo = content.servicesPageTypography || {
    introSize: '16px',
    additionalTitleSize: '24px',
    additionalItemSize: '14px',
    workflowTitleSize: '24px',
    workflowNumberSize: '48px',
    workflowStepTitleSize: '20px',
    workflowStepDescSize: '16px',
    requirementsTitleSize: '24px',
    requirementsTextSize: '14px'
  };

  // Mobile Typography
  const mobileTypo = content.mobileServicesTypography || {
    introSize: '14px',
    additionalTitleSize: '20px',
    additionalItemSize: '12px',
    workflowTitleSize: '20px',
    workflowNumberSize: '36px',
    workflowStepTitleSize: '18px',
    workflowStepDescSize: '14px',
    requirementsTitleSize: '20px',
    requirementsTextSize: '12px'
  };

  return (
    <div className="w-full pt-20 md:pt-32 animate-fade-in">

      {/* Header */}
      <div className="px-6 md:px-12 max-w-[1440px] mx-auto mb-24 md:mb-32">
        <h1 className="font-display text-4xl md:text-6xl text-primary tracking-wide mb-6">SERVICES</h1>
        <p className="font-serif text-secondary max-w-xl leading-relaxed">
          <span className="md:hidden" style={{ fontSize: mobileTypo.introSize }}>
            {pageContent.introText}
          </span>
          <span className="hidden md:inline" style={{ fontSize: desktopTypo.introSize }}>
            {pageContent.introText}
          </span>
        </p>
      </div>

      {/* Service List - Zig Zag Layout */}
      <div className="w-full">
        {content.services.map((service, index) => (
          <div key={service.id} className="group border-t border-line">
            <div className="max-w-[1440px] mx-auto">
              <div className={`grid md:grid-cols-2 gap-0 min-h-[60vh]`}>
                {/* Text Section */}
                <div className={`
                  p-8 md:p-24 flex flex-col justify-center space-y-8
                  ${index % 2 === 1 ? 'md:order-2' : ''}
                `}>
                  <div>
                    <span className="text-xs tracking-[0.3em] text-accent uppercase mb-2 block">Collection 0{index + 1}</span>
                    <h2
                      className="font-display text-primary leading-tight"
                      style={{ fontSize: typography.titleSize }}
                    >
                      {service.title}
                    </h2>
                  </div>

                  <div
                    className="font-serif text-primary italic"
                    style={{ fontSize: typography.priceSize }}
                  >
                    {service.price}
                  </div>

                  <p
                    className="font-serif text-secondary leading-loose"
                    style={{ fontSize: typography.descriptionSize }}
                  >
                    {service.description}
                  </p>

                  <ul className="space-y-4 pt-4 border-t border-line">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm text-primary/80 tracking-wide font-sans">
                        <span className="mr-4 text-accent">—</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image Section */}
                <div className={`
                  relative overflow-hidden h-[50vh] md:h-auto
                  ${index % 2 === 1 ? 'md:order-1' : ''}
                `}>
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Costs Grid */}
      <section className="border-t border-line py-24 md:py-32 bg-surface">
        <div className="px-6 md:px-12 max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
             <h3 className="font-display tracking-widest text-primary">
               <span className="md:hidden" style={{ fontSize: mobileTypo.additionalTitleSize }}>
                 {pageContent.additionalServicesTitle}
               </span>
               <span className="hidden md:inline" style={{ fontSize: desktopTypo.additionalTitleSize }}>
                 {pageContent.additionalServicesTitle}
               </span>
             </h3>
             <p className="text-sm text-secondary tracking-wide mt-4 md:mt-0">{pageContent.additionalServicesSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line">
            <div className="bg-background p-12 text-center hover:bg-surface transition-colors duration-500">
              <span className="block text-xs tracking-widest text-secondary mb-4 uppercase">Curve Processing</span>
              <h4 className="font-serif text-xl mb-4 text-primary">弧形曲面</h4>
              <p className="font-sans text-primary/70">
                <span className="md:hidden" style={{ fontSize: mobileTypo.additionalItemSize }}>
                  {content.extraCosts.curve}
                </span>
                <span className="hidden md:inline" style={{ fontSize: desktopTypo.additionalItemSize }}>
                  {content.extraCosts.curve}
                </span>
              </p>
            </div>
            <div className="bg-background p-12 text-center hover:bg-surface transition-colors duration-500">
              <span className="block text-xs tracking-widest text-secondary mb-4 uppercase">Edge Detailing</span>
              <h4 className="font-serif text-xl mb-4 text-primary">邊角加工</h4>
              <p className="font-sans text-primary/70">
                <span className="md:hidden" style={{ fontSize: mobileTypo.additionalItemSize }}>
                  {content.extraCosts.edge}
                </span>
                <span className="hidden md:inline" style={{ fontSize: desktopTypo.additionalItemSize }}>
                  {content.extraCosts.edge}
                </span>
              </p>
            </div>
            <div className="bg-background p-12 text-center hover:bg-surface transition-colors duration-500">
              <span className="block text-xs tracking-widest text-secondary mb-4 uppercase">Travel Fee</span>
              <h4 className="font-serif text-xl mb-4 text-primary">外縣市服務</h4>
              <p className="font-sans text-primary/70">
                <span className="md:hidden" style={{ fontSize: mobileTypo.additionalItemSize }}>
                  {content.extraCosts.travel}
                </span>
                <span className="hidden md:inline" style={{ fontSize: desktopTypo.additionalItemSize }}>
                  {content.extraCosts.travel}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-12 gap-16">
          <div className="md:col-span-4">
             <h3 className="font-display tracking-widest text-primary sticky top-32">
               <span className="md:hidden" style={{ fontSize: mobileTypo.workflowTitleSize }}>
                 {pageContent.workflowTitle}
               </span>
               <span className="hidden md:inline" style={{ fontSize: desktopTypo.workflowTitleSize }}>
                 {pageContent.workflowTitle}
               </span>
             </h3>
          </div>
          <div className="md:col-span-8 space-y-16">

            {pageContent.workflowSteps.map((step, index) => (
              <div key={index} className="group">
                <div className="flex items-baseline gap-8 mb-4">
                  <span className="font-display text-line group-hover:text-accent transition-colors duration-300">
                    <span className="md:hidden" style={{ fontSize: mobileTypo.workflowNumberSize }}>
                      {step.number}
                    </span>
                    <span className="hidden md:inline" style={{ fontSize: desktopTypo.workflowNumberSize }}>
                      {step.number}
                    </span>
                  </span>
                  <h4 className="font-serif font-medium">
                    <span className="md:hidden" style={{ fontSize: mobileTypo.workflowStepTitleSize }}>
                      {step.title}
                    </span>
                    <span className="hidden md:inline" style={{ fontSize: desktopTypo.workflowStepTitleSize }}>
                      {step.title}
                    </span>
                  </h4>
                </div>
                <p className="pl-[4.5rem] font-serif text-secondary leading-relaxed">
                  <span className="md:hidden" style={{ fontSize: mobileTypo.workflowStepDescSize }}>
                    {step.description}
                  </span>
                  <span className="hidden md:inline" style={{ fontSize: desktopTypo.workflowStepDescSize }}>
                    {step.description}
                  </span>
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="bg-primary text-background py-24 px-6 md:px-12">
         <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-16">
           <div>
             <h3 className="font-display tracking-widest mb-8">
               <span className="md:hidden" style={{ fontSize: mobileTypo.requirementsTitleSize }}>
                 {pageContent.requirementsTitle}
               </span>
               <span className="hidden md:inline" style={{ fontSize: desktopTypo.requirementsTitleSize }}>
                 {pageContent.requirementsTitle}
               </span>
             </h3>
             <p className="font-serif text-white/60 leading-relaxed mb-8">
               <span className="md:hidden" style={{ fontSize: mobileTypo.requirementsTextSize }}>
                 {pageContent.requirementsIntro}
               </span>
               <span className="hidden md:inline" style={{ fontSize: desktopTypo.requirementsTextSize }}>
                 {pageContent.requirementsIntro}
               </span>
             </p>
             <button
               onClick={() => setPage(Page.CONTACT)}
               className="border border-white/30 text-white px-8 py-3 hover:bg-white hover:text-primary transition-colors text-xs tracking-widest"
             >
               {pageContent.requirementsButtonText}
             </button>
           </div>
           <div className="font-serif leading-loose text-white/80 whitespace-pre-wrap border-l border-white/20 pl-8">
             <span className="md:hidden text-sm" style={{ fontSize: mobileTypo.requirementsTextSize }}>
               {content.constructionRequirements}
             </span>
             <span className="hidden md:inline text-sm" style={{ fontSize: desktopTypo.requirementsTextSize }}>
               {content.constructionRequirements}
             </span>
           </div>
         </div>
      </section>

    </div>
  );
};
