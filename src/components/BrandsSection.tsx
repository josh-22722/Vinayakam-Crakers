import React from 'react';
import { Award, ArrowRight } from 'lucide-react';
import { BRANDS } from '../data/brands';
import { useStore } from '../context/StoreContext';

export const BrandsSection: React.FC = () => {
  const { setActiveView, setSelectedCategory, setSearchQuery } = useStore();

  const handleBrandClick = (brandName: string) => {
    setSearchQuery(brandName);
    setSelectedCategory(null);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[var(--border-subtle)] gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Manufacturing Series
          </span>
          <h2 className="brand-display text-2xl sm:text-3xl font-black text-[var(--text-primary)] mt-0.5">
            Vinayakam Production Divisions
          </h2>
        </div>

        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
          100% In-House Factory Formulations
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {BRANDS.map((brand) => (
          <div
            key={brand.id}
            onClick={() => handleBrandClick(brand.name)}
            className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>

              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                Est. {brand.established}
              </span>
              <h3 className="brand-display text-lg font-black text-[var(--text-primary)] group-hover:text-[var(--accent-maroon)] dark:group-hover:text-amber-400 transition-colors">
                {brand.name}
              </h3>
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-0.5">
                {brand.tagline}
              </p>

              <p className="text-xs text-[var(--text-muted)] mt-2 line-clamp-2">
                {brand.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform">
              <span>View Division Items</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
