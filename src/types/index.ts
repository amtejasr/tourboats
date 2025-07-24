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
