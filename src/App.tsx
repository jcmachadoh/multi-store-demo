import { useEffect } from 'react';
import { useUIStore, useDataStore } from './store';
import Navbar from './components/Navbar';
import AppRouter from './routes/AppRouter';

export default function App() {
  const loading = useUIStore((state) => state.loading);
  const language = useUIStore((state) => state.language);
  const fetchData = useDataStore((state) => state.fetchData);

  useEffect(() => {
    fetchData(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 dark:text-white text-2xl animate-pulse">
        Cargando Tienda...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      
      {/* El enrutador maneja las vistas centrales */}
      <div className="grow">
        <AppRouter />
      </div>

      <footer className="border-t border-gray-200 dark:border-gray-800 mt-12 py-6 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 text-center text-gray-500">
          © {new Date().getFullYear()} MultiStore Demo. Generado para demostración.
        </div>
      </footer>
    </div>
  );
}