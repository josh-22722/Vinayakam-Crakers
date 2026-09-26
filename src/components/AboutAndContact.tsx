import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  ShieldAlert, 
  Truck, 
  CheckCircle, 
  Sparkles,
  Send
} from 'lucide-react';
import { WHATSAPP_NUMBER } from '../utils/helpers';
import { useStore } from '../context/StoreContext';

export const AboutAndContact: React.FC = () => {
  const { showToast } = useStore();
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryCity, setInquiryCity] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) {
      showToast('Please enter your name and contact phone number');
      return;
    }
    const message = encodeURIComponent(
      `*Vinayakam Cracker Contact Inquiry*\n👤 Name: ${inquiryName}\n📱 Phone: ${inquiryPhone}\n📍 City: ${inquiryCity || 'Not specified'}\n💬 Message: ${inquiryMsg || 'Interested in Diwali 2026 wholesale booking'}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    showToast('Redirecting to WhatsApp dispatch line...');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* About Company Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pb-12 border-b border-[var(--border-subtle)]">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Own In-House Manufacturing Facility</span>
          </div>
          <h1 className="brand-display text-3xl sm:text-4xl font-black text-[var(--text-primary)]">
            About Vinayakam Cracker Manufacture
          </h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Established in 1998, Vinayakam Cracker is an <strong>independent fireworks manufacturer</strong> with our own comprehensive production plants. We are not brokers or middlemen — our pyrotechnic crackers, sparklers, sky shots, and gift hampers are <strong>formulated, tested, and manufactured directly by our own skilled workforce</strong>.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            By manufacturing our own crackers in-house, we ensure unmatched chemical purity, strict decibel compliance, and factory-fresh batch dispatch. Because you are buying directly from the manufacturer, we pass on the entire savings with <strong>genuine factory wholesale rates (75% to 80% discount off standard MRP)</strong>.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
              <span className="text-xs text-[var(--text-muted)] font-semibold block">PESO Factory License</span>
              <span className="font-mono font-bold text-xs text-[var(--text-primary)] mt-0.5 block">TN/SIV/EXP/2026/891</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
              <span className="text-xs text-[var(--text-muted)] font-semibold block">Green Cracker Certified</span>
              <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400 mt-0.5 block">CSIR-NEERI Approved</span>
            </div>
          </div>
        </div>

        {/* Visual Factory Card */}
        <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[var(--text-primary)]">All-India Transport Logistics</h3>
              <p className="text-xs text-[var(--text-muted)]">Safe and insured lorry transport to over 450+ cities across India</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-[var(--text-secondary)]">
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Tamil Nadu & Kerala:</strong> 24–48 hours transit to all major town parcel offices.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Karnataka, Andhra Pradesh & Telangana:</strong> 3–4 days transit via VRL / ARC transport.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Maharashtra, Gujarat, Delhi NCR & North:</strong> 5–7 days tracked lorry freight with godown collection.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Guidelines Section */}
      <div className="rounded-3xl bg-amber-500/5 border border-amber-500/20 p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
          <ShieldAlert className="w-5 h-5 text-amber-600" />
          <span>Sivakasi Safe Celebration & Green Cracker Guidelines</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[var(--text-secondary)]">
          <div className="space-y-1.5 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h4 className="font-bold text-[var(--text-primary)]">1. Preparation & Clothing</h4>
            <p>Wear fitted cotton garments while lighting fireworks. Avoid synthetic loose silks or dupattas. Always keep two buckets of water and sand nearby.</p>
          </div>
          <div className="space-y-1.5 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h4 className="font-bold text-[var(--text-primary)]">2. Lighting Rockets & Pots</h4>
            <p>Always ignite from arm’s length using agarbatti or a long sparkler. Never bend your face over a cone flower pot. Rockets must only be fired from upright empty bottles.</p>
          </div>
          <div className="space-y-1.5 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h4 className="font-bold text-[var(--text-primary)]">3. Unexploded Items</h4>
            <p>Never approach or relight a cracker that failed to burst. Wait 15 minutes and pour water generously over it to deactivate the chemical payload safely.</p>
          </div>
        </div>
      </div>

      {/* Contact Information & Direct Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Block */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Get in Touch
            </span>
            <h2 className="brand-display text-2xl sm:text-3xl font-black text-[var(--text-primary)] mt-1">
              Factory Location & Dispatch Desk
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              Feel free to visit our Sivakasi factory showroom or message our wholesale dispatch coordinators.
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[var(--text-primary)]">Vinayakam Manufacturing Plant & Works:</strong>
                <span>14/3B, Vembakottai Main Road, Near Sitalakshmi Mills, Virudhunagar District, Tamil Nadu — 626123, India</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[var(--text-primary)]">WhatsApp & Phone Lines:</strong>
                <span>+91 95511 11570 (WhatsApp & Calls) / +91 94883 25140</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[var(--text-primary)]">Direct Email:</strong>
                <span>orders@vinayakamcrackers.com / contact@vinayakamcrackers.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[var(--text-primary)]">Operating Hours:</strong>
                <span>Monday – Sunday: 8:00 AM to 9:30 PM IST (Special 24/7 Season Desk)</span>
              </div>
            </div>
          </div>

          {/* Embedded Map Representation */}
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--text-primary)]">
              <span>Sivakasi Hub Coordinates</span>
              <span className="font-mono text-[11px] text-stone-500">9.4533° N, 77.7983° E</span>
            </div>
            <div className="aspect-[16/7] rounded-xl bg-stone-200 dark:bg-stone-800 flex flex-col items-center justify-center text-center p-4 text-xs text-[var(--text-muted)]">
              <MapPin className="w-6 h-6 text-red-600 mb-1 animate-bounce" />
              <span className="font-bold text-[var(--text-primary)]">Vinayakam Cracker Sivakasi Main Works</span>
              <span className="text-[11px]">Vembakottai Road, Sivakasi 626123</span>
            </div>
          </div>
        </div>

        {/* Quick Message Form */}
        <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-xl space-y-4">
          <h3 className="brand-display text-xl font-black text-[var(--text-primary)]">
            Send Quick Booking Inquiry
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            Have questions about bulk orders, community celebrations, or transport booking? Leave your details below:
          </p>

          <form onSubmit={handleContactSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
                placeholder="e.g. Ananth Krishnan"
                className="w-full px-3 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">WhatsApp Mobile Number *</label>
              <input
                type="tel"
                required
                value={inquiryPhone}
                onChange={(e) => setInquiryPhone(e.target.value)}
                placeholder="e.g. 98401 23456"
                className="w-full px-3 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Delivery City & State</label>
              <input
                type="text"
                value={inquiryCity}
                onChange={(e) => setInquiryCity(e.target.value)}
                placeholder="e.g. Coimbatore, Tamil Nadu"
                className="w-full px-3 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Your Requirements / Questions</label>
              <textarea
                rows={3}
                value={inquiryMsg}
                onChange={(e) => setInquiryMsg(e.target.value)}
                placeholder="e.g. We require 10 Family Gift Boxes for our company employees..."
                className="w-full px-3 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Submit & Open WhatsApp Line</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
