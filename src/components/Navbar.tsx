import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Heart, 
  Sun, 
  Moon, 
  Search, 
  Menu, 
  X, 
  FileSpreadsheet, 
  Flame,
  BookOpen,
  Award,
  PhoneCall,
  Gift
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatINR, WHATSAPP_NUMBER } from '../utils/helpers';

export const Navbar: React.FC = () => {
  const {
    theme,
    toggleTheme,
    totalItemsCount,
    totalWholesale,
    wishlist,
    activeView,
    setActiveView,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSpecOpen,
    setIsSpinWheelOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleNavClick = (view: 'home' | 'shop' | 'pricelist' | 'combos' | 'brands' | 'about') => {
    setActiveView(view);
    if (view === 'shop') {
      setSelectedCategory(null);
    }
    setMobileMenuOpen(false);
    setShowSearchModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveView('shop');
      setShowSearchModal(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-card)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors">
      
      {/* 1. Slim Announcement Bar (Responsive across all screen sizes) */}
      <div className="bg-gradient-to-r from-red-950 via-amber-900 to-red-950 text-amber-100 text-xs py-1.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-medium truncate text-[11px] sm:text-xs">
              Diwali 2026 Factory Wholesale Bookings Open · Direct from Vinayakam Manufacturer, Sivakasi
            </span>
          </div>
          
          <div className="flex items-center gap-2 shrink-0 text-[11px]">
            {/* Quick Spin Wheel Link */}
            <button
              onClick={() => setIsSpinWheelOpen(true)}
              className="text-amber-300 hover:text-white font-bold transition-colors flex items-center gap-1 cursor-pointer bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-full"
              title="Spin for 60% to 80% OFF"
            >
              <span>🎡</span>
              <span className="hidden sm:inline">Spin Wheel:</span>
              <span className="text-yellow-300 font-extrabold">60%–80% OFF</span>
            </button>

            <button 
              onClick={() => setIsSpecOpen(true)}
              className="hidden md:inline text-amber-200/90 hover:text-white transition-colors underline cursor-pointer font-semibold"
            >
              Specs
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar (Perfect alignment & no horizontal overflow on mobile or tablet) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo & Name */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-2 sm:gap-3 shrink-0 group cursor-pointer"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-xl bg-gradient-to-br from-red-700 via-amber-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-red-900/20 group-hover:scale-105 transition-transform shrink-0">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-amber-200 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="brand-display text-sm xs:text-base sm:text-xl lg:text-2xl font-black tracking-tight text-[var(--accent-maroon)] dark:text-amber-400 leading-tight">
              Vinayakam Cracker
            </span>
            <span className="hidden sm:block text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-wider uppercase text-amber-700 dark:text-amber-400/80 -mt-0.5">
              Direct In-House Manufacturer
            </span>
          </div>
        </a>

        {/* Center Navigation Links (Visible on Large Desktops & Laptops: >= 1024px) */}
        <nav 
          aria-label="Desktop Navigation"
          className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink-0"
        >
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all cursor-pointer ${
              activeView === 'home'
                ? 'bg-amber-500/10 text-[var(--accent-maroon)] dark:text-amber-400 font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--accent-maroon)] dark:hover:text-amber-400 hover:bg-[var(--bg-surface)]'
            }`}
          >
            Home
          </button>
          
          <button
            onClick={() => handleNavClick('shop')}
            className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all cursor-pointer ${
              activeView === 'shop'
                ? 'bg-amber-500/10 text-[var(--accent-maroon)] dark:text-amber-400 font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--accent-maroon)] dark:hover:text-amber-400 hover:bg-[var(--bg-surface)]'
            }`}
          >
            All Products
          </button>

          <button
            onClick={() => handleNavClick('pricelist')}
            className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeView === 'pricelist'
                ? 'bg-amber-500/10 text-[var(--accent-maroon)] dark:text-amber-400 font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--accent-maroon)] dark:hover:text-amber-400 hover:bg-[var(--bg-surface)]'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Price List</span>
          </button>

          <button
            onClick={() => handleNavClick('combos')}
            className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all cursor-pointer ${
              activeView === 'combos'
                ? 'bg-amber-500/10 text-[var(--accent-maroon)] dark:text-amber-400 font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--accent-maroon)] dark:hover:text-amber-400 hover:bg-[var(--bg-surface)]'
            }`}
          >
            Gift Combos
          </button>

          <button
            onClick={() => handleNavClick('brands')}
            className={`hidden xl:inline-flex px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all cursor-pointer ${
              activeView === 'brands'
                ? 'bg-amber-500/10 text-[var(--accent-maroon)] dark:text-amber-400 font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--accent-maroon)] dark:hover:text-amber-400 hover:bg-[var(--bg-surface)]'
            }`}
          >
            Divisions
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all cursor-pointer ${
              activeView === 'about'
                ? 'bg-amber-500/10 text-[var(--accent-maroon)] dark:text-amber-400 font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--accent-maroon)] dark:hover:text-amber-400 hover:bg-[var(--bg-surface)]'
            }`}
          >
            Factory Hub
          </button>

          {/* Desktop Spin Wheel Button */}
          <button
            onClick={() => setIsSpinWheelOpen(true)}
            className="ml-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 transition-transform cursor-pointer border border-yellow-300/40"
            title="Spin for 60% - 80% OFF"
          >
            <span className="text-sm">🎡</span>
            <span>Spin & Win</span>
            <span className="bg-yellow-300 text-red-950 px-1 py-0.2 rounded text-[10px] font-black">
              60–80%
            </span>
          </button>
        </nav>

        {/* Right Action Icons (Uniform height, clean spacing, no overflow) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Search Trigger */}
          <button
            onClick={() => setShowSearchModal(!showSearchModal)}
            title="Search Crackers"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-[var(--bg-surface)] hover:bg-amber-500/10 text-[var(--text-secondary)] hover:text-[var(--accent-maroon)] dark:hover:text-amber-400 border border-[var(--border-subtle)] transition-colors cursor-pointer"
            aria-label="Search products"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Trigger (Visible on tablet & desktop >= 640px) */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            title="Wishlist"
            className="hidden sm:flex w-10 h-10 rounded-xl relative items-center justify-center bg-[var(--bg-surface)] hover:bg-red-50 dark:hover:bg-red-950/20 text-[var(--text-secondary)] hover:text-red-600 border border-[var(--border-subtle)] transition-colors cursor-pointer"
            aria-label="View Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center shadow">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Enquiry Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="h-8 sm:h-10 px-2 sm:px-3.5 rounded-xl bg-gradient-to-r from-red-700 via-red-800 to-amber-700 hover:from-red-800 hover:to-amber-800 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer shrink-0"
            title="View Enquiry List"
            aria-label="View Enquiry List"
          >
            <ShoppingBag className="w-4 h-4 text-amber-200" />
            <span className="hidden sm:inline">Enquiry</span>
            <span className="bg-amber-400 text-red-950 px-1.5 py-0.2 rounded-full text-[11px] sm:text-xs font-black tabular-nums">
              {totalItemsCount}
            </span>
            {totalWholesale > 0 && (
              <span className="hidden xl:inline text-amber-200 text-xs tabular-nums border-l border-white/20 pl-2">
                {formatINR(totalWholesale)}
              </span>
            )}
          </button>

          {/* Mobile & Tablet Drawer Menu Button (< 1024px: lg:hidden) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center lg:hidden bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Slide-down Search Bar */}
      {showSearchModal && (
        <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3 shadow-inner animate-fadeIn">
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sparklers, flower pots, sky shots, combos..."
                autoFocus
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setShowSearchModal(false)}
              className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-xl hover:bg-[var(--bg-card)] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile & Tablet Drawer Menu (100% full navigation availability on mobile & tablet: < lg) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--bg-card)] border-b border-[var(--border-subtle)] px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-fadeIn max-h-[85vh] overflow-y-auto">
          
          {/* Festive Spin Wheel Callout Banner in Drawer */}
          <div 
            onClick={() => {
              setIsSpinWheelOpen(true);
              setMobileMenuOpen(false);
            }}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-red-900 via-amber-900 to-red-950 border border-yellow-400/40 text-white flex items-center justify-between gap-3 cursor-pointer shadow-md hover:scale-[1.01] transition-transform"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🎡</span>
              <div>
                <p className="text-xs font-black text-yellow-300 uppercase tracking-tight">
                  Spin the Festive Wheel
                </p>
                <p className="text-[11px] text-amber-100">
                  Guaranteed 60% – 80% Wholesale Discount
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-xl bg-yellow-400 text-red-950 font-black text-xs shrink-0 shadow-sm">
              Spin Now
            </span>
          </div>

          {/* Navigation Links Grid (Clean 2-column layout on mobile, 3-column on tablet) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm font-semibold">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3.5 py-2.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer ${
                activeView === 'home'
                  ? 'bg-amber-500/10 text-[var(--accent-maroon)] dark:text-amber-400 font-bold'
                  : 'hover:bg-[var(--bg-surface)] text-[var(--text-primary)]'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Home</span>
            </button>

            <button
              onClick={() => handleNavClick('shop')}
              className={`text-left px-3.5 py-2.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer ${
                activeView === 'shop'
                  ? 'bg-amber-500/10 text-[var(--accent-maroon)] dark:text-amber-400 font-bold'
                  : 'hover:bg-[var(--bg-surface)] text-[var(--text-primary)]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>All Products</span>
            </button>

            <button
              onClick={() => handleNavClick('pricelist')}
              className={`text-left px-3.5 py-2.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer ${
                activeView === 'pricelist'
                  ? 'bg-amber-500/10 text-[var(--accent-maroon)] dark:text-amber-400 font-bold'
                  : 'hover:bg-[var(--bg-surface)] text-[var(--text-primary)]'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-600" />
              <span>Price List</span>
            </button>

            <button
              onClick={() => handleNavClick('combos')}
              className={`text-left px-3.5 py-2.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer ${
                activeView === 'combos'
                  ? 'bg-amber-500/10 text-[var(--accent-maroon)] dark:text-amber-400 font-bold'
                  : 'hover:bg-[var(--bg-surface)] text-[var(--text-primary)]'
              }`}
            >
              <Gift className="w-4 h-4 text-amber-600" />
              <span>Gift Combos</span>
            </button>

            <button
              onClick={() => handleNavClick('brands')}
              className={`text-left px-3.5 py-2.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer ${
                activeView === 'brands'
                  ? 'bg-amber-500/10 text-[var(--accent-maroon)] dark:text-amber-400 font-bold'
                : 'hover:bg-[var(--bg-surface)] text-[var(--text-primary)]'
              }`}
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>Divisions</span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`text-left px-3.5 py-2.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer ${
                activeView === 'about'
                  ? 'bg-amber-500/10 text-[var(--accent-maroon)] dark:text-amber-400 font-bold'
                  : 'hover:bg-[var(--bg-surface)] text-[var(--text-primary)]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Factory & Safety</span>
            </button>
          </div>

          {/* Quick Wishlist, Theme & Specifications in Drawer */}
          <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
            <button
              onClick={() => {
                setIsWishlistOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300 font-semibold p-1 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-red-500" />
              <span>Wishlist ({wishlist.length})</span>
            </button>

            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300 font-semibold p-1 cursor-pointer"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-amber-700" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light Mode</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setIsSpecOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1 text-[var(--accent-maroon)] dark:text-amber-400 font-semibold p-1 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Specs</span>
            </button>
          </div>

          {/* Factory Direct WhatsApp Callout */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi! I want to enquire about Diwali 2026 factory wholesale bookings from Vinayakam Cracker.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow cursor-pointer transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Chat Factory Sales (+91 95511 11570)</span>
          </a>
        </div>
      )}
    </header>
  );
};
