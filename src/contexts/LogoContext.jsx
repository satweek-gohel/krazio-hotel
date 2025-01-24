import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DEFAULT_LOGO = 'https://sandbox.vovpos.com/backend/uploads/restaurant/restaurant.jpg';

export const useLogo = create(
  persist(
    (set) => ({
      logo: DEFAULT_LOGO, // Default value for logo
      setLogo: (newLogo) => set({ logo: newLogo }),
    }),
    {
      name: 'logo-storage', // Unique name for the localStorage key
      storage: localStorage, // Defaults to localStorage, can also use sessionStorage or custom storage
    }
  )
);
