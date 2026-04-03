import { create } from 'zustand';
import type { UITexts } from '../interfaces/types';
import { useDataStore } from './useDataStore';

interface UIStoreState {
  language: 'es' | 'en';
  theme: 'light' | 'dark';
  loading: boolean;
  texts: UITexts;
  
  setLanguage: (lang: 'es' | 'en') => void;
  toggleTheme: () => void;
  setLoading: (status: boolean) => void;
}

const uiTexts: Record<'es' | 'en', UITexts> = {
  es: { who: 'Quiénes Somos', products: 'Nuestros Productos', policy: 'Políticas', lang: 'Idioma', theme: 'Tema', stock: 'Stock' },
  en: { who: 'About Us', products: 'Our Products', policy: 'Policies', lang: 'Language', theme: 'Theme', stock: 'Stock' },
};

export const useUIStore = create<UIStoreState>((set, get) => ({
  language: 'es',
  theme: 'light',
  loading: false,
  texts: uiTexts.es,

  setLanguage: (lang) => {
    set({ language: lang, texts: uiTexts[lang] });
    // Llamamos al store de datos para que recargue la información en el nuevo idioma
    useDataStore.getState().fetchData(lang);
  },

  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    set({ theme: newTheme });
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  setLoading: (status) => set({ loading: status })
}));