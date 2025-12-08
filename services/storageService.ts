import { SiteContent, Booking, ServiceItem } from '../types';
import { INITIAL_CONTENT } from '../constants';

const CONTENT_KEY = 'ely_content';
const BOOKINGS_KEY = 'ely_bookings';

export const getContent = (): SiteContent => {
  const stored = localStorage.getItem(CONTENT_KEY);
  if (!stored) return INITIAL_CONTENT;
  try {
    return JSON.parse(stored);
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