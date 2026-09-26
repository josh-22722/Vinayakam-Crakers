import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { WHATSAPP_NUMBER, generateWhatsAppMessage } from '../utils/helpers';

export const FixedWhatsApp: React.FC = () => {
  const { enquiryItems, appliedCoupon, totalItemsCount } = useStore();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getWhatsAppUrl = () => {
    if (enquiryItems.length > 0) {
      const encodedMsg = generateWhatsAppMessage(
        enquiryItems,
        undefined,
        appliedCoupon ? { code: appliedCoupon.code, discountPercent: appliedCoupon.discountPercent } : undefined
      );
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
    }
    const defaultMsg = encodeURIComponent(
      "Hi! I would like to enquire about fireworks directly manufactured by Vinayakam Cracker factory for Diwali 2026."
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMsg}`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-20 right-3 sm:right-4 lg:bottom-6 lg:right-6 z-40 flex flex-col items-end gap-2.5 whatsapp-fixed">
      {/* Scroll to Top (Smoothly appears once scrolled down) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] shadow-md flex items-center justify-center hover:bg-[var(--bg-surface)] transition-all hover:-translate-y-1 cursor-pointer animate-fadeIn"
          title="Scroll to Top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* WhatsApp Floating Button */}
      <div 
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Subtle Tooltip on Desktop */}
        {showTooltip && (
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap hidden lg:flex items-center gap-1.5 animate-fadeIn">
            <span>WhatsApp Enquiry: +91 95511 11570</span>
            {totalItemsCount > 0 && (
              <span className="bg-amber-400 text-slate-950 font-bold px-1.5 rounded text-[10px]">
                {totalItemsCount} items
              </span>
            )}
            <div className="w-2 h-2 bg-slate-900 rotate-45 absolute -right-1 top-1/2 -translate-y-1/2" />
          </div>
        )}

        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-pulse-btn w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-transform cursor-pointer relative"
          aria-label="Enquire on WhatsApp (+91 95511 11570)"
          title="Direct WhatsApp Enquiry: +91 95511 11570"
        >
          {/* Custom SVG Official WhatsApp Icon */}
          <svg className="w-6 h-6 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.974.532 1.947.818 2.802.818l.003-.001c3.183 0 5.768-2.586 5.769-5.766.001-3.182-2.585-5.803-5.778-5.803zm3.364 8.243c-.144.405-.837.774-1.17.824-.312.046-.713.064-1.144-.075-.276-.089-.636-.217-1.111-.42-1.956-.838-3.237-2.825-3.336-2.956-.099-.131-.795-1.057-.795-2.016 0-.959.503-1.431.682-1.627.18-.196.39-.245.52-.245.13 0 .26.002.373.007.12.006.28-.046.437.332.164.393.559 1.363.608 1.462.049.098.082.213.016.344-.066.13-.099.213-.197.328-.098.115-.207.257-.296.345-.098.099-.201.206-.087.402.115.197.511.844 1.096 1.366.753.672 1.388.88 1.585.979.197.098.312.082.427-.049.115-.131.492-.574.623-.771.131-.197.262-.164.443-.098.18.066 1.148.541 1.345.64.197.098.328.148.377.23.049.082.049.475-.095.88z" />
          </svg>

          {/* Badge indicator if items are ready to send */}
          {totalItemsCount > 0 && (
            <span className="absolute -top-1 -left-1 bg-red-600 text-white text-[10px] sm:text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
              {totalItemsCount}
            </span>
          )}
        </a>
      </div>
    </div>
  );
};
