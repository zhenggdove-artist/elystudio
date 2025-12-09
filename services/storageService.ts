import { SiteContent, Booking, ServiceItem } from '../types';
import { INITIAL_CONTENT } from '../constants';

const CONTENT_KEY = 'ely_content';
const BOOKINGS_KEY = 'ely_bookings';

export const getContent = (): SiteContent => {
  const stored = localStorage.getItem(CONTENT_KEY);
  if (!stored) return INITIAL_CONTENT;
  try {
    const parsed = JSON.parse(stored);

    // 向後兼容：將舊格式的 galleryImages (string[]) 轉換為新格式 (GalleryImage[])
    if (parsed.galleryImages && Array.isArray(parsed.galleryImages)) {
      parsed.galleryImages = parsed.galleryImages.map((item: any) => {
        // 如果已經是新格式 (有 url 屬性)，直接返回
        if (typeof item === 'object' && item.url !== undefined) {
          return item;
        }
        // 如果是舊格式 (純字符串)，轉換為新格式
        if (typeof item === 'string') {
          return { url: item, caption: '' };
        }
        return item;
      });
    }

    return parsed;
  } catch {
    return INITIAL_CONTENT;
  }
};

export const saveContent = (content: SiteContent): void => {
  localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
};

export const getBookings = (): Booking[] => {
  const stored = localStorage.getItem(BOOKINGS_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const addBooking = (booking: Booking): void => {
  const bookings = getBookings();
  bookings.unshift(booking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
};