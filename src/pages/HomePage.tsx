import PromoCarousel from '../components/home/PromoCarousel';
import AboutSection from '../components/home/AboutSection';
import ProductSlider from '../components/home/ProductSlider';
import PolicySection from '../components/home/PolicySection';

export default function HomePage() {
  return (
    <main className="space-y-16 pb-12">
      <PromoCarousel />
      <AboutSection />
      <ProductSlider />
      <PolicySection />
    </main>
  );
}