import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MessageCircle, 
  Printer, 
  Tag, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatINR, generateWhatsAppMessage, WHATSAPP_NUMBER } from '../utils/helpers';
import { CustomerDetails } from '../types';

export const EnquiryCartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    enquiryItems, 
    updateQuantity, 
    removeFromEnquiry, 
    clearEnquiry,
    totalItemsCount,
    totalMRP,
    totalWholesale,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setActiveView,
    setSelectedCategory
  } = useStore();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ error?: string; success?: string } | null>(null);

  // Customer delivery details for estimate
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    phone: '',
    email: '',
    city: '',
    state: 'Tamil Nadu',
    pincode: '',
    transportPreference: 'VRL / ARC Logistics / Lorry Parcel',
    notes: '',
  });

  const [showCheckoutFields, setShowCheckoutFields] = useState(false);

  if (!isCartOpen) return null;

  // Coupon calculations
  let finalWholesale = totalWholesale;
  let couponDiscountAmount = 0;
  if (appliedCoupon && totalWholesale >= appliedCoupon.minOrderValue) {
    couponDiscountAmount = Math.round((totalWholesale * appliedCoupon.discountPercent) / 100);
    finalWholesale = totalWholesale - couponDiscountAmount;
  }

  const netSavings = totalMRP - finalWholesale;
  const overallDiscount = totalMRP > 0 ? Math.round((netSavings / totalMRP) * 100) : 0;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = applyCoupon(couponCodeInput);
    if (res.success) {
      setCouponFeedback({ success: res.message });
      setCouponCodeInput('');
    } else {
      setCouponFeedback({ error: res.message });
    }
  };

  const handleSendWhatsApp = () => {
    if (enquiryItems.length === 0) return;
    const encoded = generateWhatsAppMessage(
      enquiryItems,
      customer.name ? customer : undefined,
      appliedCoupon ? { code: appliedCoupon.code, discountPercent: appliedCoupon.discountPercent } : undefined
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  const handlePrintEstimate = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-xl bg-[var(--bg-card)] h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[var(--border-subtle)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-surface)]">
          <div className="flex items-center gap-2">
            <span className="brand-display text-lg font-black text-[var(--accent-maroon)] dark:text-amber-400">
              Enquiry List
            </span>
            <span className="bg-amber-400 text-stone-950 text-xs font-bold px-2 py-0.5 rounded-full font-mono tabular-nums">
              {totalItemsCount} items
            </span>
          </div>

          <div className="flex items-center gap-2">
            {enquiryItems.length > 0 && (
              <button
                onClick={clearEnquiry}
                className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-medium p-1 cursor-pointer"
                title="Clear all items"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-5 space-y-6 overflow-y-auto">
          {enquiryItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <Sparkles className="w-12 h-12 text-amber-500 mx-auto stroke-1" />
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                Your Enquiry List is Empty
              </h3>
              <p className="text-xs text-[var(--text-muted)] max-w-xs mx-auto">
                Explore our authentic Sivakasi cracker catalog or wholesale price list to add items for factory estimate.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveView('shop');
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-xs shadow-md cursor-pointer hover:scale-105 transition-transform"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <>
              {/* Itemized List */}
              <div className="space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Selected Fireworks ({enquiryItems.length} Products):
                </p>

                <div className="divide-y divide-[var(--border-subtle)] border border-[var(--border-subtle)] rounded-2xl bg-[var(--bg-card)] overflow-hidden">
                  {enquiryItems.map((item) => (
                    <div key={item.product.id} className="p-3.5 flex items-center gap-3">
                      {/* Thumbnail */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-xl object-cover bg-stone-100 dark:bg-stone-800 shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs sm:text-sm text-[var(--text-primary)] truncate">
                          {item.product.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                          <span>{item.product.packSize}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-600 font-semibold">{item.product.discountPercent}% Off</span>
                        </div>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="font-bold text-xs text-[var(--accent-maroon)] dark:text-amber-400 font-mono tabular-nums">
                            {formatINR(item.product.price)}
                          </span>
                          <span className="text-[10px] text-[var(--text-muted)] line-through font-mono tabular-nums">
                            {formatINR(item.product.mrp)}
                          </span>
                        </div>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center border border-[var(--border-subtle)] rounded-lg bg-[var(--bg-surface)] p-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 rounded bg-[var(--bg-card)] text-[var(--text-primary)] flex items-center justify-center hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-bold text-xs font-mono tabular-nums text-[var(--text-primary)]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 rounded bg-[var(--bg-card)] text-[var(--text-primary)] flex items-center justify-center hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right w-16">
                        <span className="text-xs font-bold text-[var(--text-primary)] font-mono tabular-nums">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupon input */}
              <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Festival Coupon Code</span>
                  </span>
                  {appliedCoupon && (
                    <button
                      onClick={removeCoupon}
                      className="text-[11px] text-red-600 hover:underline cursor-pointer"
                    >
                      Remove ({appliedCoupon.code})
                    </button>
                  )}
                </div>

                {!appliedCoupon ? (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                      placeholder="e.g. DIWALI2026"
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] uppercase tracking-wider text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    ✓ Applied {appliedCoupon.code} (-{appliedCoupon.discountPercent}% extra savings)
                  </p>
                )}

                {couponFeedback?.error && (
                  <p className="text-[11px] text-red-600">{couponFeedback.error}</p>
                )}
                {couponFeedback?.success && (
                  <p className="text-[11px] text-emerald-600">{couponFeedback.success}</p>
                )}
              </div>

              {/* Optional Customer Details Accordion */}
              <div className="border border-[var(--border-subtle)] rounded-2xl bg-[var(--bg-card)] p-4 space-y-3">
                <button
                  type="button"
                  onClick={() => setShowCheckoutFields(!showCheckoutFields)}
                  className="w-full flex items-center justify-between text-xs font-bold text-[var(--text-primary)] cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>Customer & Delivery Details (For Estimate Slip)</span>
                  </span>
                  <span className="text-amber-600 text-[11px]">
                    {showCheckoutFields ? 'Hide ▲' : 'Fill Details ▼'}
                  </span>
                </button>

                {showCheckoutFields && (
                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <div>
                      <label className="block text-[10px] text-[var(--text-muted)] font-semibold mb-1">Your Name</label>
                      <input
                        type="text"
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[var(--text-muted)] font-semibold mb-1">WhatsApp Phone</label>
                      <input
                        type="tel"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        placeholder="e.g. 9876543210"
                        className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[var(--text-muted)] font-semibold mb-1">Delivery City</label>
                      <input
                        type="text"
                        value={customer.city}
                        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                        placeholder="e.g. Chennai / Bangalore / Hyderabad"
                        className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[var(--text-muted)] font-semibold mb-1">Transport Service</label>
                      <input
                        type="text"
                        value={customer.transportPreference}
                        onChange={(e) => setCustomer({ ...customer, transportPreference: e.target.value })}
                        placeholder="e.g. VRL / ARC / Kranti Transport"
                        className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] text-[var(--text-muted)] font-semibold mb-1">Special Packing Instructions / Notes</label>
                      <textarea
                        rows={2}
                        value={customer.notes}
                        onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                        placeholder="e.g. Moisture-proof box wrapping requested..."
                        className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Price Calculation Summary */}
              <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2 text-xs">
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Standard Retail MRP:</span>
                  <span className="line-through font-mono tabular-nums">{formatINR(totalMRP)}</span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Factory Wholesale Subtotal:</span>
                  <span className="font-mono tabular-nums">{formatINR(totalWholesale)}</span>
                </div>
                {couponDiscountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Savings ({appliedCoupon?.code}):</span>
                    <span className="font-mono tabular-nums">-{formatINR(couponDiscountAmount)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[var(--border-subtle)] flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-black text-[var(--text-primary)]">
                      Estimated Factory Total:
                    </span>
                    <p className="text-[10px] text-[var(--text-muted)]">
                      Excludes nominal lorry transport freight payable at delivery point
                    </p>
                  </div>
                  <span className="text-2xl font-black text-[var(--accent-maroon)] dark:text-amber-400 font-mono tabular-nums">
                    {formatINR(finalWholesale)}
                  </span>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 p-2 rounded-xl text-center font-bold text-xs">
                  🎉 Total Savings: {formatINR(netSavings)} ({overallDiscount}% Direct Wholesale Discount!)
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {enquiryItems.length > 0 && (
          <div className="p-5 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3">
            <button
              onClick={handleSendWhatsApp}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-sm shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Send Enquiry via WhatsApp ({formatINR(finalWholesale)})</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrintEstimate}
                className="flex-1 py-2.5 px-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-stone-200 dark:hover:bg-stone-800 text-xs font-semibold text-[var(--text-primary)] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-amber-600" />
                <span>Print Estimate Slip</span>
              </button>

              <button
                onClick={() => setIsCartOpen(false)}
                className="py-2.5 px-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:bg-stone-200 dark:hover:bg-stone-800 text-xs font-semibold text-[var(--text-secondary)] transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>

            <p className="text-[10px] text-center text-[var(--text-muted)] leading-tight">
              Legal Note: In compliance with Hon'ble Supreme Court guidelines, payment for firecrackers is finalized with verified factory representatives offline. No digital payment gateway is collected on this portal.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
