import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product, EnquiryItem, Coupon } from '../types';
import { PRODUCTS } from '../data/products';

interface StoreContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  enquiryItems: EnquiryItem[];
  addToEnquiry: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromEnquiry: (productId: string) => void;
  clearEnquiry: () => void;
  totalItemsCount: number;
  totalMRP: number;
  totalWholesale: number;
  totalSavings: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  activeView: 'home' | 'shop' | 'pricelist' | 'combos' | 'brands' | 'about' | 'spec';
  setActiveView: (view: 'home' | 'shop' | 'pricelist' | 'combos' | 'brands' | 'about' | 'spec') => void;
  selectedCategory: string | null;
  setSelectedCategory: (catId: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSpecOpen: boolean;
  setIsSpecOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  selectedProductDetail: Product | null;
  setSelectedProductDetail: (product: Product | null) => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isSpinWheelOpen: boolean;
  setIsSpinWheelOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const AVAILABLE_COUPONS: Record<string, Coupon> = {
  DIWALI80: {
    code: 'DIWALI80',
    discountPercent: 80,
    minOrderValue: 1000,
    description: 'Flat 80% Mega Factory Clearance on Diwali Wholesale Booking',
  },
  DHAMAKA78: {
    code: 'DHAMAKA78',
    discountPercent: 78,
    minOrderValue: 1000,
    description: '78% Grand Dhamaka Family Discount on Sivakasi Fireworks',
  },
  FACTORY75: {
    code: 'FACTORY75',
    discountPercent: 75,
    minOrderValue: 1000,
    description: '75% Direct Sivakasi Factory Wholesale Rate',
  },
  PATAKA72: {
    code: 'PATAKA72',
    discountPercent: 72,
    minOrderValue: 1000,
    description: '72% Off on Premium Aerial Sky Shots and Crackers',
  },
  FESTIVE70: {
    code: 'FESTIVE70',
    discountPercent: 70,
    minOrderValue: 1000,
    description: '70% Eco-Friendly CSIR-NEERI Green Cracker Special',
  },
  VINAYAKAM68: {
    code: 'VINAYAKAM68',
    discountPercent: 68,
    minOrderValue: 1000,
    description: '68% Direct In-House Manufacturer Wholesale Discount',
  },
  SPARK65: {
    code: 'SPARK65',
    discountPercent: 65,
    minOrderValue: 1000,
    description: '65% Sivakasi Sparkler & Flower Pot Special Discount',
  },
  BLAST60: {
    code: 'BLAST60',
    discountPercent: 60,
    minOrderValue: 1000,
    description: '60% Guaranteed Festive Savings on Wholesale Enquiry',
  },
  DIWALI2026: {
    code: 'DIWALI2026',
    discountPercent: 70,
    minOrderValue: 1000,
    description: 'Special 70% Festive Discount direct from Vinayakam Factory',
  },
  SIVAKASI80: {
    code: 'SIVAKASI80',
    discountPercent: 80,
    minOrderValue: 1000,
    description: '80% Wholesale Packing & Direct Factory Clearance',
  },
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state: defaults to light (warm festive Sivakasi Diwali palette)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('vc_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vc_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Enquiry Cart state
  const [enquiryItems, setEnquiryItems] = useState<EnquiryItem[]>(() => {
    try {
      const saved = localStorage.getItem('vc_enquiry');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    // Default with 2 popular items as initial showcase
    const defaultProduct1 = PRODUCTS.find((p) => p.id === 'gft-01') || PRODUCTS[0];
    const defaultProduct2 = PRODUCTS.find((p) => p.id === 'spk-01') || PRODUCTS[1];
    return [
      { product: defaultProduct1, quantity: 1 },
      { product: defaultProduct2, quantity: 2 },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('vc_enquiry', JSON.stringify(enquiryItems));
    } catch {
      // ignore
    }
  }, [enquiryItems]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vc_wishlist');
      return saved ? JSON.parse(saved) : ['spk-04', 'sky-03'];
    } catch {
      return ['spk-04', 'sky-03'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vc_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Navigation & View state synchronized with HashRouter
  const location = useLocation();
  const navigate = useNavigate();

  const getPathView = (pathname: string): 'home' | 'shop' | 'pricelist' | 'combos' | 'brands' | 'about' | 'spec' => {
    const clean = pathname.replace(/^\/+/, '').toLowerCase();
    if (clean === 'shop') return 'shop';
    if (clean === 'pricelist') return 'pricelist';
    if (clean === 'combos') return 'combos';
    if (clean === 'brands') return 'brands';
    if (clean === 'about') return 'about';
    if (clean === 'spec') return 'spec';
    return 'home';
  };

  const activeView = getPathView(location.pathname);

  const setActiveView = (view: 'home' | 'shop' | 'pricelist' | 'combos' | 'brands' | 'about' | 'spec') => {
    const targetPath = view === 'home' ? '/' : `/${view}`;
    if (location.pathname !== targetPath) {
      navigate(targetPath);
    }
  };
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSpecOpen, setIsSpecOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [isSpinWheelOpen, setIsSpinWheelOpen] = useState(false);

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 2800);
  };

  const addToEnquiry = (product: Product, quantity = 1) => {
    setEnquiryItems((prev) => {
      const index = prev.findIndex((item) => item.product.id === product.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          quantity: updated[index].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name} to Enquiry List`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromEnquiry(productId);
      return;
    }
    setEnquiryItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromEnquiry = (productId: string) => {
    setEnquiryItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from enquiry');
  };

  const clearEnquiry = () => {
    setEnquiryItems([]);
    showToast('Enquiry list cleared');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    const coupon = AVAILABLE_COUPONS[clean];
    if (!coupon) {
      return { success: false, message: 'Invalid festival promo code.' };
    }
    const currentSubtotal = enquiryItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    if (currentSubtotal < coupon.minOrderValue) {
      return {
        success: false,
        message: `Coupon requires minimum order value of ₹${coupon.minOrderValue}`,
      };
    }
    setAppliedCoupon(coupon);
    showToast(`Coupon ${coupon.code} applied!`);
    return { success: true, message: `Applied ${coupon.discountPercent}% extra savings!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  const totalItemsCount = enquiryItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalMRP = enquiryItems.reduce((sum, item) => sum + item.product.mrp * item.quantity, 0);
  const totalWholesale = enquiryItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalSavings = totalMRP - totalWholesale;

  return (
    <StoreContext.Provider
      value={{
        theme,
        toggleTheme,
        enquiryItems,
        addToEnquiry,
        updateQuantity,
        removeFromEnquiry,
        clearEnquiry,
        totalItemsCount,
        totalMRP,
        totalWholesale,
        totalSavings,
        wishlist,
        toggleWishlist,
        isInWishlist,
        activeView,
        setActiveView,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSpecOpen,
        setIsSpecOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        selectedProductDetail,
        setSelectedProductDetail,
        isSpinWheelOpen,
        setIsSpinWheelOpen,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
