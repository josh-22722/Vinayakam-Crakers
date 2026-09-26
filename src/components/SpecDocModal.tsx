import React, { useState } from 'react';
import { X, Copy, Check, BookOpen, Download, FileText } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const SPEC_MARKDOWN_CONTENT = `# Vinayakam Cracker — Direct Fireworks Manufacturer Specification

## 1. Brand & Manufacturing Overview
- **Manufacturer Name:** Vinayakam Cracker
- **Business Model:** 100% In-House Fireworks Manufacturer & Wholesale Estimate Portal
- **Manufacturing Philosophy:** We are an independent pyrotechnics manufacturer producing our own full catalog of fireworks with certified chemical formulations, in-house quality control, and zero middleman markups.
- **Operating Policy:** In compliance with statutory fireworks regulations, this site functions as our direct manufacturing catalog showcase and instant WhatsApp order estimate generator with All-India transport delivery.
- **WhatsApp Support Number:** +91 95511 11570
- **Email:** contact@vinayakamcrackers.com
- **Manufacturing Plant Address:** 14/3B Vembakottai Main Road, Virudhunagar District, Tamil Nadu 626123, India

---

## 2. Product Catalog Taxonomy (18 In-House Categories)
1. Sparklers (Electric, Colour, Royal Gold, Butterfly)
2. Ground Chakkar & Spinners (Small, Big, Deluxe, Colour, Wheel Spinner)
3. Flower Pot (Small, Big, Deluxe, Colour, Musical)
4. Fountain (Silver, Colour, Chocolate, Gold, Sky, Night Queen)
5. Aerial Sky Shot (12 Shot, 25 Shot Raider, 30 Shot, 60 Shot, 100 Shot)
6. Multicolour Sky Shot (30 Shot Multicolour, 60 Shot Crackling, 100 Shot Finale)
7. Kids Crackers (Kuruvi Sparrow, Magic Pops, Ring Caps, Snake Tablets)
8. Rocket (Colour Rocket, Sound Rocket, Lunik Parachute)
9. Bombs (Hydro Bomb, Atom Bomb, Digital Ultra)
10. Wala & Garland (100 Wala, 500 Wala, 1000 Wala, 5000 Wala)
11. Gift Box (Family Box 32-Item, Royal Mega 55-Item, Kids Box)
12. One Sound Crackers (3½" Lakshmi, 4" Deluxe Lakshmi)
13. Combo Pack Crackers (Diwali Super Saver, Pyro Sky Master)
14. Twinkling Star (1.5" Strobe Pencils, Twinkling Deluxe)
15. Bijili (Red Bijili, Green Bijili, Stripped Bags)
16. Whistling Items (Whistling Wheels, Siren Spinners)
17. Paper Bomb (Jumbo Eco Paper Bombs)
18. In-House Manufacturing Divisions (Vinayakam Signature, Vinayakam Royal Pyro, Vinayakam Eco-Green, Vinayakam Kids Novelties)

---

## 3. Full Sitemap Checklist
- [x] Home (Hero, Trust strip, Categories, Featured Combos, Brands, Testimonials, FAQ)
- [x] All Products / Shop (Category filters, search, sound meters, sorting)
- [x] Wholesale Price List (Tabular matrix, inline quantities, PDF/print generator)
- [x] Enquiry Cart Drawer (WhatsApp itemized payload generator, coupon module)
- [x] Wishlist System (Local storage persistence)
- [x] Product Detail View (High-res specs, safety guidelines, CSIR-NEERI verification)
- [x] Manufacturing Divisions (Vinayakam Signature, Royal Pyro, Eco-Green, Kids Novelties)
- [x] Factory Contact & Dispatch Map (Transport hub logistics)
- [x] Statutory Legal Disclaimer (Supreme Court compliance notice)`;

export const SpecDocModal: React.FC = () => {
  const { isSpecOpen, setIsSpecOpen, showToast } = useStore();
  const [copied, setCopied] = useState(false);

  if (!isSpecOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(SPEC_MARKDOWN_CONTENT);
    setCopied(true);
    showToast('Catalog specification markdown copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([SPEC_MARKDOWN_CONTENT], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'VINAYAKAM_CRACKER_SPEC.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="w-full max-w-4xl max-h-[90vh] bg-[var(--bg-card)] rounded-3xl border border-[var(--border-subtle)] shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="brand-display text-lg font-black text-[var(--text-primary)]">
              Store Catalog & Technical Architecture Specification
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-stone-200 dark:hover:bg-stone-800 text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Spec'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-[var(--accent-maroon)] text-white hover:opacity-90 text-xs font-semibold flex items-center gap-1.5 transition-opacity cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>

            <button
              onClick={() => setIsSpecOpen(false)}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
              aria-label="Close specification"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Markdown Prose Container */}
        <div className="p-6 overflow-y-auto font-mono text-xs text-[var(--text-secondary)] leading-relaxed space-y-4 bg-stone-50/50 dark:bg-stone-950/50">
          <pre className="whitespace-pre-wrap font-mono text-xs">{SPEC_MARKDOWN_CONTENT}</pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between text-xs text-[var(--text-muted)]">
          <span>Saved locally as <strong className="text-[var(--text-primary)]">/CATALOG_SPEC.md</strong></span>
          <button
            onClick={() => setIsSpecOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] font-medium text-[var(--text-primary)] hover:bg-stone-200 dark:hover:bg-stone-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
