import React, { useState } from 'react';
import { Tag, Copy, Check, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CouponBanner: React.FC = () => {
  const { applyCoupon, appliedCoupon, setIsCartOpen, setIsSpinWheelOpen } = useStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="rounded-3xl bg-gradient-to-r from-red-950 via-amber-950 to-stone-900 border border-amber-500/30 p-5 sm:p-6 text-white relative overflow-hidden shadow-lg">
        
        {/* Festive Background Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              <span>Festive Discount Dhamaka</span>
            </div>
            <h3 className="brand-display text-xl sm:text-2xl font-black text-amber-100">
              Direct Wholesale Savings (60% to 80% OFF)
            </h3>
            <p className="text-xs text-amber-200/80">
              Spin the lucky festive wheel or use guaranteed Sivakasi manufacturer coupon codes.
            </p>
          </div>

          {/* Clean Coupon Chips & Spin Wheel CTA */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Spin Wheel Interactive Button */}
            <button
              onClick={() => setIsSpinWheelOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-stone-950 font-black text-xs flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span className="text-base">🎡</span>
              <span>Spin & Win 60%–80%</span>
              <Sparkles className="w-3.5 h-3.5 text-red-700 animate-pulse" />
            </button>

            {/* Direct Factory 80% Coupon Chip */}
            <div className="px-3.5 py-2 rounded-2xl bg-black/50 border border-amber-400/40 flex items-center gap-3">
              <div>
                <p className="text-[10px] text-amber-300 font-semibold uppercase">80% MEGA CLEARANCE</p>
                <p className="font-mono text-sm font-black text-white tracking-wider">DIWALI80</p>
              </div>
              <button
                onClick={() => handleCopy('DIWALI80')}
                className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copiedCode === 'DIWALI80' || appliedCoupon?.code === 'DIWALI80' ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Applied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* View Enquiry */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>View Enquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
