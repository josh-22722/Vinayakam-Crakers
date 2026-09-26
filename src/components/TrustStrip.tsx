import React from 'react';
import { ShieldCheck, Truck, Factory, Percent } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  return (
    <div className="border-y border-[var(--border-subtle)] bg-[var(--bg-surface)] py-3.5 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 text-xs sm:text-sm font-medium text-[var(--text-secondary)]">
        
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Factory className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-[var(--text-primary)] text-xs sm:text-sm">In-House Factory</p>
            <p className="text-[11px] text-[var(--text-muted)] hidden sm:block">Zero middleman markup</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Percent className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-[var(--text-primary)] text-xs sm:text-sm">75%–80% Wholesale</p>
            <p className="text-[11px] text-[var(--text-muted)] hidden sm:block">Direct factory rates</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-[var(--text-primary)] text-xs sm:text-sm">CSIR-NEERI Green</p>
            <p className="text-[11px] text-[var(--text-muted)] hidden sm:block">100% certified eco-safe</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-[var(--text-primary)] text-xs sm:text-sm">All-India Transport</p>
            <p className="text-[11px] text-[var(--text-muted)] hidden sm:block">Direct lorry delivery</p>
          </div>
        </div>

      </div>
    </div>
  );
};
