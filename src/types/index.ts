export type SoundLevel = 'None' | 'Low' | 'Medium' | 'High' | 'Sonic';
export type VisualEffect = 'Sparks' | 'Aerial Burst' | 'Fountain' | 'Crackling' | 'Whistling' | 'Assorted' | 'Flash';

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  mrp: number;
  price: number;
  discountPercent: number;
  packSize: string;
  piecesPerPack?: number;
  soundLevel: SoundLevel;
  visualEffect: VisualEffect;
  image: string;
  description: string;
  isBestSeller?: boolean;
  isEcoFriendly?: boolean;
  isNew?: boolean;
  boxContents?: string[];
  safetyTips?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  iconName: string;
  highlightImage?: string;
}

export interface Brand {
  id: string;
  name: string;
  tagline: string;
  description: string;
  established: string;
}

export interface EnquiryItem {
  product: Product;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  transportPreference: string;
  notes: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minOrderValue: number;
  description: string;
}
