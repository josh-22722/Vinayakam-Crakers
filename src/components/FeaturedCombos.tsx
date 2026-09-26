import React from 'react';
import { Gift, Plus, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/helpers';

export const FeaturedCombos: React.FC = () => {
  const { addToEnquiry, setSelectedProductDetail, setActiveView, setSelectedCategory } = useStore();

  const featuredCombos = PRODUCTS.filter(
    (p) => p.category === 'gift-box' || p.category === 'combo-pack'
  ).slice(0, 3);

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[var(--border-subtle)] gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Wholesale Value Packs
          </span>
          <h2 className="brand-display text-2xl sm:text-3xl font-black text-[var(--text-primary)] mt-0.5">
            Gift Boxes & Family Hampers
          </h2>
        </div>

        <button
          onClick={() => {
            setSelectedCategory('gift-box');
            setActiveView('shop');
          }}
          className="text-xs sm:text-sm font-semibold text-[var(--accent-maroon)] dark:text-amber-400 hover:underline flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span>View All Hampers</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of 3 Clean, Premium Combo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredCombos.map((combo) => {
          const savings = combo.mrp - combo.price;

          return (
            <div
              key={combo.id}
              className="rounded-3xl border border-amber-300/80 dark:border-amber-700/60 bg-gradient-to-b from-[var(--bg-card)] to-[var(--bg-surface)] p-6 shadow-md flex flex-col justify-between relative group hover:border-amber-500 hover:shadow-xl transition-all duration-200"
            >
              {/* Highlight ribbon */}
              <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-red-600 text-white text-[11px] font-black px-3.5 py-1 rounded-bl-2xl shadow-sm">
                SAVE {formatINR(savings)}
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-2">
                  <Gift className="w-4 h-4" />
                  <span>{combo.brand}</span>
                </div>

                <h3 
                  onClick={() => setSelectedProductDetail(combo)}
                  className="brand-display text-xl font-black text-[var(--text-primary)] group-hover:text-[var(--accent-maroon)] dark:group-hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {combo.name}
                </h3>

                <p className="text-xs text-[var(--text-muted)] mt-1.5 line-clamp-2">
                  {combo.description}
                </p>

                {/* Clean Feature Pills instead of clumsy long checklist */}
                <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{combo.packSize}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>CSIR-NEERI Certified Green Formulation</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Waterproof Shock-Proof Carton Packing</span>
                  </div>
                </div>
              </div>

              {/* Price & Action Block */}
              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[var(--accent-maroon)] dark:text-amber-400 font-mono tabular-nums">
                      {formatINR(combo.price)}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] line-through font-mono tabular-nums">
                      {formatINR(combo.mrp)}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                    {combo.discountPercent}% Wholesale OFF
                  </span>
                </div>

                <button
                  onClick={() => addToEnquiry(combo, 1)}
                  className="h-10 px-4 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Box</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
