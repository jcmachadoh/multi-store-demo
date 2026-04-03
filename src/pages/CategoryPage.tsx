import { useParams, Link } from 'react-router-dom';
import { useDataStore, useUIStore } from '../store';

export default function CategoryPage() {
  // Extraemos el 'id' de la URL (ej: /category/cat_cafe -> id = "cat_cafe")
  const { id } = useParams<{ id: string }>();
  
  // Traemos los textos y los datos globales
  const texts = useUIStore((state) => state.texts);
  const categories = useDataStore((state) => state.categories);
  const products = useDataStore((state) => state.products);

  // 1. Buscamos si la categoría existe y si está activa
  const currentCategory = categories.find(cat => cat.id === id && cat.active);

  // 2. Filtramos los productos para que coincidan con la categoría actual y estén activos
  const categoryProducts = products.filter(p => p.categoryId === id && p.active);

  // MANEJO DE ERRORES: Si el usuario pone una URL inventada o de una categoría inactiva
  if (!currentCategory) {
    return (
      <main className="container mx-auto p-4 min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Categoría no encontrada
        </h2>
        <p className="text-gray-500 mb-6">La categoría que buscas no existe o ya no está disponible.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
          Volver al inicio
        </Link>
      </main>
    );
  }

  // RENDERIZADO NORMAL: Categoría encontrada
  return (
    <main className="container mx-auto px-4 py-8 min-h-[70vh]">
      
      {/* Encabezado con breadcrumb (miga de pan) simple */}
      <div className="mb-8 border-b pb-6 border-gray-200 dark:border-gray-800">
        <div className="text-sm text-gray-500 mb-2">
          <Link to="/" className="hover:text-blue-600 transition">Inicio</Link> 
          <span className="mx-2">/</span> 
          <span className="text-gray-800 dark:text-gray-200">{currentCategory.name}</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {currentCategory.name}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Mostrando {categoryProducts.length} producto(s)
        </p>
      </div>

      {/* Grilla de productos o mensaje de "Vacío" */}
      {categoryProducts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No hay productos disponibles en esta categoría por el momento.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryProducts.map((prod) => (
            <Link key={prod.id} to={`/product/${prod.id}`} className="block h-full">
              <div className="bg-white dark:bg-gray-800 h-full p-4 rounded-xl shadow-sm hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 group flex flex-col">
                <div className="overflow-hidden rounded-lg mb-4 h-56 shrink-0 bg-gray-100 dark:bg-gray-700">
                  <img 
                    src={prod.images[0]} 
                    alt={prod.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2 grow">
                  {prod.name}
                </h4>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-blue-600 dark:text-blue-400 font-bold text-xl">
                    ${prod.price.toFixed(2)}
                  </p>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {texts.stock}: {prod.quantity}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}