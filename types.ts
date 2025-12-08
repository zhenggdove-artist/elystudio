
export interface ServiceItem {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  imageUrl: string;
}

export interface SiteColors {
  primary: string;   // Main text color
  secondary: string; // Sub text color
  accent: string;    // Highlights
  background: string; // Background color
  surface: string;   // Cards/Sections background
  line: string;      // Borders
}

export interface HeroSettings {
  titleFontSize: string;
  titleVerticalOffset: string;
  subtitleFontSize: string;
  subtitleVerticalOffset: string;
  buttonVerticalOffset: string;
  
  imageScale: string;
  imagePositionY: string;
  imagePositionX: string;
  
  featheringIntensity: string;
  overlayOpacity: string;
}

export interface ServiceTypography {
  titleSize: string;
  priceSize: string;
  descriptionSize: string;
}

export interface GlobalTypography {
  navMenuSize: string;
  navSubtitleSize: string;
  navPadding: string; // New: Vertical padding
  navSpacing: string; // New: Horizontal spacing
  
  sectionTitleSize: string;
  bodyTextSize: string;
  footerTextSize: string;
}

export interface SiteContent {
  // Brand
  logoTitle: string;
  logoSubtitle: string;
  
  // Visuals
  globalBackgroundImage: string;
  globalBackgroundOpacity: string;
  colors: SiteColors;

  // Hero
  siteTitle: string;
  heroSubtitle: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  heroSettings: HeroSettings;
  
  // Content
  philosophyTitle: string;
  aboutText: string;
  constructionRequirements: string;
  contactInfo: string;
  
  // Data
  services: ServiceItem[];
  serviceTypography: ServiceTypography;
  globalTypography: GlobalTypography;
  
  extraCosts: {
    curve: string;
    edge: string;
    travel: string;
  };
}

export interface Booking {
  id: string;
  name: string;
  contact: string;
  location: string;
  date: string;
  surfaceType: string;
  message: string;
  status: 'pending' | 'reviewed';
  timestamp: number;
}

export enum Page {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  SERVICES = 'SERVICES',
  GALLERY = 'GALLERY',
  CONTACT = 'CONTACT',
  ADMIN = 'ADMIN'
}
