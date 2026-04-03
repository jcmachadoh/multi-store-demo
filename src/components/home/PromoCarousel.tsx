import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useDataStore } from '../../store';

export default function PromoCarousel() {
  const promotions = useDataStore((state) => state.promotions);

  if (promotions.length === 0) return null;

  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="h-72 md:h-100 w-full" /* Usamos md:h-100 como sugirió tu linter */
      >
        {promotions.map((promo) => (
          <SwiperSlide key={promo.id}>
            <div className="relative w-full h-full">
              <img 
                src={promo.image} 
                alt={promo.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 shadow-sm">
                  {promo.title}
                </h2>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
                  {promo.text}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}