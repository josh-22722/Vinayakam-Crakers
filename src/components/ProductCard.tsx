import React, { useState } from 'react';
import { Sparkles, Heart, Plus, Minus, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/helpers';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    enquiryItems, 
    addToEnquiry, 
    updateQuantity, 
    toggleWishlist, 
    isInWishlist,
    setSelectedProductDetail 
  } = useStore();

  const [imgError, setImgError] = useState(false);
  const inWishlist = isInWishlist(product.id);
  const cartItem = enquiryItems.find((i) => i.product.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="group rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between hover:-translate-y-1">
      {/* Visual Image Slot with Fallback Container */}
      <div className="relative aspect-[4/3] bg-stone-100 dark:bg-stone-900 overflow-hidden cursor-pointer"
        onClick={() => setSelectedProductDetail(product)}
      >
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Styled Fallback Container per Zero-Broken-Image Policy */
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-900/10 via-stone-800/10 to-red-900/10 text-stone-500">
            <Sparkles className="w-10 h-10 text-amber-500 mb-2 stroke-[1.5]" />
            <span className="text-xs font-semibold text-center">{product.name}</span>
            <span className="text-[10px] text-stone-400 mt-1">Vinayakam Manufactured</span>
          </div>
        )}

        {/* Subtle Discount Tag (Single top tag) */}
        <div className="absolute top-2.5 left-2.5 bg-red-600 text-white font-black text-[11px] px-2 py-0.5 rounded shadow">
          {product.discountPercent}% OFF
        </div>

        {/* Single subtle trait text */}
        {product.isBestSeller && (
          <div className="absolute top-2.5 right-11 bg-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded shadow">
            Bestseller
          </div>
        )}
        {!product.isBestSeller && product.isEcoFriendly && (
          <div className="absolute top-2.5 right-11 bg-emerald-600 text-white font-semibold text-[10px] px-2 py-0.5 rounded shadow">
            Green Cracker
          </div>
        )}

        {/* Wishlist Heart Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
            inWishlist
              ? 'bg-red-600 text-white'
              : 'bg-black/40 text-white hover:bg-black/60'
          }`}
          title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist toggle"
        >
          <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-3 py-1.5 rounded-lg bg-white/95 text-slate-900 text-xs font-semibold shadow-lg flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            <span>Quick Details</span>
          </span>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Zero-Pill Clean Unboxed Metadata with · separator */}
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium mb-1">
            <span className="capitalize">{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.packSize}</span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => setSelectedProductDetail(product)}
            className="font-bold text-sm sm:text-base text-[var(--text-primary)] hover:text-[var(--accent-maroon)] dark:hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[var(--text-muted)] line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        {/* Pricing Block & Sound Tag */}
        <div className="pt-2 border-t border-[var(--border-subtle)] space-y-2.5">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-[var(--accent-maroon)] dark:text-amber-400 font-mono tabular-nums">
                {formatINR(product.price)}
              </span>
              <span className="text-xs text-[var(--text-muted)] line-through font-mono tabular-nums">
                {formatINR(product.mrp)}
              </span>
            </div>
            <span className="text-[11px] text-[var(--text-muted)]">
              Sound: <strong className="text-[var(--text-secondary)]">{product.soundLevel}</strong>
            </span>
          </div>

          {/* Add to Enquiry Button / Quantity Stepper */}
          {currentQuantity === 0 ? (
            <button
              onClick={() => addToEnquiry(product, 1)}
              className="w-full py-2 px-3 rounded-xl bg-[var(--bg-surface)] hover:bg-amber-100 dark:hover:bg-amber-950/60 border border-[var(--border-subtle)] hover:border-amber-400 text-xs font-bold text-[var(--text-primary)] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Add to Enquiry</span>
            </button>
          ) : (
            <div className="flex items-center justify-between bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-xl p-1">
              <button
                onClick={() => updateQuantity(product.id, currentQuantity - 1)}
                className="w-7 h-7 rounded-lg bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 flex items-center justify-center shadow-xs hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-bold text-amber-900 dark:text-amber-200 font-mono tabular-nums px-2">
                {currentQuantity} in Enquiry
              </span>
              <button
                onClick={() => updateQuantity(product.id, currentQuantity + 1)}
                className="w-7 h-7 rounded-lg bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 flex items-center justify-center shadow-xs hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
