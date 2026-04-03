import { useUIStore, useDataStore } from '../../store';
import MapComponent from '../MapComponent';

export default function AboutSection() {
  const texts = useUIStore((state) => state.texts);
  const company = useDataStore((state) => state.company);

  return (
    <section className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
      <div>
        <h2 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">{texts.who}</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {company?.description}
        </p>
      </div>
      <MapComponent coords={company?.location} address={company?.address} />
    </section>
  );
}