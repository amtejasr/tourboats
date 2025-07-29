
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { Yacht, WaterActivity, HomePageYachtCategory } from '@/types';
import { 
  yachts as initialYachts, 
  waterActivities as initialActivities,
  homePageYachtCategories as initialHomePageYachtCategories 
} from '@/lib/data';

const YACHTS_STORAGE_KEY = 'tourboats-yachts';
const ACTIVITIES_STORAGE_KEY = 'tourboats-activities';
const HERO_IMAGES_STORAGE_KEY = 'tourboats-hero-images';
const YACHT_CATEGORIES_STORAGE_KEY = 'tourboats-yacht-categories';


interface DataContextType {
  yachts: Yacht[];
  waterActivities: WaterActivity[];
  heroImages: string[];
  homePageYachtCategories: HomePageYachtCategory[];
  loading: boolean;
  addListing: (listing: Omit<Yacht | WaterActivity, 'id'>) => void;
  updateListing: (id: string, listing: Omit<Yacht | WaterActivity, 'id'>) => void;
  deleteListing: (id: string, type: 'yacht' | 'waterActivity') => void;
  updateHeroImages: (images: string[]) => void;
  updateHomePageYachtCategories: (categories: HomePageYachtCategory[]) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

function createIdFromString(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const initialHeroImages = [
    "https://placehold.co/1920x1080.png",
    "https://placehold.co/1920x1080.png",
    "https://placehold.co/1920x1080.png",
]

export function DataProvider({ children }: { children: ReactNode }) {
  const [yachts, setYachts] = useState<Yacht[]>([]);
  const [waterActivities, setWaterActivities] = useState<WaterActivity[]>([]);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [homePageYachtCategories, setHomePageYachtCategories] = useState<HomePageYachtCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Load Yachts
      const storedYachts = localStorage.getItem(YACHTS_STORAGE_KEY);
      if (storedYachts) {
        setYachts(JSON.parse(storedYachts));
      } else {
        setYachts(initialYachts);
      }

      // Load Activities
      const storedActivities = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
      if (storedActivities) {
        setWaterActivities(JSON.parse(storedActivities));
      } else {
        setWaterActivities(initialActivities);
      }
      
      // Load Hero Images
      const storedHeroImages = localStorage.getItem(HERO_IMAGES_STORAGE_KEY);
       if (storedHeroImages) {
        setHeroImages(JSON.parse(storedHeroImages));
      } else {
        setHeroImages(initialHeroImages);
      }
      
      // Load Home Page Yacht Categories
      const storedYachtCategories = localStorage.getItem(YACHT_CATEGORIES_STORAGE_KEY);
      if (storedYachtCategories) {
        const loadedCategories: HomePageYachtCategory[] = JSON.parse(storedYachtCategories);
        // Restore original images from initial data, since they aren't saved in local storage.
        const restoredCategories = loadedCategories.map(cat => {
            const originalCat = initialHomePageYachtCategories.find(i => i.type === cat.type);
            return { ...cat, image: originalCat?.image || 'https://placehold.co/600x400.png' };
        });
        setHomePageYachtCategories(restoredCategories);
      } else {
        setHomePageYachtCategories(initialHomePageYachtCategories);
      }

    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      // Fallback to initial data if localStorage is corrupt
      setYachts(initialYachts);
      setWaterActivities(initialActivities);
      setHeroImages(initialHeroImages);
      setHomePageYachtCategories(initialHomePageYachtCategories);
    }
    setLoading(false);
  }, []);

  const addListing = useCallback((listingData: Omit<Yacht | WaterActivity, 'id'>) => {
    const newId = createIdFromString(listingData.name);
    
    if ('pricePerHour' in listingData) { // It's a Yacht
      const newYacht: Yacht = { id: newId, ...listingData as Omit<Yacht, 'id'> };
      setYachts(prevYachts => {
        const updatedYachts = [...prevYachts, newYacht];
        localStorage.setItem(YACHTS_STORAGE_KEY, JSON.stringify(updatedYachts));
        return updatedYachts;
      });
    } else { // It's a WaterActivity
      const newActivity: WaterActivity = { id: newId, ...listingData as Omit<WaterActivity, 'id'> };
      setWaterActivities(prevActivities => {
        const updatedActivities = [...prevActivities, newActivity];
        localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(updatedActivities));
        return updatedActivities;
      });
    }
  }, []);
  
  const updateListing = useCallback((id: string, listingData: Omit<Yacht | WaterActivity, 'id'>) => {
      if ('pricePerHour' in listingData) { // It's a Yacht
          const updatedYacht: Yacht = { id, ...listingData as Omit<Yacht, 'id'>};
          setYachts(prevYachts => {
              const updatedYachts = prevYachts.map(y => y.id === id ? updatedYacht : y);
              localStorage.setItem(YACHTS_STORAGE_KEY, JSON.stringify(updatedYachts));
              return updatedYachts;
          });
      } else { // It's a WaterActivity
          const updatedActivity: WaterActivity = { id, ...listingData as Omit<WaterActivity, 'id'> };
          setWaterActivities(prevActivities => {
              const updatedActivities = prevActivities.map(a => a.id === id ? updatedActivity : a);
              localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(updatedActivities));
              return updatedActivities;
          });
      }
  }, []);

  const deleteListing = useCallback((id: string, type: 'yacht' | 'waterActivity') => {
      if (type === 'yacht') {
          setYachts(prevYachts => {
              const updatedYachts = prevYachts.filter(y => y.id !== id);
              localStorage.setItem(YACHTS_STORAGE_KEY, JSON.stringify(updatedYachts));
              return updatedYachts;
          });
      } else {
          setWaterActivities(prevActivities => {
              const updatedActivities = prevActivities.filter(a => a.id !== id);
              localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(updatedActivities));
              return updatedActivities;
          });
      }
  }, []);

  const updateHeroImages = useCallback((images: string[]) => {
      setHeroImages(images);
      try {
        const imagesToStore = images.filter(img => !img.startsWith('data:'));
        localStorage.setItem(HERO_IMAGES_STORAGE_KEY, JSON.stringify(imagesToStore));
      } catch (e) {
          console.error("Could not save hero images to localStorage.", e);
      }
  }, []);

  const updateHomePageYachtCategories = useCallback((categories: HomePageYachtCategory[]) => {
    // Update the live state with potentially new base64 images for the current session
    setHomePageYachtCategories(categories);

    try {
        // Create a version of the categories data for storage that *only* contains text and other serializable info.
        // The original image URL is restored from the initial data.
        const categoriesForStorage = categories.map(category => {
            const originalCategory = initialHomePageYachtCategories.find(c => c.type === category.type);
            return {
                type: category.type,
                title: category.title,
                description: category.description,
                aiHint: category.aiHint,
                link: category.link,
                image: originalCategory?.image || 'https://placehold.co/600x400.png' // Fallback image path
            };
        });

        localStorage.setItem(YACHT_CATEGORIES_STORAGE_KEY, JSON.stringify(categoriesForStorage));
    } catch (e) {
        console.error("Could not save yacht categories to localStorage.", e);
    }
  }, []);


  const value = { yachts, waterActivities, heroImages, homePageYachtCategories, loading, addListing, updateListing, deleteListing, updateHeroImages, updateHomePageYachtCategories };

  return (
    <DataContext.Provider value={value}>
      {!loading && children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
