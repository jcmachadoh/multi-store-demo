import { create } from 'zustand';
import type { Company, Category, Product, Promotion } from '../interfaces/types';
import { useUIStore } from './useUIStore';

interface DataStoreState {
  company: Company | null;
  categories: Category[];
  products: Product[];
  promotions: Promotion[];
  
  fetchData: (language: 'es' | 'en') => Promise<void>;
}

export const useDataStore = create<DataStoreState>((set) => ({
  company: null,
  categories: [],
  products: [],
  promotions: [],

  fetchData: async (language) => {
    // Activamos el loading del UI Store
    useUIStore.getState().setLoading(true);
    const baseUrl = `./data/${language}`;
    
    try {
      const [compRes, catRes, prodRes, promoRes] = await Promise.all([
        fetch(`${baseUrl}/company.json`),
        fetch(`${baseUrl}/categories.json`),
        fetch(`${baseUrl}/products.json`),
        fetch(`${baseUrl}/promotions.json`),
      ]);

      set({ 
        company: await compRes.json() as Company,
        categories: await catRes.json() as Category[],
        products: await prodRes.json() as Product[],
        promotions: await promoRes.json() as Promotion[],
      });
    } catch (error) {
      console.error("Error cargando los datos:", error);
    } finally {
      // Apagamos el loading sin importar si hubo error o éxito
      useUIStore.getState().setLoading(false);
    }
  }
}));