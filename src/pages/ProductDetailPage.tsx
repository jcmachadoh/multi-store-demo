import { useParams, useNavigate } from 'react-router-dom';
import { useDataStore, useUIStore } from '../store';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const texts = useUIStore((state) => state.texts);
  const products = useDataStore((state) => state.products);
  const categories = useDataStore((state) => state.categories);
  
  // TRAEMOS LA CONFIGURACIÓN DE LA EMPRESA (Para el WhatsApp)
  const company = useDataStore((state) => state.company);

  const product = products.find(p => p.id === id && p.active);

  if (!product) {
    return (
      <main className="container mx-auto p-4 min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Producto no encontrado</h2>
        <button onClick={() => navigate(-1)} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Volver atrás
        </button>
      </main>
    );
  }

  const category = categories.find(cat => cat.id === product.categoryId);

  // FUNCIÓN PARA ABRIR WHATSAPP
  const handleWhatsAppClick = () => {
    if (!company?.whatsapp) return;
    
    // Armamos un mensaje predeterminado amigable
    const message = `Hola, me interesa solicitar el producto: *${product.name}* (Precio: $${product.price}). ¿Tienen disponibilidad?`;
    
    // Codificamos el mensaje para que sea una URL válida (convierte los espacios en %20, etc.)
    const encodedMessage = encodeURIComponent(message);
    
    // Construimos la URL oficial de la API de WhatsApp
    const whatsappUrl = `https://wa.me/${company.whatsapp}?text=${encodedMessage}`;
    
    // Abrimos en una pestaña nueva
    window.open(whatsappUrl, '_blank');
  };

  return (
    <main className="container mx-auto px-4 py-8 min-h-[70vh]">
      {/* ... (Todo el código de la miga de pan y la galería de imágenes se queda igual) ... */}
      
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          
          {/* GALERÍA DE IMÁGENES (Se mantiene igual) */}
          <div className="w-full">
            {product.images.length > 1 ? (
              <Swiper modules={[Pagination, Navigation]} spaceBetween={10} slidesPerView={1} pagination={{ clickable: true }} navigation className="w-full h-80 md:h-[500px] rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800">
                {product.images.map((img, index) => (
                  <SwiperSlide key={index}><img src={img} alt={`${product.name} ${index}`} className="w-full h-full object-cover"/></SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="w-full h-80 md:h-125 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
              </div>
            )}
          </div>

          {/* DETALLES DEL PRODUCTO */}
          <div className="flex flex-col justify-center">
            {category && <span className="text-sm font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2 block">{category.name}</span>}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">${product.price.toFixed(2)}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${product.quantity > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                {product.quantity > 0 ? `${texts.stock}: ${product.quantity}` : 'Agotado'}
              </span>
            </div>

            <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* NUEVO BOTÓN DE WHATSAPP */}
            <div className="mt-auto border-t border-gray-100 dark:border-gray-800 pt-6">
              <button 
                onClick={handleWhatsAppClick}
                disabled={product.quantity === 0 || !company?.whatsapp}
                className={`w-full md:w-auto px-8 py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95 flex items-center justify-center gap-3 ${
                  product.quantity > 0 
                    ? 'bg-[#25D366] text-white hover:bg-[#1ebe57] hover:shadow-lg hover:shadow-green-500/30' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                }`}
              >
                {/* SVG del Logo oficial de WhatsApp */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                {product.quantity > 0 ? 'Solicitar producto' : 'Sin stock disponible'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}