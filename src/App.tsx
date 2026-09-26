import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FloatingSpinWidget } from './components/FloatingSpinWidget';
import { FloatingThemeToggle } from './components/FloatingThemeToggle';
import { SpinWheelModal } from './components/SpinWheelModal';
import { FixedWhatsApp } from './components/FixedWhatsApp';
import { HeroSection } from './components/HeroSection';
import { TrustStrip } from './components/TrustStrip';
import { CategoryShowcase } from './components/CategoryShowcase';
import { FeaturedCombos } from './components/FeaturedCombos';
import { CouponBanner } from './components/CouponBanner';
import { BrandsSection } from './components/BrandsSection';
import { TestimonialsAndFaq } from './components/TestimonialsAndFaq';
import { ShopCatalogPage } from './components/ShopCatalogPage';
import { PriceListPage } from './components/PriceListPage';
import { AboutAndContact } from './components/AboutAndContact';
import { EnquiryCartDrawer } from './components/EnquiryCartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SpecDocModal } from './components/SpecDocModal';
import { Footer } from './components/Footer';
import { CheckCircle2 } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

const MainAppContent: React.FC = () => {
  const { toastMessage } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-200">
      <ScrollToTop />

      {/* Floating Elements (WhatsApp right-down, Theme left-down, Desktop Spin left-down) */}
      <FixedWhatsApp />
      <FloatingThemeToggle />
      <FloatingSpinWidget />

      {/* Main Navigation Header (Responsive & Aligned on Web & Mobile) */}
      <Navbar />

      {/* Main View HashRouter Routes */}
      <main className="flex-1 pb-24 lg:pb-0">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <TrustStrip />
                <CategoryShowcase />
                <FeaturedCombos />
                <CouponBanner />
                <BrandsSection />
                <TestimonialsAndFaq />
              </>
            }
          />

          <Route path="/shop" element={<ShopCatalogPage />} />

          <Route path="/pricelist" element={<PriceListPage />} />

          <Route
            path="/combos"
            element={
              <div className="space-y-8">
                <FeaturedCombos />
                <ShopCatalogPage />
              </div>
            }
          />

          <Route
            path="/brands"
            element={
              <div className="space-y-8">
                <BrandsSection />
                <ShopCatalogPage />
              </div>
            }
          />

          <Route path="/about" element={<AboutAndContact />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Persistent Mobile Bottom Navigation Bar (Guarantees nav is 100% visible on mobile) */}
      <MobileBottomNav />

      {/* Site Footer */}
      <Footer />

      {/* Interactive Festive Spin & Win Modal (Guaranteed 60%–80% OFF) */}
      <SpinWheelModal />

      {/* Drawers & Modals */}
      <EnquiryCartDrawer />
      <WishlistModal />
      <ProductDetailModal />
      <SpecDocModal />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-stone-900/95 dark:bg-stone-100/95 text-white dark:text-stone-950 font-semibold text-xs shadow-2xl backdrop-blur-md flex items-center gap-2 border border-white/10 dark:border-black/10 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <StoreProvider>
        <MainAppContent />
      </StoreProvider>
    </HashRouter>
  );
}
