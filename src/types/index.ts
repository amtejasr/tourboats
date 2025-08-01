
export interface Yacht {
  id: string;
  name: string;
  category: 'private' | 'sharing';
  image: string;
  aiHint: string;
  images: string[];
  capacity: number;
  size: number; // in feet
  description: string;
  pricePerHour: number;
  features: string[];
}

export interface WaterActivity {
  id: string;
  name: string;
  image: string;
  aiHint: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  duration: number; // in minutes
}

export interface HomePageYachtCategory {
  type: 'private' | 'sharing';
  title: string;
  description: string;
  image: string;
  aiHint: string;
  link: string;
}

export interface Addon {
  id: string;
  name: string;
  price: number;
}
