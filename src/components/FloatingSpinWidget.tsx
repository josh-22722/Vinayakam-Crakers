import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FloatingSpinWidget: React.FC = () => {
  const { setIsSpinWheelOpen } = useStore();
  const [minimized, setMinimized] = useState(false);

  // Hidden on mobile and tablet (< 1024px) because the MobileBottomNav dock already contains the star spin wheel tab.
  // Displayed gracefully on desktop screens (>= 1024px).
  if (minimized) {
    return (
      <button
        onClick={() => {
          setMinimized(false);
          setIsSpinWheelOpen(true);
        }}
        className="hidden lg:flex fixed bottom-6 left-20 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 p-0.5 shadow-2xl hover:scale-110 active:scale-95 transition-transform items-center justify-center cursor-pointer"
        title="Open Spin & Win Wheel (60-80% OFF)"
        aria-label="Spin & Win Wheel"
      >
        <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center text-lg">
          🎡
        </div>
      </button>
    );
  }

  return (
    <aside 
      aria-label="Festive Offers Wheel" 
      className="hidden lg:flex fixed bottom-6 left-20 z-40 items-center group animate-bounce-subtle"
    >
      <div className="relative flex items-center">
        {/* Main Interactive Pill Button */}
        <button
          onClick={() => setIsSpinWheelOpen(true)}
          className="flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-700 via-amber-600 to-amber-500 text-white shadow-xl shadow-red-900/30 border border-yellow-300/50 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-sm"
          title="Spin the Festive Wheel for 60% - 80% OFF"
        >
          <div className="w-8 h-8 rounded-full bg-stone-950 flex items-center justify-center shadow-inner text-base">
            <span className="animate-spin" style={{ animationDuration: '6s' }}>🎡</span>
          </div>

          <div className="flex flex-col text-left pr-1">
            <span className="text-[11px] font-black tracking-tight leading-none text-yellow-200 uppercase flex items-center gap-1">
              <span>Spin & Win</span>
              <Sparkles className="w-3 h-3 text-yellow-300 inline" />
            </span>
            <span className="text-[10px] font-bold text-white leading-tight">
              60% – 80% OFF
            </span>
          </div>
        </button>

        {/* Small dismiss button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMinimized(true);
          }}
          className="ml-1 p-1 rounded-full bg-stone-900/70 hover:bg-stone-900 text-stone-300 hover:text-white text-xs border border-white/10 transition-colors cursor-pointer"
          title="Minimize Spin Button"
          aria-label="Minimize"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
};
