export interface Apartment {
  id: number;
  title: string;
  url: string;
  image: string;
  images: string[];
  price: number;
  price_currency: string;
  deposit?: number;
  rent?: number;
  city?: string;
  description?: string;
  rooms?: number;
  country?: string;
  region?: string;
  street_address?: string;
  is_agency: boolean;
  size?: string;
  contact_phone?: string;
  contact_email?: string;
  contact_name?: string;
  features?: string[];
}
