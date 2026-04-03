
# 🏪 MultiStore Demo - Plantilla de Vitrina Virtual (React + Vite)

Una aplicación web dinámica, moderna y responsiva construida con React y TypeScript, diseñada para funcionar como un catálogo o vitrina de productos **sin necesidad de una base de datos o backend complejo**. 

Toda la información (categorías, productos, promociones y datos de la empresa) se alimenta dinámicamente desde archivos JSON, lo que la hace ideal para despliegues gratuitos y rápidos en plataformas como **GitHub Pages**.

## ✨ Características Principales

* **Falso Backend (Basado en JSON):** Modifica todo el contenido de la tienda editando simples archivos `.json` en la carpeta pública.
* **Soporte Bilingüe (Internacionalización):** Cambio instantáneo entre Español e Inglés sin recargar la página.
* **Modo Oscuro / Claro:** Integración nativa con Tailwind CSS que respeta las preferencias del usuario.
* **Ventas por WhatsApp:** Botón dinámico en el detalle del producto que genera un mensaje predeterminado con el nombre y precio del artículo para cerrar ventas rápidamente.
* **Carruseles Interactivos:** Promociones y productos destacados impulsados por `Swiper.js` con soporte táctil para móviles.
* **Geolocalización:** Mapa interactivo integrado con `React-Leaflet` y OpenStreetMap (sin necesidad de API Keys de pago).
* **Gestión de Stock y Visibilidad:** Soporta estados "Agotado" (bloqueando el botón de compra) y "Soft Delete" (campo `active: false` para ocultar productos sin borrarlos).

## 🛠️ Tecnologías Utilizadas

* **Framework:** React 18 (Vite)
* **Lenguaje:** TypeScript
* **Estilos:** Tailwind CSS v4
* **Gestor de Estado Global:** Zustand
* **Enrutamiento:** React Router DOM (usando `HashRouter` para evitar errores 404 en hostings estáticos)
* **Componentes Visuales:** Swiper.js (Carruseles), React-Leaflet (Mapas), Heroicons (Iconografía)

## 🚀 Cómo Empezar (Desarrollo Local)

Sigue estos pasos para correr el proyecto en tu máquina local:

1. **Clona el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/multi-store-demo.git](https://github.com/tu-usuario/multi-store-demo.git)
   cd multi-store-demo
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Ejecuta el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. Abre tu navegador en la ruta indicada (usualmente `http://localhost:5173`).

## ⚙️ Personalización (Cómo cambiar los datos)

No necesitas tocar el código React para actualizar los productos de la tienda. Toda la información vive en la carpeta `public/data/`.

Existen dos subcarpetas: `es/` (Español) y `en/` (Inglés). Ambas deben tener la misma estructura de archivos:

* `company.json`: Información global (Nombre, mapa, políticas y número de WhatsApp).
* `categories.json`: Listado de categorías (Usa `"active": false` para ocultar una).
* `products.json`: Inventario de productos (Asociados por `categoryId`).
* `promotions.json`: Imágenes y textos para el carrusel principal del inicio.

**Nota sobre Imágenes:** Puedes usar URLs externas (como Unsplash) o guardar tus imágenes localmente en la carpeta `public/images/` y referenciarlas en los JSON como `"/images/foto-producto.jpg"`.

## 📦 Despliegue en GitHub Pages

Este proyecto está configurado para ser subido fácilmente a GitHub Pages. 

Si haces un *fork* o cambias el nombre del repositorio, asegúrate de actualizar el archivo `vite.config.ts`:

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/NOMBRE-DE-TU-REPOSITORIO/', // <-- Actualiza esto con el nombre exacto de tu repo
})
```

Para compilar el proyecto para producción:
```bash
npm run build
```
Esto generará una carpeta `dist/` con todos los archivos estáticos listos para subir a tu servidor o rama de GitHub Pages.
```