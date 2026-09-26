import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';

interface Testimonial {
  name: string;
  city: string;
  text: string;
  orderType: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Suresh Narayanan',
    city: 'Chennai',
    text: 'Ordered 15 Mega Boxes for our community. Exceptional sparkler duration and sound quality, saving over ₹35,000 vs local stalls.',
    orderType: 'Society Order',
  },
  {
    name: 'Priyanka Reddy',
    city: 'Hyderabad',
    text: 'Smooth WhatsApp ordering! Received the LR copy within 24 hours. Crackers arrived in heavy waterproof boxes with zero damage.',
    orderType: 'Family Combo',
  },
  {
    name: 'Vikram Joshi',
    city: 'Bangalore',
    text: 'Direct factory pricing and CSIR-NEERI green QR codes scanned genuinely on the app. Best festival cracker supplier.',
    orderType: 'Bulk Booking',
  },
];

const FAQS = [
  {
    q: 'How does WhatsApp ordering & estimate work?',
    a: 'Add your chosen fireworks to the Enquiry list, click "Send Enquiry via WhatsApp", and our Vinayakam factory dispatch desk confirms stock, applies bulk discounts, and arranges lorry transport dispatch.',
  },
  {
    q: 'Are these crackers certified green crackers?',
    a: 'Yes, 100% of our products are manufactured under approved PESO licenses adhering strictly to CSIR-NEERI green cracker norms with lower emissions and zero toxic barium.',
  },
  {
    q: 'What is the wholesale discount and minimum order?',
    a: 'You get 75% to 80% off MRP directly from our manufacturing facility. We recommend a minimum enquiry value of ₹1,500 to qualify for factory rates.',
  },
  {
    q: 'How do I receive my parcel?',
    a: 'Crackers travel via road lorry transport in compliance with safety laws. Once the truck arrives at your city parcel office (typically 3–5 days), you receive the LR number for collection.',
  },
];

export const TestimonialsAndFaq: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Testimonials */}
      <div>
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Verified Feedback
          </span>
          <h2 className="brand-display text-2xl sm:text-3xl font-black text-[var(--text-primary)] mt-0.5">
            Trusted Across India
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col justify-between shadow-xs space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-[var(--text-primary)]">{t.name}</p>
                  <p className="text-[11px] text-[var(--text-muted)]">{t.city}</p>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                  {t.orderType}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Quick Answers
          </span>
          <h2 className="brand-display text-2xl sm:text-3xl font-black text-[var(--text-primary)] mt-0.5">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-2.5">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div
                key={index}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[var(--text-primary)] flex items-center justify-between gap-4 cursor-pointer hover:bg-[var(--bg-surface)]"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
