
import { SiteContent } from './types';

export const INITIAL_CONTENT: SiteContent = {
  logoTitle: 'ELY MURAL',
  logoSubtitle: 'Art Studio',
  
  globalBackgroundImage: 'https://www.transparenttextures.com/patterns/concrete-wall.png', // Subtle texture default
  globalBackgroundOpacity: '40', // Default opacity
  
  colors: {
    primary: '#1C1C1C',
    secondary: '#666666',
    accent: '#8C857B',
    background: '#F9F9F8',
    surface: '#FFFFFF',
    line: '#E5E5E5',
  },

  siteTitle: 'ELY MURAL',
  heroSubtitle: 'EST. 2024',
  heroTitle: 'Texture & \nAtmosphere',
  heroDescription: '透過光影與肌理的互動，讓空間不再是冰冷平滑的場域。\n讓每一個角度都映照著家的溫度。',
  heroImage: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?q=80&w=2670&auto=format&fit=crop',
  
  heroSettings: {
    titleFontSize: '64px',
    titleVerticalOffset: '0px',
    subtitleFontSize: '12px',
    subtitleVerticalOffset: '0px',
    buttonVerticalOffset: '32px',
    
    imageScale: '110',
    imagePositionY: '50',
    imagePositionX: '50',
    
    featheringIntensity: '85', // High feathering by default
    overlayOpacity: '20'
  },
  
  philosophyTitle: 'PHILOSOPHY',
  aboutText: `我們的藝術家，以多年的創作經驗及熟稔的工法，將歐洲文藝復興時的灰泥濕壁畫與現代藝術塗料做工藝與藝術的結合及傳承。\n\n實現我們將藝術帶入日常的理念。透過光影與肌理的互動，讓空間不再是冰冷平滑的場域，讓每一個角度都映照著家的溫度。`,
  
  constructionRequirements: `【底面需求】\n1. 木板或矽酸鈣板封板後，接縫AB膠填平打磨。\n2. 整面透批透磨。\n3. 整面刷兩層油性油漆 (矽酸鈣板也必須封油底以確保吸水率一致)。\n4. 不可用噴塗方式，容易有肉眼不可見的空隙導致封底失敗。\n\n【注意事項】\n- 牆面平整度大幅度影響完成面coating效果。\n- 老房水泥牆面建議需重新抓平以利製作。\n- 製作過程需獨立作業，請避免安排其他工班同時制作以免影響製作時間及完成效果。\n- 施工過程會有粉塵打磨及土料沾染，工期安排請留意讓我們在清潔前。`,
  
  contactInfo: `Facebook: Ely Mural Art Studio\n服務範圍: 全台皆有服務 (雙北以外另計車馬費)`,
  
  extraCosts: {
    curve: '$4,500 / 單位 (每新增單一弧形曲面)',
    edge: '$1,000 / 條 (單一牆面除基礎四條邊緣線外)',
    travel: '$8/km + $2500/日 (雙北以外地區)',
  },
  
  serviceTypography: {
    titleSize: '36px',
    priceSize: '30px',
    descriptionSize: '16px',
  },
  
  globalTypography: {
    navMenuSize: '12px',
    navSubtitleSize: '9px',
    sectionTitleSize: '24px',
    bodyTextSize: '16px',
    footerTextSize: '14px',
  },
  
  services: [
    {
      id: 'marble',
      title: 'Marble 大理石藝術岩面',
      price: '$15,000 / 坪',
      description: '用以取代制式昂貴的石材牆面。紋理不重複無接縫、斷面更能真實呈現石材質感的自然線條。使用無毒純天然礦物岩料。',
      features: [
        '最低施作坪數：3坪',
        '多色罩染疊加 (如玫瑰金) +$1,500/坪',
        '冷瓷釉面 coating +$2,000/坪',
        '無毒純天然礦物岩料'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1620619767323-b95a89183081?q=80&w=2670&auto=format&fit=crop'
    },
    {
      id: 'monet',
      title: 'Monet 莫內藝術岩面',
      price: '$10,000 / 坪',
      description: '多層次罩染工法，色彩與肌理強弱可根據需求調整。讓暖意與歐洲的人文氣息留在家中。沒有尺幅上的限制。',
      features: [
        '最低施作坪數：3坪',
        '高藝術性，獨一無二',
        '紋理不重複無接縫',
        '美術專業人員施工'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?q=80&w=2574&auto=format&fit=crop'
    },
    {
      id: 'vermeer',
      title: 'Vermeer 雲石藝術岩面',
      price: '$8,500 / 坪',
      description: '內斂素色肌理。作品面層防水，養護容易。紋理不重複無接縫、斷面更能真實呈現石材質感的自然線條。',
      features: [
        '最低施作坪數：3坪',
        '內斂素色肌理',
        '面層防水，養護容易',
        '客製化的畫面需求'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2669&auto=format&fit=crop'
    }
  ]
};

export const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2500',
  'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2500',
  'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2500',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfe1?q=80&w=2500',
  'https://images.unsplash.com/photo-1595558486026-646e7f848f08?q=80&w=2500',
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2500',
];
