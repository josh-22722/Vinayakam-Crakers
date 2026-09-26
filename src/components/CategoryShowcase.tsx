import React from 'react';
import { 
  Sparkles, 
  RotateCw, 
  Flame, 
  Waves, 
  Rocket, 
  Smile, 
  Send, 
  Zap, 
  Gift, 
  Volume2, 
  PackageCheck, 
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useStore } from '../context/StoreContext';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5" />,
  RotateCw: <RotateCw className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  Waves: <Waves className="w-5 h-5" />,
  Rocket: <Rocket className="w-5 h-5" />,
  Smile: <Smile className="w-5 h-5" />,
  Send: <Send className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Gift: <Gift className="w-5 h-5" />,
  Volume2: <Volume2 className="w-5 h-5" />,
  PackageCheck: <PackageCheck className="w-5 h-5" />,
};

// Top 8 popular festival categories to highlight cleanly on the front page
const FEATURED_CATEGORY_IDS = [
  'sparklers',
  'ground-chakkar',
  'flower-pot',
  'fountain',
  'aerial-sky-shot',
  'multicolour-sky-shot',
  'kids-crackers',
  'gift-box',
];

export const CategoryShowcase: React.FC = () => {
  const { setActiveView, setSelectedCategory } = useStore();

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredCats = CATEGORIES.filter((c) => FEATURED_CATEGORY_IDS.includes(c.id));

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Crisp Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[var(--border-subtle)] gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-maroon)] dark:text-amber-400">
            Factory Catalog
          </span>
          <h2 className="brand-display text-2xl sm:text-3xl font-black text-[var(--text-primary)] mt-0.5">
            Shop by Category
          </h2>
        </div>

        <button
          onClick={() => {
            setSelectedCategory(null);
            setActiveView('shop');
          }}
          className="text-xs sm:text-sm font-semibold text-[var(--accent-maroon)] dark:text-amber-400 hover:underline flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span>View All 18 Categories</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Clean Grid of Categories (8 top categories + 1 view all card) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {featuredCats.map((cat) => {
          const icon = iconMap[cat.iconName] || <Sparkles className="w-5 h-5" />;

          return (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className="group text-left p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface)] text-[var(--accent-maroon)] dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  {icon}
                </div>
                <h3 className="font-bold text-sm text-[var(--text-primary)] leading-tight group-hover:text-[var(--accent-maroon)] dark:group-hover:text-amber-400 transition-colors">
                  {cat.name}
                </h3>
              </div>

              <div className="mt-4 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span className="tabular-nums font-mono">{cat.itemCount} items</span>
                <span className="text-amber-600 dark:text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  Browse <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          );
        })}

        {/* View All Categories Card */}
        <button
          onClick={() => {
            setSelectedCategory(null);
            setActiveView('shop');
          }}
          className="p-4 rounded-2xl border-2 border-dashed border-amber-400/60 dark:border-amber-500/40 bg-amber-500/5 hover:bg-amber-500/10 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:scale-[1.02] group col-span-2 sm:col-span-1"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <p className="font-black text-sm text-[var(--text-primary)]">Explore All Categories</p>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">18 Tiers · 60+ Products</p>
        </button>
      </div>
    </section>
  );
};
