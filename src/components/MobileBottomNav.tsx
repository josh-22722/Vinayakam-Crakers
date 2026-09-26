import React from 'react';
import { 
  Flame, 
  Sparkles, 
  FileSpreadsheet, 
  ShoppingBag
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MobileBottomNav: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    setIsCartOpen, 
    setIsSpinWheelOpen, 
    totalItemsCount 
  } = useStore();

  const handleNav = (view: 'home' | 'shop' | 'pricelist' | 'combos') => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav 
      aria-label="Mobile Navigation Dock" 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-card)]/95 backdrop-blur-xl border-t border-[var(--border-subtle)] shadow-[0_-4px_20px_rgba(0,0,0,0.15)] pb-[env(safe-area-inset-bottom,0.5rem)]"
    >
      <div className="grid grid-cols-5 h-16 items-center px-1 max-w-lg mx-auto">
        
        {/* 1. Home Tab */}
        <button
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center justify-center h-full py-1 transition-colors cursor-pointer ${
            activeView === 'home'
              ? 'text-[var(--accent-maroon)] dark:text-amber-400 font-bold'
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
          aria-label="Home page"
        >
          <Flame className={`w-5 h-5 ${activeView === 'home' ? 'fill-current animate-pulse' : ''}`} />
          <span className="text-[10px] mt-1 tracking-tight font-medium">Home</span>
          {activeView === 'home' && (
            <span className="w-1 h-1 rounded-full bg-[var(--accent-maroon)] dark:bg-amber-400 mt-0.5"></span>
          )}
        </button>

        {/* 2. All Crackers Catalog */}
        <button
          onClick={() => handleNav('shop')}
          className={`flex flex-col items-center justify-center h-full py-1 transition-colors cursor-pointer ${
            activeView === 'shop'
              ? 'text-[var(--accent-maroon)] dark:text-amber-400 font-bold'
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
          aria-label="Products catalog"
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight font-medium">Products</span>
          {activeView === 'shop' && (
            <span className="w-1 h-1 rounded-full bg-[var(--accent-maroon)] dark:bg-amber-400 mt-0.5"></span>
          )}
        </button>

        {/* 3. Spin Wheel Center Star Button (60 - 80% OFF Guaranteed) */}
        <button
          onClick={() => setIsSpinWheelOpen(true)}
          className="flex flex-col items-center justify-center h-full -mt-3.5 group cursor-pointer"
          title="Spin the Festive Wheel for 60% - 80% OFF"
          aria-label="Spin and win offers wheel"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 via-amber-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-900/30 group-hover:scale-105 active:scale-95 transition-transform">
            <div className="w-full h-full rounded-full bg-red-950 flex flex-col items-center justify-center text-amber-300">
              <span className="text-base leading-none">🎡</span>
              <span className="text-[8px] font-black uppercase text-amber-200 tracking-tighter mt-0.5">Spin</span>
            </div>
          </div>
          <span className="text-[9px] font-black text-amber-600 dark:text-amber-400 mt-1 uppercase tracking-tight">
            60–80% OFF
          </span>
        </button>

        {/* 4. Wholesale Price List */}
        <button
          onClick={() => handleNav('pricelist')}
          className={`flex flex-col items-center justify-center h-full py-1 transition-colors cursor-pointer ${
            activeView === 'pricelist'
              ? 'text-[var(--accent-maroon)] dark:text-amber-400 font-bold'
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
          aria-label="Wholesale price list"
        >
          <FileSpreadsheet className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight font-medium">Price List</span>
          {activeView === 'pricelist' && (
            <span className="w-1 h-1 rounded-full bg-[var(--accent-maroon)] dark:bg-amber-400 mt-0.5"></span>
          )}
        </button>

        {/* 5. Enquiry Cart with Badge */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center h-full py-1 relative text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          aria-label="Enquiry cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-[var(--text-secondary)]" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center shadow-sm">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight font-medium">Enquiry</span>
        </button>

      </div>
    </nav>
  );
};
