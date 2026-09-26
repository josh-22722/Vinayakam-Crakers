import { EnquiryItem, CustomerDetails } from '../types';

export const WHATSAPP_NUMBER = '919551111570'; // Vinayakam factory direct WhatsApp line (9551111570)

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateWhatsAppMessage(
  items: EnquiryItem[],
  customer?: Partial<CustomerDetails>,
  appliedCoupon?: { code: string; discountPercent: number }
): string {
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const totalMRP = items.reduce((sum, i) => sum + i.product.mrp * i.quantity, 0);
  const wholesaleSubtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  
  let finalEstimate = wholesaleSubtotal;
  let couponText = '';
  if (appliedCoupon && wholesaleSubtotal >= 1000) {
    const couponSavings = Math.round((wholesaleSubtotal * appliedCoupon.discountPercent) / 100);
    finalEstimate -= couponSavings;
    couponText = `\n🎁 *Coupon Applied (${appliedCoupon.code}):* -${formatINR(couponSavings)} (${appliedCoupon.discountPercent}% Extra Off)`;
  }

  const totalSavings = totalMRP - finalEstimate;
  const overallDiscount = totalMRP > 0 ? Math.round((totalSavings / totalMRP) * 100) : 0;

  let text = `🎆 *VINAYAKAM CRACKER (MANUFACTURER DIRECT) — DIWALI 2026* 🎆\n`;
  text += `🏭 *Source:* In-House Vinayakam Fireworks Manufacturing Plant\n`;
  text += `📅 Date: ${dateStr}\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;

  if (customer?.name) {
    text += `👤 *Customer:* ${customer.name}\n`;
  }
  if (customer?.phone) {
    text += `📱 *Phone:* ${customer.phone}\n`;
  }
  if (customer?.city || customer?.state) {
    text += `📍 *Delivery Location:* ${[customer.city, customer.state].filter(Boolean).join(', ')}\n`;
  }
  if (customer?.transportPreference) {
    text += `🚛 *Transport:* ${customer.transportPreference}\n`;
  }

  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `📦 *ITEMIZED ORDER ESTIMATE (${items.reduce((acc, i) => acc + i.quantity, 0)} items):*\n\n`;

  items.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    text += `${index + 1}. *${item.product.name}*\n`;
    text += `   Qty: ${item.quantity} × ${formatINR(item.product.price)} = *${formatINR(itemTotal)}* (MRP: ${formatINR(item.product.mrp * item.quantity)})\n`;
  });

  text += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `💰 *Total MRP:* ~${formatINR(totalMRP)}~\n`;
  text += `🏷️ *Direct Factory Wholesale:* *${formatINR(wholesaleSubtotal)}*${couponText}\n`;
  text += `✨ *FINAL ESTIMATE:* *${formatINR(finalEstimate)}*\n`;
  text += `🎉 *Total Customer Savings:* ${formatINR(totalSavings)} (${overallDiscount}% OFF!)\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `💬 Please confirm product availability, packing charges, and lorry transport booking details to our location.\n`;

  if (customer?.notes) {
    text += `\n📝 *Notes:* ${customer.notes}\n`;
  }

  return encodeURIComponent(text);
}
