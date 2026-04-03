import { useUIStore, useDataStore } from '../../store';

export default function PolicySection() {
  const texts = useUIStore((state) => state.texts);
  const company = useDataStore((state) => state.company);

  if (!company?.policies) return null;

  return (
    <section className="container mx-auto px-4">
      <div className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">{texts.policy}</h2>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
          {company.policies}
        </p>
      </div>
    </section>
  );
}