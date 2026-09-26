import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FloatingThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useStore();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-20 left-3 sm:left-4 lg:bottom-6 lg:left-6 z-40 flex items-center">
      <div 
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Desktop Tooltip */}
        {showTooltip && (
          <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap hidden lg:flex items-center gap-1.5 border border-white/10 dark:border-black/10 font-semibold z-50 animate-fadeIn pointer-events-none">
            <span>{theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}</span>
            <span className="text-amber-400 dark:text-amber-600 font-bold">
              {theme === 'light' ? '🌙' : '☀️'}
            </span>
            <div className="w-2 h-2 bg-stone-900 dark:bg-stone-100 rotate-45 absolute -left-1 top-1/2 -translate-y-1/2" />
          </div>
        )}

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md border ${
            theme === 'light'
              ? 'bg-white/95 hover:bg-white text-stone-800 border-amber-300/80 shadow-stone-900/10 hover:shadow-amber-500/20 ring-2 ring-amber-400/20'
              : 'bg-stone-900/95 hover:bg-stone-900 text-amber-400 border-amber-500/30 shadow-black/40 ring-2 ring-amber-400/20 hover:ring-amber-400/40'
          }`}
          title={theme === 'light' ? 'Switch to Dark Mode (Left Down)' : 'Switch to Light Mode (Left Down)'}
          aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-amber-700 transition-transform duration-300 hover:-rotate-12" />
          ) : (
            <Sun className="w-5 h-5 text-amber-400 transition-transform duration-300 hover:rotate-45" />
          )}
        </button>
      </div>
    </div>
  );
};
