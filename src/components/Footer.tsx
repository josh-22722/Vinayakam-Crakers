import React from 'react';
import { Sparkles, MapPin, Phone, Mail, ShieldCheck, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setActiveView, setSelectedCategory, setIsSpecOpen } = useStore();

  const handleNav = (view: 'home' | 'shop' | 'pricelist' | 'combos' | 'brands' | 'about') => {
    setActiveView(view);
    if (view === 'shop') setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        {/* Top 4-column block */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span className="brand-display text-xl font-black text-white">
                Vinayakam Cracker
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed max-w-sm">
              Direct fireworks manufacturer operating our own licensed production works. Producing genuine CSIR-NEERI certified green crackers to celebrate Diwali with joy, safety, and authentic in-house 75%–80% factory savings.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>PESO License: TN/SIV/EXP/2026/891 · Vinayakam Works, India</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">
              Store Catalog
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-amber-400 transition-colors">
                  All Fireworks Catalog
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('pricelist')} className="hover:text-amber-400 transition-colors">
                  Wholesale Price List (PDF)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('combos')} className="hover:text-amber-400 transition-colors">
                  Gift Boxes & Combos
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('brands')} className="hover:text-amber-400 transition-colors">
                  In-House Production Lines
                </button>
              </li>
              <li>
                <button onClick={() => setIsSpecOpen(true)} className="hover:text-amber-400 transition-colors text-amber-300 font-medium">
                  Catalog Technical Spec
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">
              Top Categories
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button 
                  onClick={() => { setSelectedCategory('sparklers'); setActiveView('shop'); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Electric Sparklers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('aerial-sky-shot'); setActiveView('shop'); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Aerial Sky Shots
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('flower-pots'); setActiveView('shop'); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Flower Pots & Fountains
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('kids-crackers'); setActiveView('shop'); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Safe Kids Novelties
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('bombs'); setActiveView('shop'); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Sound Bombs & Walas
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">
              Vinayakam Works
            </h4>
            <div className="space-y-2 text-stone-400 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>14/3B Vembakottai Main Rd, Virudhunagar District, Tamil Nadu 626123</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 95511 11570</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>orders@vinayakamcrackers.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box complying with Supreme Court guidelines */}
        <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 text-[11px] text-stone-400 leading-relaxed">
          <strong className="text-amber-400 block mb-1 font-semibold uppercase tracking-wider">
            Mandatory Statutory Notice & Legal Compliance:
          </strong>
          In strict compliance with the Hon'ble Supreme Court of India guidelines and statutory Explosives Rules, 2008, online purchase through electronic transactional payment gateways is restricted for fireworks. This portal operates strictly as our direct manufacturing digital showcase, wholesale price estimation matrix, and enquiry generator for factory-direct booking via WhatsApp and telephone. All products listed are manufactured in-house under valid PESO licences and adhere to CSIR-NEERI green cracker environmental standards. We strictly advocate zero child labor, safe transport logistics, and eco-friendly celebrations.
        </div>

        {/* Bottom copyright */}
        <div className="pt-4 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[11px]">
          <p>© {new Date().getFullYear()} Vinayakam Cracker Manufacturer. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNav('about')} className="hover:text-stone-300">
              Safety Guidelines
            </button>
            <span>·</span>
            <button onClick={() => handleNav('about')} className="hover:text-stone-300">
              Transport Hubs
            </button>
            <span>·</span>
            <button onClick={() => setIsSpecOpen(true)} className="hover:text-amber-400">
              Technical Spec
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
