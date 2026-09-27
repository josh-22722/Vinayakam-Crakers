import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { WHATSAPP_NUMBER } from '../utils/helpers';
import { ManufacturingVideoBackground } from './ManufacturingVideoBackground';

export const HeroSection: React.FC = () => {
  const { setActiveView, setSelectedCategory } = useStore();

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white min-h-[480px] lg:min-h-[560px] flex items-center">
      {/* Low-Bandwidth Looping Video Background Element */}
      <ManufacturingVideoBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full">
        <div className="max-w-2xl space-y-5">
          
          {/* Crisp, Natural Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider text-amber-300 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>DIWALI 2026 COLLECTIONS</span>
          </div>

          {/* Clean, Punchy Headline */}
          <h1 className="brand-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight text-balance">
            LIGHT UP
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400 mt-1">
              YOUR DIWALI
            </span>
          </h1>

          {/* Concise, Informative Subtitle */}
          <p className="text-base sm:text-lg text-stone-200 leading-relaxed text-balance">
            Premium crackers for unforgettable celebrations.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setActiveView('shop');
              }}
              className="h-12 px-6 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold text-sm shadow-lg shadow-red-900/30 transition-all hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Vinayakam Cracker, please share the Diwali 2026 wholesale cracker price list and booking details.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-all hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Order</span>
            </a>
          </div>

          {/* Sleek, Aligned Proof Metrics */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-stone-800/80 text-stone-300">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tabular-nums">80% OFF</p>
              <p className="text-xs text-stone-400 mt-0.5">Wholesale Savings</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">18+</p>
              <p className="text-xs text-stone-400 mt-0.5">Cracker Categories</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tabular-nums">100%</p>
              <p className="text-xs text-stone-400 mt-0.5">Green Certified</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">Since 1998</p>
              <p className="text-xs text-stone-400 mt-0.5">In-House Production</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
