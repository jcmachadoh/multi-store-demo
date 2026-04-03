import { Link } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
// Importamos ambos stores centralizados
import { useDataStore, useUIStore } from '../store';

export default function Navbar() {
  // Datos del negocio
  const categories = useDataStore((state) => state.categories);
  const company = useDataStore((state) => state.company);
  
  // Controles de Interfaz
  const language = useUIStore((state) => state.language);
  const setLanguage = useUIStore((state) => state.setLanguage);
  const theme = useUIStore((state) => state.theme);
  const toggleTheme = useUIStore((state) => state.toggleTheme);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo/Nombre */}
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {company?.name || 'Loading...'}
        </Link>

        {/* Categorías Dinámicas */}
       <div className="hidden md:flex items-center space-x-6">
          {categories
            .filter(cat => cat.active) // <-- FILTRO AQUÍ
            .map(cat => (
            <Link key={cat.id} to={`/category/${cat.id}`} className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition">
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Controles (Idioma y Tema) */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span className="font-medium uppercase text-sm">{language}</span>
          </button>

          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === 'light' ? 
              <MoonIcon className="h-5 w-5 text-gray-600" /> : 
              <SunIcon className="h-5 w-5 text-yellow-400" />
            }
          </button>
        </div>
      </nav>
    </header>
  );
}