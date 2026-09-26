import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldAlert, 
  Heart, 
  Plus, 
  Minus, 
  MessageCircle, 
  Volume2, 
  Check, 
  Flame 
} from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { formatINR, WHATSAPP_NUMBER } from '../utils/helpers';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProductDetail, 
    setSelectedProductDetail, 
    addToEnquiry, 
    toggleWishlist, 
    isInWishlist 
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);

  if (!selectedProductDetail) return null;
  const product = selectedProductDetail;
  const inWishlist = isInWishlist(product.id);

  const handleAdd = () => {
    addToEnquiry(product, quantity);
    setSelectedProductDetail(null);
  };

  const directProductWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi Vinayakam Cracker, I am inquiring about *${product.name}* (${product.packSize}) at wholesale price ${formatINR(product.price)}. Please confirm availability and dispatch dates.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductDetail(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer"
          aria-label="Close product modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Slot */}
          <div className="relative aspect-square md:aspect-auto bg-stone-100 dark:bg-stone-900 min-h-[300px]">
            {!imgError ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-amber-900/10 via-stone-800/10 to-red-900/10 text-stone-500">
                <Sparkles className="w-16 h-16 text-amber-500 mb-3 stroke-[1.5]" />
                <span className="text-base font-semibold text-center">{product.name}</span>
                <span className="text-xs text-stone-400 mt-1">Vinayakam Factory In-House Production</span>
              </div>
            )}

            <div className="absolute top-4 left-4 bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded shadow">
              {product.discountPercent}% WHOLESALE DISCOUNT
            </div>
          </div>

          {/* Details & Specifications */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-medium mb-1.5">
                <span className="uppercase tracking-wider font-semibold text-amber-600 dark:text-amber-400">
                  {product.brand}
                </span>
                <span aria-hidden="true">·</span>
                <span>{product.packSize}</span>
              </div>

              <h2 className="brand-display text-2xl font-black text-[var(--text-primary)]">
                {product.name}
              </h2>

              {/* Price display */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-3xl font-black text-[var(--accent-maroon)] dark:text-amber-400 font-mono tabular-nums">
                  {formatINR(product.price)}
                </span>
                <span className="text-base text-[var(--text-muted)] line-through font-mono tabular-nums">
                  MRP {formatINR(product.mrp)}
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Save {formatINR(product.mrp - product.price)}
                </span>
              </div>

              <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                {product.description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                  <span className="text-[var(--text-muted)] block text-[10px] uppercase font-semibold">Sound Rating</span>
                  <span className="font-bold text-[var(--text-primary)] flex items-center gap-1 mt-0.5">
                    <Volume2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>{product.soundLevel} Decibel</span>
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                  <span className="text-[var(--text-muted)] block text-[10px] uppercase font-semibold">Visual Effect</span>
                  <span className="font-bold text-[var(--text-primary)] flex items-center gap-1 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>{product.visualEffect}</span>
                  </span>
                </div>
              </div>

              {/* Box Contents if present */}
              {product.boxContents && product.boxContents.length > 0 && (
                <div className="mt-4 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 block mb-1">
                    Pack Items Breakdown:
                  </span>
                  <ul className="text-xs text-[var(--text-secondary)] space-y-1">
                    {product.boxContents.map((c, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Safety notice */}
              <div className="mt-4 flex items-start gap-2 text-[11px] text-[var(--text-muted)]">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>CSIR-NEERI Green Cracker compliant with QR verification on outer box. Use only outdoors under adult supervision.</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)] p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)] flex items-center justify-center hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-12 text-center font-bold text-sm font-mono tabular-nums text-[var(--text-primary)]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)] flex items-center justify-center hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Enquiry Button */}
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add {quantity} to Enquiry List</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-xl border border-[var(--border-subtle)] transition-colors cursor-pointer ${
                    inWishlist ? 'bg-red-50 dark:bg-red-950/40 text-red-600 border-red-300' : 'hover:bg-[var(--bg-surface)] text-[var(--text-muted)]'
                  }`}
                  title="Wishlist"
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Direct WhatsApp Option */}
              <button
                onClick={directProductWhatsApp}
                className="w-full py-2.5 px-4 rounded-xl border border-emerald-600/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ask Vinayakam Factory via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
