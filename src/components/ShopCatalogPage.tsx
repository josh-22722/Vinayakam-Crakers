import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { BRANDS } from '../data/brands';
import { ProductCard } from './ProductCard';
import { useStore } from '../context/StoreContext';

export const ShopCatalogPage: React.FC = () => {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery 
  } = useStore();

  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedSound, setSelectedSound] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'discount'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'all') {
        const brandObj = BRANDS.find((b) => b.id === selectedBrand);
        if (brandObj && product.brand !== brandObj.name) {
          return false;
        }
      }
      // Sound filter
      if (selectedSound !== 'all' && product.soundLevel !== selectedSound) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      // Default: Bestsellers first
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [selectedCategory, selectedBrand, selectedSound, searchQuery, sortBy]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="pb-6 border-b border-[var(--border-subtle)] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-maroon)] dark:text-amber-400">
            Factory Direct Wholesale
          </span>
          <h1 className="brand-display text-3xl sm:text-4xl font-black text-[var(--text-primary)] mt-1">
            {activeCategoryObj ? activeCategoryObj.name : 'Complete Fireworks Catalog'}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            {activeCategoryObj
              ? activeCategoryObj.description
              : 'Browse our factory-fresh in-house manufactured fireworks inventory. All items available at direct manufacturer wholesale rates with up to 80% discount.'}
          </p>
        </div>

        {/* Total found info */}
        <div className="text-xs text-[var(--text-muted)] font-medium self-start md:self-auto">
          Showing <strong className="text-[var(--text-primary)] font-mono tabular-nums">{filteredProducts.length}</strong> fireworks
        </div>
      </div>

      {/* Main Content Layout with Sidebar Filters */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block space-y-6">
          {/* Active Filters Clear */}
          {(selectedCategory || selectedBrand !== 'all' || selectedSound !== 'all' || searchQuery) && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-900 dark:text-amber-200">
                Filters Active
              </span>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand('all');
                  setSelectedSound('all');
                  setSearchQuery('');
                }}
                className="text-xs text-red-600 hover:underline font-bold cursor-pointer"
              >
                Reset All
              </button>
            </div>
          )}

          {/* Search Box */}
          <div className="p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Search Products
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. sparkler, hydro, shot..."
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Categories Selector */}
          <div className="p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Categories ({CATEGORIES.length})
              </label>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-[11px] text-amber-600 hover:underline cursor-pointer"
                >
                  All
                </button>
              )}
            </div>

            <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                  selectedCategory === null
                    ? 'bg-[var(--accent-maroon)] text-white shadow-xs'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]'
                }`}
              >
                <span>All Categories</span>
                <span className="font-mono text-[10px] opacity-75">{PRODUCTS.length}</span>
              </button>

              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[var(--accent-maroon)] text-white shadow-xs'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="font-mono text-[10px] opacity-75">{cat.itemCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands Filter */}
          <div className="p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Manufacturing Division
            </label>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedBrand('all')}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedBrand === 'all'
                    ? 'bg-amber-600 text-white font-bold'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]'
                }`}
              >
                All Vinayakam Divisions
              </button>
              {BRANDS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBrand(b.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedBrand === b.id
                      ? 'bg-amber-600 text-white font-bold'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]'
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sound Decibel Filter */}
          <div className="p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Sound Intensity
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {['all', 'None', 'Low', 'Medium', 'High', 'Sonic'].map((sound) => (
                <button
                  key={sound}
                  onClick={() => setSelectedSound(sound)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium capitalize text-center transition-colors cursor-pointer ${
                    selectedSound === sound
                      ? 'bg-[var(--text-primary)] text-[var(--bg-card)] font-bold'
                      : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {sound === 'all' ? 'Any Sound' : sound}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Product Grid */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Sort and Mobile Filter Trigger */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <div className="flex items-center gap-2">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters ({selectedCategory ? 1 : 0})</span>
              </button>

              <span className="text-xs text-[var(--text-muted)] hidden sm:inline">
                Sort catalog by:
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-lg px-2.5 py-1.5 border border-[var(--border-subtle)] focus:outline-none cursor-pointer"
              >
                <option value="featured">Bestsellers & Featured</option>
                <option value="discount">Highest Discount (Up to 80%)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Mobile Filter Sheet */}
          {mobileFilterOpen && (
            <div className="lg:hidden p-4 rounded-2xl border border-amber-300 dark:border-amber-800 bg-[var(--bg-card)] space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                <span className="text-xs font-bold uppercase">Filter Products</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-xs text-stone-500"
                >
                  Close ✕
                </button>
              </div>

              {/* Categories */}
              <div>
                <label className="text-[11px] font-bold text-[var(--text-muted)] block mb-1">Category</label>
                <select
                  value={selectedCategory || 'all'}
                  onChange={(e) => setSelectedCategory(e.target.value === 'all' ? null : e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
                >
                  <option value="all">All Categories ({PRODUCTS.length})</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.itemCount})
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="text-[11px] font-bold text-[var(--text-muted)] block mb-1">Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
                >
                  <option value="all">All Brands</option>
                  {BRANDS.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 rounded-3xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 space-y-4">
              <Sparkles className="w-12 h-12 text-stone-400 mx-auto" />
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                No Fireworks Matched Your Filter
              </h3>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                Try clearing your search keyword or selecting "All Categories" to see our full festival inventory.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand('all');
                  setSelectedSound('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-[var(--accent-maroon)] text-white text-xs font-bold cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
