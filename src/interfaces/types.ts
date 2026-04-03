// src/types/index.ts

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Company {
  name: string;
  description: string;
  location: Coordinates;
  address: string;
  policies: string;
  whatsapp: string;
}

export interface Category {
  id: string;
  name: string;
  active: boolean;
}

export interface Promotion {
  id: string;
  image: string;
  title: string;
  text: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  description: string;
  active: boolean;
}

// Interfaz para los textos dinámicos de la UI
export interface UITexts {
  who: string;
  products: string;
  policy: string;
  lang: string;
  theme: string;
  stock: string;
}