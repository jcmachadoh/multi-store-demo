import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useUIStore, useDataStore } from '../../store';

export default function ProductSlider() {
  const texts = useUIStore((state) => state.texts);
  const categories = useDataStore((state) => state.categories);
  const products = useDataStore((state) => state.products);

  // 1. Filtramos las categorías para quedarnos solo con las activas
  const activeCategories = categories.filter(cat => cat.active);

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800 dark:text-gray-100 border-b pb-4 border-gray-200 dark:border-gray-800">
        {texts.products}
      </h2>
      
      {activeCategories.map((cat) => {
        // 2. Filtramos los productos por categoría Y que estén activos
        const categoryProducts = products.filter(p => p.categoryId === cat.id && p.active);
        
        // Si después de filtrar no hay productos activos en esta categoría, la saltamos
        if (categoryProducts.length === 0) return null;

        return (
          <div key={cat.id} className="mb-12">
            <div className="flex justify-between items-end mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{cat.name}</h3>
              <Link to={`/category/${cat.id}`} className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                Ver todos &rarr;
              </Link>
            </div>

            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              className="py-4"
            >
              {categoryProducts.map((prod) => (
                <SwiperSlide key={prod.id}>
                  <Link to={`/product/${prod.id}`} className="block h-full">
                    <div className="bg-white dark:bg-gray-800 h-full p-4 rounded-xl shadow-sm hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 group flex flex-col">
                      <div className="overflow-hidden rounded-lg mb-4 h-48 shrink-0">
                        <img 
                          src={prod.images[0]} 
                          alt={prod.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                      <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2 grow">{prod.name}</h4>
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-blue-600 dark:text-blue-400 font-bold text-xl">${prod.price.toFixed(2)}</p>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {texts.stock}: {prod.quantity}
                        </span>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        );
      })}
    </section>
  );
}