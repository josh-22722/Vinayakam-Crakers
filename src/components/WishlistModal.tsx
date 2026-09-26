import React from 'react';
import { X, Heart, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { formatINR } from '../utils/helpers';

export const WishlistModal: React.FC = () => {
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    wishlist, 
    toggleWishlist, 
    addToEnquiry,
    setIsCartOpen,
    setActiveView 
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-[var(--bg-card)] h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[var(--border-subtle)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-surface)]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600 fill-red-600" />
            <span className="brand-display text-lg font-black text-[var(--text-primary)]">
              Saved Wishlist ({wishlist.length})
            </span>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Heart className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto stroke-1" />
              <h3 className="text-base font-bold text-[var(--text-primary)]">No Saved Items</h3>
              <p className="text-xs text-[var(--text-muted)] max-w-xs mx-auto">
                Tap the heart icon on any cracker card to save your favorites for quick review.
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  setActiveView('shop');
                }}
                className="px-4 py-2 rounded-xl bg-[var(--accent-maroon)] text-white text-xs font-bold shadow cursor-pointer"
              >
                Explore Products
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {wishlistProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center gap-3"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-14 h-14 rounded-xl object-cover bg-stone-200 dark:bg-stone-800 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-[var(--text-primary)] truncate">
                      {p.name}
                    </h4>
                    <p className="text-[11px] text-[var(--text-muted)]">{p.packSize}</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-black text-[var(--accent-maroon)] dark:text-amber-400 font-mono tabular-nums">
                        {formatINR(p.price)}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] line-through font-mono tabular-nums">
                        {formatINR(p.mrp)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => addToEnquiry(p, 1)}
                      className="p-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs transition-colors cursor-pointer"
                      title="Add to Enquiry List"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="p-2 rounded-lg bg-stone-200 dark:bg-stone-800 text-stone-500 hover:text-red-600 transition-colors cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-5 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between">
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => addToEnquiry(p, 1));
                setIsWishlistOpen(false);
                setIsCartOpen(true);
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-102 transition-transform"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add All Wishlist Items to Enquiry</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
