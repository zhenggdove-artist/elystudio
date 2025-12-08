
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
  titleFontSize: string;      // CSS value (e.g., "60px")
  titleVerticalOffset: string; // CSS value (e.g., "20px")
  subtitleFontSize: string;   // CSS value (e.g., "14px")
  subtitleVerticalOffset: string; // New: CSS value for subtitle margin/position
  buttonVerticalOffset: string;   // New: CSS value for button margin/position
  
  imageScale: string;         // Percentage (e.g., "100")
  imagePositionY: string;     // Percentage (e.g., "50")
  imagePositionX: string;     // Percentage (e.g., "50")
  
  featheringIntensity: string; // New: Percentage for mask gradient (e.g. 80 means fade starts at 80%)
  overlayOpacity: string;     // Percentage (e.g., "30")
}

export interface ServiceTypography {
  titleSize: string;
  priceSize: string;
  descriptionSize: string;
}

export interface GlobalTypography {
  navMenuSize: string;      // Desktop Menu Font Size
  navSubtitleSize: string;  // Desktop Menu Subtitle Size
  sectionTitleSize: string; // General Section Headers (Philosophy, Workflow)
  bodyTextSize: string;     // General Body Text
  footerTextSize: string;   // Footer Text
}

export interface SiteContent {
  // Brand Identity
  logoTitle: string;
  logoSubtitle: string;
  
  // Visuals
  globalBackgroundImage: string; // URL for site-wide background texture
  globalBackgroundOpacity: string; // "0" to "100"
  colors: SiteColors;

  // Global / Hero
  siteTitle: string;
  heroSubtitle: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  heroSettings: HeroSettings; // New styling config
  
  // Sections
  philosophyTitle: string;
  aboutText: string;
  
  // Construction & Footer
  constructionRequirements: string;
  contactInfo: string;
  
  // Data
  services: ServiceItem[];
  serviceTypography: ServiceTypography; // Typography settings for services
  globalTypography: GlobalTypography;   // New: Global typography settings
  
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
  GALLERY = 'GALLERY', // Renamed from PORTFOLIO
  CONTACT = 'CONTACT',
  ADMIN = 'ADMIN'
}