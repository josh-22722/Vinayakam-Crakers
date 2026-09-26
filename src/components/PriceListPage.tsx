import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Printer, 
  Download, 
  Search, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Check, 
  Filter, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/helpers';

export const PriceListPage: React.FC = () => {
  const { enquiryItems, updateQuantity, addToEnquiry, setIsCartOpen, showToast } = useStore();
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  // Local state for quantity inputs on the price list table
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    enquiryItems.forEach((item) => {
      initial[item.product.id] = item.quantity;
    });
    return initial;
  });

  const handleQtyChange = (productId: string, val: number) => {
    const safeVal = Math.max(0, val);
    setQuantities((prev) => ({
      ...prev,
      [productId]: safeVal,
    }));
  };

  const handleApplyAllToCart = () => {
    let addedCount = 0;
    Object.entries(quantities).forEach(([prodId, qty]) => {
      const product = PRODUCTS.find((p) => p.id === prodId);
      if (product && qty > 0) {
        updateQuantity(prodId, qty);
        addedCount++;
      }
    });
    showToast(`Updated ${addedCount} items in Enquiry List`);
    setIsCartOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCat = selectedCat === 'all' || p.category === selectedCat;
    const matchesQuery = !query || 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.brand.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  // Calculate live estimate for quantities in the table
  const totalEnteredQty = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalEnteredWholesale = Object.entries(quantities).reduce((sum, [id, qty]) => {
    const prod = PRODUCTS.find((p) => p.id === id);
    return sum + (prod ? prod.price * qty : 0);
  }, 0);
  const totalEnteredMRP = Object.entries(quantities).reduce((sum, [id, qty]) => {
    const prod = PRODUCTS.find((p) => p.id === id);
    return sum + (prod ? prod.mrp * qty : 0);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border-subtle)]">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Factory Wholesale Price Matrix</span>
          </div>
          <h1 className="brand-display text-3xl sm:text-4xl font-black text-[var(--text-primary)]">
            Wholesale Price List — Diwali 2026
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1 max-w-2xl">
            Complete master price list directly from our Vinayakam manufacturing plant. Enter desired order quantities below and generate your direct manufacturer WhatsApp enquiry slip.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 no-print">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-stone-200 dark:hover:bg-stone-800 text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Print or Save as PDF"
          >
            <Printer className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Print / PDF</span>
          </button>

          <button
            onClick={handleApplyAllToCart}
            disabled={totalEnteredQty === 0}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer ${
              totalEnteredQty > 0
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white hover:from-red-700 hover:to-amber-700 hover:scale-105'
                : 'bg-stone-300 dark:bg-stone-800 text-stone-500 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Update Enquiry ({totalEnteredQty})</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="my-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 no-print">
        {/* Category selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedCat === 'all'
                ? 'bg-[var(--accent-maroon)] text-white shadow-xs'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            All Categories ({PRODUCTS.length})
          </button>
          {CATEGORIES.slice(0, 7).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCat === cat.id
                  ? 'bg-[var(--accent-maroon)] text-white shadow-xs'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Live Search */}
        <div className="relative sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter item name..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Tabular Price Matrix */}
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] text-[var(--text-secondary)] font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Product Name & Category</th>
                <th className="py-3 px-4">Pack Size</th>
                <th className="py-3 px-4 text-right">Standard MRP</th>
                <th className="py-3 px-4 text-right">Wholesale Rate</th>
                <th className="py-3 px-4 text-center">Discount</th>
                <th className="py-3 px-4 text-center no-print">Order Quantity</th>
                <th className="py-3 px-4 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {filteredProducts.map((p, index) => {
                const qty = quantities[p.id] || 0;
                const subtotal = p.price * qty;

                return (
                  <tr 
                    key={p.id}
                    className={`hover:bg-[var(--bg-surface)]/60 transition-colors ${
                      qty > 0 ? 'bg-amber-500/5' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-mono text-[var(--text-muted)] text-xs">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-[var(--text-primary)] leading-snug">
                        {p.name}
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)] flex items-center gap-1.5 mt-0.5">
                        <span>{p.brand}</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{p.category.replace('-', ' ')}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[var(--text-secondary)] font-medium text-xs">
                      {p.packSize}
                    </td>
                    <td className="py-3 px-4 text-right text-[var(--text-muted)] font-mono tabular-nums line-through text-xs">
                      {formatINR(p.mrp)}
                    </td>
                    <td className="py-3 px-4 text-right font-black text-[var(--accent-maroon)] dark:text-amber-400 font-mono tabular-nums text-sm">
                      {formatINR(p.price)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs font-mono">
                        {p.discountPercent}% OFF
                      </span>
                    </td>
                    {/* Stepper control */}
                    <td className="py-2.5 px-4 text-center no-print">
                      <div className="inline-flex items-center border border-[var(--border-subtle)] rounded-lg bg-[var(--bg-surface)] p-0.5">
                        <button
                          onClick={() => handleQtyChange(p.id, qty - 1)}
                          className="w-6 h-6 rounded bg-[var(--bg-card)] text-[var(--text-primary)] flex items-center justify-center hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={qty}
                          onChange={(e) => handleQtyChange(p.id, parseInt(e.target.value) || 0)}
                          className="w-10 text-center font-bold text-xs font-mono tabular-nums bg-transparent text-[var(--text-primary)] focus:outline-none"
                        />
                        <button
                          onClick={() => handleQtyChange(p.id, qty + 1)}
                          className="w-6 h-6 rounded bg-[var(--bg-card)] text-[var(--text-primary)] flex items-center justify-center hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-[var(--text-primary)] font-mono tabular-nums">
                      {qty > 0 ? formatINR(subtotal) : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Live Running Total Summary Bar */}
        <div className="bg-[var(--bg-surface)] p-4 sm:p-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-xs text-[var(--text-muted)] font-medium">
              Selection Summary ({totalEnteredQty} units total selected)
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-[var(--accent-maroon)] dark:text-amber-400 font-mono tabular-nums">
                {formatINR(totalEnteredWholesale)}
              </span>
              {totalEnteredMRP > 0 && (
                <>
                  <span className="text-xs text-[var(--text-muted)] line-through font-mono tabular-nums">
                    MRP {formatINR(totalEnteredMRP)}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    You Save {formatINR(totalEnteredMRP - totalEnteredWholesale)}!
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 no-print">
            <button
              onClick={handleApplyAllToCart}
              disabled={totalEnteredQty === 0}
              className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer ${
                totalEnteredQty > 0
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white hover:from-red-700 hover:to-amber-700 hover:scale-105'
                  : 'bg-stone-300 dark:bg-stone-800 text-stone-500 cursor-not-allowed'
              }`}
            >
              <span>Add All to Enquiry & Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
